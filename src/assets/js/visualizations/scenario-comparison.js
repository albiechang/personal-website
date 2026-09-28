const region = document.querySelector('[data-project-visualization="scenario-comparison"]');

async function initialize() {
  region.dataset.state = "loading";

  try {
    const response = await fetch(region.dataset.source);
    if (!response.ok) throw new Error(`Visualization data request failed: ${response.status}`);
    const { scenarios } = await response.json();
    if (!Array.isArray(scenarios) || scenarios.length === 0) throw new Error("Visualization data is incomplete");

    const controls = region.querySelector(".visualization-controls");
    const output = region.querySelector(".visualization-output");
    scenarios.forEach((scenario, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = scenario.name;
      button.setAttribute("aria-label", `Emphasize ${scenario.name}`);
      button.setAttribute("aria-pressed", index === 0 ? "true" : "false");
      button.addEventListener("click", () => {
        controls.querySelectorAll("button").forEach((control) => control.setAttribute("aria-pressed", "false"));
        button.setAttribute("aria-pressed", "true");
        output.textContent = `${scenario.name}: ${scenario.signal}`;
      });
      controls.append(button);
    });
    controls.hidden = false;
    output.textContent = `${scenarios[0].name}: ${scenarios[0].signal}`;
    region.dataset.state = "ready";
  } catch (error) {
    region.dataset.state = "failed";
    region.querySelector(".visualization-status").textContent = "The interactive comparison could not start. The static scenario list remains available.";
  }
}

if (region) {
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      initialize();
    }, { rootMargin: "300px" });
    observer.observe(region);
  } else {
    initialize();
  }
}
