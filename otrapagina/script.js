document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     DETECCIÓN DE DISPOSITIVO
     =============================== */

  const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

  // ✅ Si es táctil (celular o tablet), NO usar one-page
  if (isTouchDevice) {
    return;
  }

  const sections = document.querySelectorAll("section");

  // ✅ Si no es one-page, salir
  if (sections.length === 0) return;

  let currentSection = 0;
  let isAnimating = false;

  /* ===============================
     SCROLL SUAVE PERSONALIZADO
     =============================== */

  function smoothScrollTo(targetY, duration = 800) {
    const startY = window.scrollY;
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

      window.scrollTo(0, startY + distance * ease);

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

    smoothScrollTo(sections[index].offsetTop);

    setTimeout(() => {
      animateSection(index);
      isAnimating = false;
    }, 500);
  }

  function animateSection(index) {
    const section = sections[index];

    if (section.classList.contains("fade-in")) {
      section.classList.add("visible");
    }

    const elements = section.querySelectorAll(".fade-in");
    elements.forEach(el => el.classList.add("visible"));
  }

  /* ===============================
     SCROLL CON RUEDA (DESKTOP)
     =============================== */

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

  /* ===============================
     MENÚ MOBILE (NO AFECTA)
     =============================== */

  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      toggle.classList.toggle("active");
      nav.classList.toggle("active");
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        toggle.classList.remove("active");
        nav.classList.remove("active");
      });
    });
  }

});