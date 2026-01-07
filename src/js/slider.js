/**
 * Sistema unificado de sliders
 * Maneja tanto sliders con botones como sliders de scroll horizontal
 */

// Inicializar slider con botones prev/next
export function initButtonSlider(config) {
  const {
    trackId,
    prevButtonId,
    nextButtonId,
    dotsClass,
    totalSlides
  } = config;

  let currentSlide = 0;
  const slideTrack = document.getElementById(trackId);
  const prevBtn = document.getElementById(prevButtonId);
  const nextBtn = document.getElementById(nextButtonId);
  const dots = document.querySelectorAll(`.${dotsClass}`);

  if (!slideTrack || !prevBtn || !nextBtn) return;

  function updateSlider() {
    const translateX = -currentSlide * 100;
    slideTrack.style.transform = `translateX(${translateX}%)`;

    // Actualizar dots
    dots.forEach((dot, index) => {
      const dotElement = dot;
      if (index === currentSlide) {
        dotElement.classList.remove('bg-gray-600', 'hover:bg-gray-500', 'w-2.5', 'sm:w-3');
        dotElement.classList.add('bg-sky-400', 'w-8', 'sm:w-10');
      } else {
        dotElement.classList.remove('bg-sky-400', 'w-8', 'sm:w-10');
        dotElement.classList.add('bg-gray-600', 'hover:bg-gray-500', 'w-2.5', 'sm:w-3');
      }
    });
  }

  function goToSlide(index) {
    currentSlide = index;
    updateSlider();
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
  }

  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => goToSlide(index));
  });

  updateSlider();
}

// Inicializar slider de scroll horizontal con gradientes
export function initScrollSlider(sliderId) {
  const slider = document.getElementById(sliderId);
  if (!slider) return;

  const gradientLeft = document.getElementById('gradient-left');
  const gradientRight = document.getElementById('gradient-right');

  function updateGradients() {
    if (!gradientLeft || !gradientRight) return;

    const scrollLeft = slider.scrollLeft;
    const scrollWidth = slider.scrollWidth;
    const clientWidth = slider.clientWidth;
    const maxScroll = scrollWidth - clientWidth;

    // Mostrar gradiente izquierdo si hay scroll a la izquierda
    gradientLeft.style.opacity = scrollLeft > 10 ? '1' : '0';

    // Mostrar gradiente derecho si hay más contenido a la derecha
    gradientRight.style.opacity = scrollLeft < maxScroll - 10 ? '1' : '0';
  }

  // Funcionalidad de arrastre con el mouse para desktop
  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('cursor-grabbing');
    slider.classList.remove('cursor-grab');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
    e.preventDefault();
    slider.style.scrollBehavior = 'auto';
  });

  slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('cursor-grabbing');
    slider.classList.add('cursor-grab');
    slider.style.scrollBehavior = 'smooth';
  });

  slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('cursor-grabbing');
    slider.classList.add('cursor-grab');
    slider.style.scrollBehavior = 'smooth';
  });

  slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2;
    slider.scrollLeft = scrollLeft - walk;
  });

  // Prevenir el comportamiento de arrastre por defecto de las imágenes
  const images = slider.querySelectorAll('.slider-image');
  images.forEach((img) => {
    img.addEventListener('dragstart', (e) => e.preventDefault());
  });

  // Actualizar gradientes al scroll
  slider.addEventListener('scroll', updateGradients);
  window.addEventListener('resize', updateGradients);

  updateGradients();
}
