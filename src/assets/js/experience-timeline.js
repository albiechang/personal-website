const timeline = document.querySelector("[data-experience-timeline]");

if (timeline) {
  const entries = [...timeline.querySelectorAll("[data-timeline-entry]")];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const disableEnhancement = () => {
    timeline.style.removeProperty("--timeline-progress");
    entries.forEach((entry) => entry.classList.remove("is-active"));
  };

  const enableEnhancement = () => {
    const update = () => {
      const bounds = timeline.getBoundingClientRect();
      const viewportMarker = window.innerHeight * 0.55;
      const progress = Math.min(1, Math.max(0, (viewportMarker - bounds.top) / bounds.height));
      timeline.style.setProperty("--timeline-progress", progress);

      entries.forEach((entry) => {
        const entryBounds = entry.getBoundingClientRect();
        entry.classList.toggle("is-active", entryBounds.top <= viewportMarker && entryBounds.bottom >= viewportMarker);
      });
    };

    update();
    document.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
  };

  if (reducedMotion.matches) disableEnhancement();
  else enableEnhancement();
}
