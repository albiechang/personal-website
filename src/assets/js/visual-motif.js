const motif = document.querySelector('[data-visual-motif="sequence"]');

if (motif && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const sections = [...document.querySelectorAll("main .page-content > section")];
  const updateProgress = (entries) => {
    const lastVisible = entries
      .filter((entry) => entry.isIntersecting)
      .map((entry) => sections.indexOf(entry.target))
      .sort((left, right) => right - left)[0];
    if (lastVisible !== undefined) {
      motif.style.setProperty("--motif-progress", (lastVisible + 1) / sections.length);
    }
  };
  const observer = new IntersectionObserver(updateProgress, { rootMargin: "-20% 0px -55%", threshold: 0 });
  sections.forEach((section) => observer.observe(section));
}
