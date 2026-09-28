const { createDeploymentUrl } = require("./scripts/deployment-url");

module.exports = function (eleventyConfig) {
  const pathPrefix = process.env.SITE_PATH_PREFIX || "/";
  const deploymentUrl = createDeploymentUrl({ siteUrl: process.env.SITE_URL, pathPrefix });

  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({
    "src/_data/scenarioComparison.json": "assets/data/visualizations/scenario-comparison.json"
  });

  eleventyConfig.addFilter("projectDate", (value) =>
    new Intl.DateTimeFormat("en-US", {
      month: "long",
      year: "numeric",
      timeZone: "UTC"
    }).format(new Date(value))
  );

  eleventyConfig.addFilter("canonicalUrl", (value) => deploymentUrl.canonical(value));

  eleventyConfig.addCollection("projects", (collectionApi) =>
    collectionApi
      .getFilteredByGlob("./src/projects/*.md")
      .sort((left, right) => right.date - left.date)
  );

  return {
    pathPrefix,
    dir: {
      input: "src",
      includes: "_includes",
      layouts: "_layouts",
      output: "_site"
    }
  };
};
