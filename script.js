// 1. Mobile Toggle
const menuToggle = document.getElementById('mobile-toggle');
const navMenu = document.getElementById('nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// 2. Weather API
async function fetchGhanaWeather() {
    const weatherEl = document.getElementById('weather-display');
    try {
        const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=5.56&longitude=-0.20&current_weather=true');
        const data = await response.json();
        const temp = Math.round(data.current_weather.temperature);
        weatherEl.innerHTML = `<i class="fas fa-sun"></i> Ghana: ${temp}°C — Perfect for Xploring!`;
    } catch (error) {
        weatherEl.innerHTML = `<i class="fas fa-map-marker-alt"></i> Welcome to Ghana`;
    }
}
window.onload = fetchGhanaWeather;

// 3. FAQ Toggler (Only Answer Toggles)
function toggleFaq(headerElement) {
    const item = headerElement.closest('.faq-item');
    const isActive = item.classList.contains('active');
    
    // Close all other FAQs first
    document.querySelectorAll('.faq-item').forEach(other => {
        if (other !== item) {
            other.classList.remove('active');
        }
    });
    
    // Toggle current FAQ - just toggle the active class
    item.classList.toggle('active');
}

// 4. Booking Sync
function selectTour(tourName) {
    document.getElementById('tour-type').value = tourName;
    document.getElementById('book-now').scrollIntoView({ behavior: 'smooth' });
}

// 5. WhatsApp Routing
document.getElementById('tour-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const tour = document.getElementById('tour-type').value;
    const msg = document.getElementById('notes').value;
    
    const phone = "233000000000"; // Real Number placeholder
    const text = `Akwaaba Julidor! I'm ${name}. I want to book: ${tour}.\nDetails: ${msg}`;
    
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
});

// 6. Reveal Engine
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
    });
}, { threshold: 0.1 });
document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));

// 7. Stats Counter Animation
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + (target === 100 ? '%' : target === 5 ? '.0' : '+');
        }
    };
    updateCounter();
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            animateCounter(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(stat => statsObserver.observe(stat));

// 8. Back to Top Button
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// 9. Newsletter Form
document.querySelector('.news-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    alert(`Thank you for subscribing! We'll send updates to ${email}`);
    this.reset();
});

// 10. Testimonial Section Logic
function initTestimonials() {
    const testimonialTrack = document.getElementById('testimonialTrack');
    const emptyState = document.getElementById('emptyState');
    const carousel = document.getElementById('testimonialCarousel');
    const reviewCards = testimonialTrack?.querySelectorAll('.testimonial-card');
    const reviewCount = reviewCards ? reviewCards.length : 0;

    if (reviewCount >= 4) {
        // Show carousel with animation
        if (carousel) carousel.style.display = 'block';
        if (emptyState) emptyState.style.display = 'none';
        if (testimonialTrack) testimonialTrack.classList.add('animate');
    } else if (reviewCount > 0 && reviewCount < 4) {
        // Show carousel without animation (static)
        if (carousel) carousel.style.display = 'block';
        if (emptyState) emptyState.style.display = 'none';
        if (testimonialTrack) testimonialTrack.classList.add('static');
    } else {
        // Show empty state
        if (carousel) carousel.style.display = 'none';
        if (emptyState) emptyState.style.display = 'block';
    }
}

// Open review form when icon is clicked
document.getElementById('reviewIconBtn')?.addEventListener('click', function() {
    const formCard = document.getElementById('reviewFormCard');
    const emptyState = document.getElementById('emptyState');
    
    if (formCard && emptyState) {
        formCard.style.display = 'block';
        emptyState.style.display = 'none';
        formCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
});

// Close review form
document.getElementById('closeFormBtn')?.addEventListener('click', function() {
    const formCard = document.getElementById('reviewFormCard');
    const emptyState = document.getElementById('emptyState');
    
    if (formCard && emptyState) {
        formCard.style.display = 'none';
        emptyState.style.display = 'block';
    }
});

// 11. Review Form Submission
document.getElementById('review-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('review-name').value;
    const location = document.getElementById('review-location').value;
    const rating = document.getElementById('review-rating').value;
    const tour = document.getElementById('review-tour').value;
    const message = document.getElementById('review-message').value;
    
    const stars = '⭐'.repeat(parseInt(rating));
    const phone = "233000000000"; // Real Number placeholder
    const text = `NEW REVIEW SUBMISSION\n\nName: ${name}\nLocation: ${location}\nRating: ${stars} (${rating}/5)\nTour: ${tour}\n\nReview:\n${message}`;
    
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
    
    // Show success message and reset form
    alert('Thank you for your review! Your feedback helps us improve.');
    this.reset();
    
    // Close form and show empty state again
    const formCard = document.getElementById('reviewFormCard');
    const emptyState = document.getElementById('emptyState');
    if (formCard && emptyState) {
        formCard.style.display = 'none';
        emptyState.style.display = 'block';
    }
});

// Initialize testimonials on page load
initTestimonials();

document.getElementById('year').textContent = new Date().getFullYear();