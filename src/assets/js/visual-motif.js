const motif = document.querySelector('[data-visual-motif="sequence"]');

if (motif && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  let updateScheduled = false;

  const updateProgress = () => {
    const scrollRange = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollRange > 0 ? window.scrollY / scrollRange : 1;
    motif.style.setProperty("--motif-progress", Math.min(1, Math.max(0, progress)));
    updateScheduled = false;
  };

  const scheduleUpdate = () => {
    if (updateScheduled) return;
    updateScheduled = true;
    window.requestAnimationFrame(updateProgress);
  };

  updateProgress();
  document.addEventListener("scroll", scheduleUpdate, { passive: true });
  window.addEventListener("resize", scheduleUpdate);
}
