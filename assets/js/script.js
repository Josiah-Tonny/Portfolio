/**
 * Main JavaScript file for Angel Janice Okoth's portfolio website
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS animation library if it exists
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease',
      once: true,
      offset: 100
    });
  }

  // Handle navbar scroll behavior
  const navbar = document.querySelector('.floating-navbar');
  if (navbar) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // Mobile menu functionality
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', function(e) {
      e.stopPropagation();
      mobileMenu.classList.toggle('show');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
      if (mobileMenu.classList.contains('show') && 
          !mobileMenu.contains(event.target) && 
          !mobileMenuButton.contains(event.target)) {
        mobileMenu.classList.remove('show');
      }
    });
  }

  // Form submission handling
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // In a real implementation, you would send the form data to a server
      // For now, just show a success message
      alert('Thank you for your message! I will get back to you soon.');
      this.reset();
    });
  }

  // Project filtering functionality
  const filterButtons = document.querySelectorAll('.filter-btn');
  if (filterButtons.length > 0) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all buttons
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Get filter category
        const filter = btn.dataset.filter;
        
        // Filter projects
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
          if (filter === 'all' || card.dataset.category.includes(filter)) {
            card.style.opacity = '0';
            setTimeout(() => {
              card.style.display = 'flex';
              setTimeout(() => {
                card.style.opacity = '1';
              }, 50);
            }, 300);
          } else {
            card.style.opacity = '0';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: 'smooth'
        });
        
        // Update active state in navbar
        document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
          link.classList.remove('active');
        });
        this.classList.add('active');
        
        // Close mobile menu after clicking a link
        if (mobileMenu && mobileMenu.classList.contains('show')) {
          mobileMenu.classList.remove('show');
        }
      }
    });
  });

  // Handle active menu state based on scroll position
  const sections = document.querySelectorAll('section[id], div[id]');
  if (sections.length > 0) {
    window.addEventListener('scroll', function() {
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
          current = section.getAttribute('id');
        }
      });
      
      document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    });
  }
});