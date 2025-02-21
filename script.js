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

document.addEventListener('DOMContentLoaded', function () {
  // Selecciona todos los enlaces con href que comiencen con #
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault(); // Evita el comportamiento predeterminado

      // Obtén el ID de la sección a la que se debe desplazar
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        // Calcula la posición de la sección teniendo en cuenta la altura del menú
        const offset = 50; // Ajusta este valor según la altura de tu menú
        const targetPosition = targetElement.offsetTop - offset;

        // Desplázate suavemente a la posición calculada
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });
      }
    });
  });
});

window.addEventListener('scroll', function () {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Cerrar el menú al hacer clic en un enlace (solo en dispositivos móviles)
document.addEventListener('DOMContentLoaded', function () {
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const navbarCollapse = document.querySelector('.navbar-collapse');

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 992) {
        // Solo en dispositivos móviles
        const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
          toggle: false, // Cierra el menú sin alternar
        });
        bsCollapse.hide(); // Oculta el menú
      }
    });
  });
});

// Selecciona el título
const titulo = document.querySelector('.grow-on-hover');

// Añade el evento de mouseover (crece)
titulo.addEventListener('mouseover', () => {
  titulo.style.transform = 'scale(1.1)';
  titulo.style.transition = 'transform 0.3s ease-in-out';
});

// Añade el evento de mouseout (vuelve al tamaño original)
titulo.addEventListener('mouseout', () => {
  titulo.style.transform = 'scale(1)';
});
