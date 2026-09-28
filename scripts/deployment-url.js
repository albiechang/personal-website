function normalizePathPrefix(value = "/") {
  return !value || value === "/" ? "" : `/${value.replace(/^\/+|\/+$/g, "")}`;
}

function createDeploymentUrl({ siteUrl = "http://localhost:8080", pathPrefix = "/" } = {}) {
  const origin = new URL(siteUrl).origin;
  const prefix = normalizePathPrefix(pathPrefix);

  return {
    origin,
    pathPrefix: prefix,
    canonical(route) {
      const normalizedRoute = route === "/" ? "/" : `/${String(route).replace(/^\/+/, "")}`;
      return new URL(`${prefix}${normalizedRoute}`, `${origin}/`).href;
    }
  };
}

module.exports = { createDeploymentUrl };
