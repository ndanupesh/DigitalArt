// Open the signup or login modal when buttons are clicked
document.getElementById('signupButton').onclick = function () {
    openModal('signup');
  };
 
  document.getElementById('loginButton').onclick = function () {
    openModal('login');
  };
 
  // Reuse the openModal and closeModal functions
  function openModal(type) {
    const modal = type === 'signup' ? 'signupModal' : 'loginModal';
    document.getElementById(modal).style.display = 'flex';
  }
 
  function closeModal(type) {
    const modal = type === 'signup' ? 'signupModal' : 'loginModal';
    document.getElementById(modal).style.display = 'none';
  }
 
  // Switch between signup and login modals
  function switchToLogin() {
    closeModal('signup');
    openModal('login');
  }
 
  function switchToSignup() {
    closeModal('login');
    openModal('signup');
  }
 
  // Close modal if clicked outside
  window.onclick = function (event) {
    const signupModal = document.getElementById('signupModal');
    const loginModal = document.getElementById('loginModal');
    if (event.target === signupModal) signupModal.style.display = 'none';
    if (event.target === loginModal) loginModal.style.display = 'none';
  };
 

// Random Testimonial Generator
const testimonials = [
    "Incredible artwork collection!",
    "One of the best digital galleries.",
    "Inspiring pieces from amazing artists.",
    "A must-see for digital art lovers!",
    "Beautifully curated selection of art.",
    "A wonderful showcase of talent."
];

function generateTestimonials(count) {
    let html = '';
    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * testimonials.length);
        html += `<div class="testimonial-item">${testimonials[randomIndex]}</div>`;
    }
    document.getElementById('testimonialsContainer').innerHTML = html;
}

// Event listeners for testimonials
document.addEventListener('DOMContentLoaded', function () {
    const generateButton = document.getElementById('generateButton');
    const slider = document.getElementById('slider');
    const testimonialsCount = document.getElementById('testimonialsCount');
    if (generateButton && slider && testimonialsCount) {
        function updateTestimonials() {
            const count = Number(slider.value);
            testimonialsCount.textContent = count;
            generateTestimonials(count);
        }
        generateButton.onclick = updateTestimonials;
        slider.oninput = updateTestimonials;
        updateTestimonials();
    }
});
	
