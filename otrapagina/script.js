const sections = document.querySelectorAll("section");
let currentSection = 0;
let isAnimating = false;

// Función de animación suave personalizada
function smoothScrollTo(targetY, duration = 800) {
    const startY = window.scrollY;
    const distance = targetY - startY;
    let startTime = null;

    function animation(currentTime) {
        if (!startTime) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);

        // EaseInOut (más suave que linear)
        const ease = progress < 0.5
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

    // Si la sección misma tiene fade-in
    if (section.classList.contains("fade-in")) {
        section.classList.add("visible");
    }

    // Si hay elementos internos con fade-in
    const elements = section.querySelectorAll(".fade-in");
    elements.forEach(el => {
        el.classList.add("visible");
    });
}

window.addEventListener("wheel", (e) => {
    e.preventDefault(); // bloquea scroll natural

    if (isAnimating) return;

    if (e.deltaY > 0) {
        scrollToSection(currentSection + 1);
    } else {
        scrollToSection(currentSection - 1);
    }

}, { passive: false });

const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

toggle.addEventListener("click", () => {
  toggle.classList.toggle("active");
  nav.classList.toggle("active");
});

// Cerrar menú al hacer click en un link
document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    toggle.classList.remove("active");
    nav.classList.remove("active");
  });
});