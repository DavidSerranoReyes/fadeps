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
  const carouselContainer = document.getElementById('newsCarouselContainer');
  if (!carouselContainer) return;

  // Carga los items desde un archivo JSON (assets/news.json)
  fetch('assets/news.json')
    .then((res) => res.json())
    .then((newsItems) => {
      if (!Array.isArray(newsItems) || newsItems.length === 0) return;

      // Construir el carrusel usando DOM (menor reflow y más seguro que innerHTML masivo)
      const carousel = document.createElement('div');
      carousel.id = 'newsCarousel';
      carousel.className = 'carousel slide';
      carousel.setAttribute('data-bs-ride', 'carousel');
      carousel.setAttribute('data-bs-interval', '4000');

      const indicators = document.createElement('div');
      indicators.className = 'carousel-indicators';

      const inner = document.createElement('div');
      inner.className = 'carousel-inner';

      // Crear fragmentos para menos repintados
      const indicatorsFrag = document.createDocumentFragment();
      const innerFrag = document.createDocumentFragment();

      newsItems.forEach((item, index) => {
        // Indicador
        const button = document.createElement('button');
        button.type = 'button';
        button.setAttribute('data-bs-target', '#newsCarousel');
        button.setAttribute('data-bs-slide-to', String(index));
        button.setAttribute('aria-label', `Noticia ${index + 1}`);
        if (index === 0) {
          button.className = 'active';
          button.setAttribute('aria-current', 'true');
        }
        indicatorsFrag.appendChild(button);

        // Item del carrusel
        const carouselItem = document.createElement('div');
        carouselItem.className = `carousel-item${index === 0 ? ' active' : ''}`;

        const row = document.createElement('div');
        row.className = 'row g-0 align-items-center';

        const colImg = document.createElement('div');
        colImg.className = 'col-md-4';

        // Placeholder SVG data URI para imágenes faltantes o como placeholder para lazy-load
        const placeholderSvg = `<svg xmlns='http://www.w3.org/2000/svg' width='640' height='360'><rect fill='#e9ecef' width='100%' height='100%'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#6c757d' font-size='20'>Imagen no disponible</text></svg>`;
        const placeholderDataUri =
          'data:image/svg+xml;base64,' + btoa(placeholderSvg);

        const img = document.createElement('img');
        img.className = 'img-fluid rounded-start';
        img.alt = item.imageAlt || '';
        img.width = 640;
        img.height = 360;

        // Para optimizar: solo la primera imagen se carga eager; el resto usan data-src y loading=lazy
        if (index === 0) {
          img.src = item.imageUrl || placeholderDataUri;
          img.setAttribute('loading', 'eager');
        } else {
          // Usar placeholder como src inicial para evitar layout shift
          img.src = placeholderDataUri;
          if (item.imageUrl) {
            // Guardar la URL real en data-src para cargar bajo demanda
            img.dataset.src = item.imageUrl;
          }
          img.setAttribute('loading', 'lazy');
        }

        colImg.appendChild(img);

        const colContent = document.createElement('div');
        colContent.className = 'col-md-8';

        const contentDiv = document.createElement('div');
        contentDiv.className = 'p-4';

        const h3 = document.createElement('h3');
        h3.className = 'card-title h5';
        h3.textContent = item.title || '';

        const p = document.createElement('p');
        p.className = 'card-text';
        p.textContent = item.description || '';

        const a = document.createElement('a');
        a.className = 'btn btn-outline-primary btn-sm';
        a.href = item.link || '#';
        a.target = '_blank';
        a.rel = 'noopener';
        a.textContent = 'Ver más';

        contentDiv.appendChild(h3);
        contentDiv.appendChild(p);
        contentDiv.appendChild(a);

        colContent.appendChild(contentDiv);
        row.appendChild(colImg);
        row.appendChild(colContent);
        carouselItem.appendChild(row);

        innerFrag.appendChild(carouselItem);
      });

      indicators.appendChild(indicatorsFrag);
      inner.appendChild(innerFrag);

      // Controles prev/next
      const btnPrev = document.createElement('button');
      btnPrev.className = 'carousel-control-prev';
      btnPrev.type = 'button';
      btnPrev.setAttribute('data-bs-target', '#newsCarousel');
      btnPrev.setAttribute('data-bs-slide', 'prev');
      btnPrev.innerHTML =
        '<span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="visually-hidden">Anterior</span>';

      const btnNext = document.createElement('button');
      btnNext.className = 'carousel-control-next';
      btnNext.type = 'button';
      btnNext.setAttribute('data-bs-target', '#newsCarousel');
      btnNext.setAttribute('data-bs-slide', 'next');
      btnNext.innerHTML =
        '<span class="carousel-control-next-icon" aria-hidden="true"></span><span class="visually-hidden">Siguiente</span>';

      // Montar el carrusel
      carousel.appendChild(indicators);
      carousel.appendChild(inner);
      carousel.appendChild(btnPrev);
      carousel.appendChild(btnNext);

      // Reemplaza el contenido del contenedor
      carouselContainer.innerHTML = '';
      carouselContainer.appendChild(carousel);

      // Inicializa Bootstrap Carousel
      const bsCarousel = new bootstrap.Carousel(
        document.getElementById('newsCarousel'),
        {
          interval: 4000,
          wrap: true,
          keyboard: true,
        }
      );

      // Función para cargar imágenes bajo demanda en el slide especificado
      function loadSlideImages(index) {
        const slide = inner.children[index];
        if (!slide) return;
        slide.querySelectorAll('img').forEach((imgEl) => {
          if (imgEl.dataset && imgEl.dataset.src) {
            imgEl.src = imgEl.dataset.src;
            delete imgEl.dataset.src;
          }
        });
      }

      // Cargar la primera y la siguiente imagen para experiencia fluida
      loadSlideImages(0);
      loadSlideImages(1);

      // Al cambiar de slide, cargar las imágenes del destino (y la siguiente como anticipación)
      document
        .getElementById('newsCarousel')
        .addEventListener('slide.bs.carousel', function (e) {
          const to = e.to;
          loadSlideImages(to);
          loadSlideImages((to + 1) % newsItems.length);
        });

      // Opcional: si esperas añadir muchas noticias, podrías implementar paginación/lazy rendering adicional aquí.
    })
    .catch((err) => {
      // Mantener simple: loguear y mostrar mensaje ligero
      console.error('No se pudieron cargar las noticias:', err);
      carouselContainer.innerHTML =
        '<div class="alert alert-warning">No se pudieron cargar las noticias en este momento.</div>';
    });
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
