// Ejemplo: Animación al hacer scroll
window.addEventListener('scroll', () => {
  const elements = document.querySelectorAll('.fade-in');
  elements.forEach((element) => {
    if (element.getBoundingClientRect().top < window.innerHeight) {
      element.classList.add('active');
    }
  });
});

// Scroll suave con offset para el navbar
document.querySelectorAll('a.nav-link').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault(); // Evita el comportamiento predeterminado del enlace

    // Obtén el ID de la sección a la que se debe desplazar
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      // Calcula la posición de la sección teniendo en cuenta la altura del navbar
      const navbarHeight = document.querySelector('.navbar').offsetHeight;
      const offsetPosition = targetSection.offsetTop - navbarHeight;

      // Desplázate suavemente a la sección
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  });
});

// Inicializar AOS
AOS.init();

document.addEventListener('DOMContentLoaded', function () {
  AOS.init({
    duration: 800,
  });
});
