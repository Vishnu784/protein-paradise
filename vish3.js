// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const body = document.body;

  // Toggle mobile menu visibility
  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('is-active');
    mobileMenu.classList.toggle('active');
    body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  });

  // Close the mobile menu when a link is clicked
  document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger?.classList.remove('is-active');
      mobileMenu.classList.remove('active');
      body.style.overflow = '';
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (
      mobileMenu.classList.contains('active') &&
      !mobileMenu.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      mobileMenu.classList.remove('active');
      hamburger.classList.remove('is-active');
      body.style.overflow = '';
    }
  });

  // Scroll-based nav style (floating-nav shrink on scroll)
  const nav = document.querySelector('.floating-nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    // Parallax effect
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');

    if (heroContent && heroImage) {
      heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
      heroImage.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
  });

  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      const offset = 80; // height of nav
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });

  // AOS animation
  AOS.init({
    duration: 1000,
    once: true
  });

  // Subscription feedback button
  document.querySelectorAll('.subscribe-button').forEach(button => {
    button.addEventListener('click', () => {
      const originalText = button.textContent;
      button.textContent = 'Processing...';
      button.style.opacity = '0.7';
      button.disabled = true;

      setTimeout(() => {
        alert('Thank you for your interest! Our team will contact you shortly.');
        button.textContent = originalText;
        button.style.opacity = '1';
        button.disabled = false;
      }, 1000);
    });
  });

  // Intersection Observer reveal
  const revealOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, {
    threshold: 0.1
  });

  document.querySelectorAll('section').forEach(section => {
    revealOnScroll.observe(section);
  });
});
