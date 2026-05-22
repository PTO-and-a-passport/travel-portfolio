// ========================================
// Navigation
// ========================================
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

// Scroll effect
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

// Mobile toggle
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close mobile nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// ========================================
// Portfolio Filters
// ========================================
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    portfolioItems.forEach(item => {
      if (filter === 'all' || item.dataset.category === filter) {
        item.classList.remove('hidden');
        item.style.position = 'relative';
      } else {
        item.classList.add('hidden');
        setTimeout(() => {
          if (item.classList.contains('hidden')) {
            item.style.position = 'absolute';
          }
        }, 400);
      }
    });
  });
});

// ========================================
// Video Hover to Play
// ========================================
document.querySelectorAll('.portfolio-card').forEach(card => {
  const video = card.querySelector('video');
  if (!video) return;

  card.addEventListener('mouseenter', () => {
    video.play().catch(() => {});
  });

  card.addEventListener('mouseleave', () => {
    video.pause();
    video.currentTime = 0;
  });
});

// ========================================
// Scroll Animations
// ========================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Add fade-in class to sections and observe
document.querySelectorAll(
  '.about-content, .about-image, .portfolio-card, .service-card, .contact-info, .contact-form'
).forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// Stagger portfolio cards
document.querySelectorAll('.portfolio-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.1}s`;
});

// Stagger service cards
document.querySelectorAll('.service-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.15}s`;
});

// ========================================
// Contact Form
// ========================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('button[type="submit"]');
  const originalText = btn.textContent;

  btn.textContent = 'Message Sent!';
  btn.style.background = 'var(--color-accent)';
  btn.style.color = 'white';

  setTimeout(() => {
    btn.textContent = originalText;
    btn.style.background = '';
    btn.style.color = '';
    contactForm.reset();
  }, 3000);
});
