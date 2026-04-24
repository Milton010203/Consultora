document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".service-card-hide");

  cards.forEach(card => {
    const content = card.querySelector(".service-content-hide");

    // Inicialmente colapsado
    content.style.maxHeight = "0px";
    content.style.overflow = "hidden";
    content.style.transition = "max-height 0.4s ease";

    card.addEventListener("click", () => {
        const isOpen = card.classList.contains("active");

        if (isOpen) {
            // Cerrar solo esta
            card.classList.remove("active");
            content.style.maxHeight = "0px";
        } else {
            // Abrir solo esta
            card.classList.add("active");
            content.style.maxHeight = content.scrollHeight + "px";
        }
        });
  });
});

