// certifications.js
// Filtrado por año (sin dependencias)
document.addEventListener('DOMContentLoaded', () => {.    // Espera a que el DOM esté listo
  const root = document.querySelector('#certifications'); // Contenedor principal
  if (!root) return; // Si no existe, salir

  const buttons = root.querySelectorAll('.year-filter');
  const cards = root.querySelectorAll('[data-year]');
  const empty = root.querySelector('#certifications-empty');

  function applyFilter(year) {
    let visible = 0;

    cards.forEach(card => {
      const y = card.getAttribute('data-year');
      const show = (year === 'all' || year === y);
      card.style.display = show ? '' : 'none';
      if (show) visible++;
    });

    // Estado visual de los botones
    buttons.forEach(btn => {
      const isActive = btn.dataset.filter === year;
      btn.setAttribute('aria-selected', String(isActive));
      btn.classList.toggle('ring-2', isActive);
      btn.classList.toggle('ring-white/60', isActive);
    });

    // Empty state
    if (empty) empty.classList.toggle('hidden', visible > 0);
  }

  // Click handlers
  buttons.forEach(btn => btn.addEventListener('click', () => applyFilter(btn.dataset.filter)));

  // Permite abrir con hash year=2024 o #2024
  const url = new URL(window.location.href);
  const urlYear = url.searchParams.get('year') || window.location.hash.replace('#', '');
  const initial = ['2023', '2024', '2025'].includes(urlYear) ? urlYear : 'all';

  applyFilter(initial);
});
