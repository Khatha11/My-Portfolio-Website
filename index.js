// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navList = document.getElementById('nav-list');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
    navToggle.setAttribute('aria-expanded', !expanded);
    navList.classList.toggle('show');
  });
}

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    const el = document.querySelector(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({behavior: 'smooth', block: 'start'});
      navList?.classList.remove('show');
      navToggle?.setAttribute('aria-expanded', 'false');
    }
  });
});

// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Stat counters
function animateCounter(el) {
  const target = parseInt(el.dataset.counter || '0', 10);
  let current = 0;
  const step = Math.max(1, Math.floor(target / 100));
  const iv = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(iv); }
    el.textContent = current.toLocaleString();
  }, 16);
}
document.querySelectorAll('.stat-num').forEach(animateCounter);

// Project filters
const filterChips = document.querySelectorAll('.chip');
const projects = document.querySelectorAll('.project');
filterChips.forEach(chip => {
  chip.addEventListener('click', () => {
    filterChips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    const f = chip.dataset.filter;
    projects.forEach(p => {
      const tags = p.dataset.tags?.split(',') || [];
      p.style.display = (f === 'all' || tags.includes(f)) ? '' : 'none';
    });
  });
});
