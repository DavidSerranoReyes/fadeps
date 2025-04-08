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
    once: false,
    mirror: true,
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

document.addEventListener('DOMContentLoaded', function () {
  // Define the news items
  const newsItems = [
    {
      title: 'EL PAÍS DONDE LA MENTE HUMANA ES VALORADA PREMIADA Y CELEBRADA',
      description:
        '¿Están listos para un viaje que sacudirá sus neuronas de pura inspiración? ¡Bienvenidos a "El país donde la mente humana es valorada, premiada y celebrada" y no, no es un cuento de hadas, es Suecia, la tierra de las ideas revolucionarias!',
      imageUrl: 'https://img.youtube.com/vi/BL10m90XeCk/maxresdefault.jpg',
      imageAlt: 'País donde la mente humana es valorada',
      link: 'https://www.youtube.com/watch?v=BL10m90XeCk',
    },
    {
      title:
        'Sobre la Cumbre de Sostenibilidad 2025: Uniendo Fuerzas para un Futuro Sostenible',
      description:
        'Reuniremos en el Centro de Convenciones de Quito a líderes, empresas, ONGs y organizaciones de todo el mundo para un evento transformador que trasciende las palabras y se centra en la acción.',
      imageUrl:
        'https://ekoscumbresostenibilidad.com/images/2025/01/28/cumbres-sostenibilidad-2025.jpg',
      imageAlt: 'Cumbre de Sostenibilidad 2025',
      link: 'https://ekoscumbresostenibilidad.com/',
    },
    {
      title: 'EL MUSEO MÁS FUTURISTA Y ESPECTACULAR DEL MUNDO',
      description:
        'Bienvenidos al cuarto y último video de nuestra fascinante saga China Learning Tour. En esta entrega final, vamos a sumergirnos en la China del Futuro como nunca antes lo habías imaginado.',
      imageUrl: 'https://img.youtube.com/vi/6x3gkUe7O4I/hqdefault.jpg',
      imageAlt: 'Museo futurista',
      link: 'https://www.youtube.com/watch?v=6x3gkUe7O4I',
    },
    {
      title:
        '¿Cómo logró Ecuador ser pionero mundial de producción sin deforestación?',
      description:
        'Un programa iniciado en 2017 dio sus frutos y logró que Ecuador sea pionero mundial de producción sin deforestación y con prácticas sostenibles, según el PNUD.',
      imageUrl:
        'https://www.lahora.com.ec/wp-content/uploads/2025/03/468094070_977017674455375_8809820703951748435_n.jpg',
      imageAlt: 'Ecuador sin deforestación',
      link: 'https://www.lahora.com.ec/pais/como-logro-ecuador-ser-pionero-mundial-de-produccion-sin-deforestacion/',
    },
  ];

  // Get the container for the carousel
  const carouselContainer = document.getElementById('newsCarouselContainer');

  // Create the carousel structure
  let carouselHTML = `
    <div id="newsCarousel" class="carousel slide" data-bs-ride="carousel" data-bs-interval="4000">
      <div class="carousel-indicators">
        ${newsItems
          .map(
            (item, index) => `
          <button type="button" data-bs-target="#newsCarousel" data-bs-slide-to="${index}" 
            ${index === 0 ? 'class="active" aria-current="true"' : ''} 
            aria-label="Noticia ${index + 1}"></button>
        `
          )
          .join('')}
      </div>
      
      <div class="carousel-inner">
        ${newsItems
          .map(
            (item, index) => `
          <div class="carousel-item ${index === 0 ? 'active' : ''}">
            <div class="row g-0 align-items-center">
              <div class="col-md-4">
                <img src="${item.imageUrl}" alt="${item.imageAlt}" class="img-fluid rounded-start" 
                  ${index === 0 ? 'loading="eager"' : 'loading="lazy"'} width="640" height="360">
              </div>
              <div class="col-md-8">
                <div class="p-4">
                  <h3 class="card-title h5">${item.title}</h3>
                  <p class="card-text">${item.description}</p>
                  <a href="${item.link}" class="btn btn-outline-primary btn-sm" target="_blank" rel="noopener">Ver más</a>
                </div>
              </div>
            </div>
          </div>
        `
          )
          .join('')}
      </div>

      <button class="carousel-control-prev" type="button" data-bs-target="#newsCarousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Anterior</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#newsCarousel" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Siguiente</span>
      </button>
    </div>
  `;

  // Insert the carousel into the container
  carouselContainer.innerHTML = carouselHTML;

  // Initialize the Bootstrap carousel
  const carousel = new bootstrap.Carousel(
    document.getElementById('newsCarousel'),
    {
      interval: 4000,
      wrap: true,
      keyboard: true,
    }
  );
});

// Script para el manejo del formulario de contacto
document.addEventListener('DOMContentLoaded', function () {
  const contactForm = document.getElementById('contactForm');
  const formMessage = document.querySelector('.form-message');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const actionUrl = contactForm.getAttribute('action');

      // Mostrar mensaje de carga
      formMessage.innerHTML =
        '<div class="alert alert-info">Enviando mensaje...</div>';
      formMessage.style.display = 'block';

      fetch(actionUrl, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      })
        .then((response) => {
          if (response.ok) {
            formMessage.innerHTML =
              '<div class="alert alert-success">¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.</div>';
            contactForm.reset();
          } else {
            throw new Error('Hubo un error al enviar el formulario.');
          }
        })
        .catch((error) => {
          formMessage.innerHTML =
            '<div class="alert alert-danger">Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.</div>';
        });
    });
  }

  // Animación adicional para los elementos al hacer scroll (complementa AOS)
  const animateElements = document.querySelectorAll(
    '.contact-info li, .social-icons a'
  );

  animateElements.forEach((element) => {
    element.addEventListener('mouseenter', function () {
      this.style.opacity = '1';
    });
  });
});
