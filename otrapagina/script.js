document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     MENU HAMBURGUESA
     =============================== */
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      toggle.classList.toggle("active");
      nav.classList.toggle("active");
    });

    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        toggle.classList.remove("active");
        nav.classList.remove("active");
      });
    });
  }

  /* ===============================
     ONE PAGE SCROLL — SOLO DESKTOP
     =============================== */
  const isDesktopOnly = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (!isDesktopOnly) {
    // En mobile dejamos el scroll natural sin interferir.
    return;
  }

  const sections = document.querySelectorAll("section");
  if (sections.length === 0) return;

  const scrollingElement = document.scrollingElement || document.documentElement;
  document.body.style.overflow = "hidden";
  document.documentElement.style.overflow = "hidden";

  let currentSection = 0;
  let isAnimating = false;

  function smoothScrollTo(targetY, duration = 800) {
    const startY = scrollingElement.scrollTop;
    const distance = targetY - startY;
    let startTime = null;

    function animation(currentTime) {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease =
        progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      scrollingElement.scrollTop = startY + distance * ease;

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      } else {
        isAnimating = false;
      }
    }

    requestAnimationFrame(animation);
  }

  function scrollToSection(index) {
    if (index < 0 || index >= sections.length) return;

    isAnimating = true;
    currentSection = index;

    const section = sections[index];
    showSection(section);
    smoothScrollTo(section.offsetTop);
  }

  window.addEventListener(
    "wheel",
    (e) => {
      if (isAnimating) return;
      e.preventDefault();

      if (e.deltaY > 0) {
        scrollToSection(currentSection + 1);
      } else {
        scrollToSection(currentSection - 1);
      }
    },
    { passive: false }
  );

  function showSection(section) {
    if (!section) return;
    section.classList.add("visible");
  }
});