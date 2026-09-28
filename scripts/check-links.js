const fs = require("node:fs");
const path = require("node:path");
const { createDeploymentUrl } = require("./deployment-url");

const outputRoot = path.resolve(process.argv[2] || "_site");
const deploymentUrl = createDeploymentUrl({
  siteUrl: process.env.SITE_URL,
  pathPrefix: process.env.SITE_PATH_PREFIX
});
const pathPrefix = deploymentUrl.pathPrefix;
const failures = [];
const externalContactUrls = new Set();

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(absolute) : absolute;
  });
}

function publicRoute(file) {
  const relative = path.relative(outputRoot, file).replaceAll(path.sep, "/");
  if (relative === "index.html") return "/";
  return `/${relative.replace(/index\.html$/, "")}`;
}

function localFileFor(pathname) {
  const withoutPrefix = pathPrefix && pathname.startsWith(`${pathPrefix}/`)
    ? pathname.slice(pathPrefix.length)
    : pathname;
  const relative = decodeURIComponent(withoutPrefix).replace(/^\/+/, "");
  const direct = path.join(outputRoot, relative);
  return path.extname(relative) ? direct : path.join(direct, "index.html");
}

function record(message) {
  failures.push(message);
}

if (!fs.existsSync(outputRoot)) {
  throw new Error(`Generated site not found: ${outputRoot}`);
}

const files = walk(outputRoot);
const htmlFiles = files.filter((file) => file.endsWith(".html"));
const routes = new Set(htmlFiles.map(publicRoute));
const routeFiles = new Map(htmlFiles.map((file) => [publicRoute(file), file]));

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  const route = publicRoute(file);
  const ids = new Set([...html.matchAll(/\sid=["']([^"']+)["']/g)].map((match) => match[1]));
  const attributes = [...html.matchAll(/\s(?:href|src)=["']([^"']+)["']/g)].map((match) => match[1]);
  const contactRail = html.match(/<aside class=["']contact-rail["'][^>]*>([\s\S]*?)<\/aside>/)?.[1];
  const contactReferences = contactRail
    ? [...contactRail.matchAll(/\shref=["']([^"']+)["']/g)].map((match) => match[1])
    : [];
  if (contactReferences.length !== 2) record(`${route}: expected email and LinkedIn contact controls`);

  for (const reference of attributes) {
    if (!reference || reference.startsWith("data:")) continue;
    if (reference.startsWith("#")) {
      if (!ids.has(reference.slice(1))) record(`${route}: missing anchor ${reference}`);
      continue;
    }
    if (reference.startsWith("mailto:")) {
      if (!/^mailto:[^@\s]+@[^@\s]+$/.test(reference)) record(`${route}: invalid email control ${reference}`);
      continue;
    }

    let target;
    try {
      target = new URL(reference, deploymentUrl.canonical(route));
    } catch {
      record(`${route}: invalid URL ${reference}`);
      continue;
    }
    if (!["http:", "https:"].includes(target.protocol)) {
      record(`${route}: unsupported URL protocol ${reference}`);
      continue;
    }
    if (target.origin !== deploymentUrl.origin) {
      if (contactReferences.includes(reference)) {
        if (target.protocol !== "https:" || !/(^|\.)linkedin\.com$/i.test(target.hostname)) {
          record(`${route}: invalid LinkedIn contact control ${reference}`);
        } else {
          externalContactUrls.add(target.href);
        }
      }
      continue;
    }
    if (pathPrefix && reference.startsWith("/") && !target.pathname.startsWith(`${pathPrefix}/`)) {
      record(`${route}: root-relative reference omits deployment prefix ${reference}`);
    }
    if (!fs.existsSync(localFileFor(target.pathname))) record(`${route}: broken local reference ${reference}`);
    if (target.hash) {
      const targetRoute = target.pathname.slice(pathPrefix.length) || "/";
      const targetFile = routeFiles.get(targetRoute);
      const targetHtml = targetFile ? fs.readFileSync(targetFile, "utf8") : "";
      const targetIds = new Set([...targetHtml.matchAll(/\sid=["']([^"']+)["']/g)].map((match) => match[1]));
      if (!targetIds.has(target.hash.slice(1))) record(`${route}: missing anchor ${target.pathname}${target.hash}`);
    }
  }

  const canonical = html.match(/<link rel=["']canonical["'] href=["']([^"']+)["']/)?.[1];
  const expectedCanonical = deploymentUrl.canonical(route);
  if (canonical !== expectedCanonical) record(`${route}: canonical is ${canonical || "missing"}; expected ${expectedCanonical}`);
}

const sitemapPath = path.join(outputRoot, "sitemap.xml");
if (!fs.existsSync(sitemapPath)) {
  record("sitemap.xml is missing");
} else {
  const sitemap = fs.readFileSync(sitemapPath, "utf8");
  for (const route of routes) {
    const expected = `<loc>${deploymentUrl.canonical(route)}</loc>`;
    if (!sitemap.includes(expected)) record(`sitemap.xml: missing ${expected}`);
  }
}

async function finishValidation() {
  if (process.env.CHECK_EXTERNAL_LINKS === "1") {
    for (const url of externalContactUrls) {
      try {
        const response = await fetch(url, {
          method: "HEAD",
          redirect: "follow",
          signal: AbortSignal.timeout(10_000),
          headers: { "user-agent": "Albert-Chang-Professional-Record-Link-Check" }
        });
        if ([404, 410].includes(response.status)) record(`external contact is broken (${response.status}): ${url}`);
      } catch (error) {
        record(`external contact is unreachable: ${url} (${error.message})`);
      }
    }
  }

  if (failures.length) {
    console.error(`Broken-link validation failed (${failures.length}):\n${failures.map((failure) => `- ${failure}`).join("\n")}`);
    process.exitCode = 1;
  } else {
    const externalMode = process.env.CHECK_EXTERNAL_LINKS === "1" ? " and external contact reachability" : "";
    console.log(`Validated ${htmlFiles.length} public HTML routes, anchors, assets, contact controls, canonicals, sitemap entries${externalMode}.`);
  }
}

finishValidation();
