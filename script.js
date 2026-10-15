const testimonials = [
  "Incredible artwork collection!",
  "One of the most inspiring little galleries.",
  "The artists helped turn my idea into something real.",
  "A beautiful place to find a piece with a story.",
  "Thoughtful work, lovely people, and a warm experience.",
  "A wonderful showcase of local creative talent."
];

const themeToggle = document.querySelector('[data-theme-toggle]');

function updateThemeControl(theme) {
  if (!themeToggle) return;

  const nextTheme = theme === 'dark' ? 'light' : 'dark';
  const themeLabel = themeToggle.querySelector('.theme-label');
  const themeIcon = themeToggle.querySelector('.theme-icon');
  themeToggle.setAttribute('aria-label', `Switch to ${nextTheme} mode`);
  themeToggle.setAttribute('title', `Switch to ${nextTheme} mode`);
  if (themeLabel) themeLabel.textContent = nextTheme === 'light' ? 'Light' : 'Dark';
  if (themeIcon) themeIcon.textContent = nextTheme === 'light' ? '☼' : '☾';
}

updateThemeControl(document.documentElement.dataset.theme || 'dark');
themeToggle?.addEventListener('click', () => {
  const nextTheme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
  document.documentElement.dataset.theme = nextTheme;
  updateThemeControl(nextTheme);

  try {
    localStorage.setItem('artsy-realm-theme', nextTheme);
  } catch {
    // The selected theme still applies for this page if storage is unavailable.
  }
});

let lastFocusedElement = null;

function openModal(name) {
  const modal = document.getElementById(`${name}Modal`);
  if (!modal) return;

  lastFocusedElement = document.activeElement;
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  modal.querySelector('input')?.focus();
}

function closeModal(modal) {
  if (!modal) return;

  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  if (!document.querySelector('.modal.is-open')) {
    document.body.classList.remove('modal-open');
    lastFocusedElement?.focus();
  }
}

function showTestimonials() {
  const slider = document.getElementById('slider');
  const countOutput = document.getElementById('testimonialsCount');
  const container = document.getElementById('testimonialsContainer');
  if (!slider || !countOutput || !container) return;

  const count = Number(slider.value);
  countOutput.value = String(count);
  countOutput.textContent = String(count);

  const shuffled = [...testimonials].sort(() => Math.random() - 0.5).slice(0, count);
  container.replaceChildren(...shuffled.map((quote) => {
    const card = document.createElement('blockquote');
    card.className = 'testimonial-item';
    card.textContent = `“${quote}”`;
    return card;
  }));
}

document.addEventListener('click', (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;

  const openButton = target.closest('[data-open-modal]');
  if (openButton) {
    openModal(openButton.getAttribute('data-open-modal'));
    return;
  }

  const switchButton = target.closest('[data-switch-modal]');
  if (switchButton) {
    document.querySelectorAll('.modal.is-open').forEach(closeModal);
    openModal(switchButton.getAttribute('data-switch-modal'));
    return;
  }

  const closeButton = target.closest('[data-close-modal]');
  if (closeButton) {
    closeModal(closeButton.closest('.modal'));
    return;
  }

  if (target.classList.contains('modal')) closeModal(target);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    document.querySelectorAll('.modal.is-open').forEach(closeModal);
  }
});

document.addEventListener('submit', (event) => {
  const form = event.target;
  if (!(form instanceof HTMLFormElement) || !form.classList.contains('demo-form')) return;

  event.preventDefault();
  const feedback = form.querySelector('.form-feedback');
  if (!feedback) return;

  if (form.classList.contains('auth-form')) {
    feedback.textContent = 'Thanks! This frontend demo does not create or access an account.';
  } else if (form.classList.contains('subscribe-form')) {
    feedback.textContent = 'You’re on the list in this demo — no email was sent or stored.';
    form.reset();
  } else {
    feedback.textContent = 'Thanks for your note! This frontend demo does not send messages.';
    form.reset();
  }
});

const slider = document.getElementById('slider');
const generateButton = document.getElementById('generateButton');
slider?.addEventListener('input', showTestimonials);
generateButton?.addEventListener('click', showTestimonials);
showTestimonials();

