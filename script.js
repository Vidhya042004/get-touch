// Mobile Menu and Slideshow Functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Get mobile menu elements
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileClose = document.querySelector('.mobile-close');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');

    // Slideshow elements
    const slides = document.querySelectorAll('.slide-image');
    
    let currentSlide = 0;
    let slideInterval;

    // Initialize slideshow
    function initSlideshow() {
        startSlideshow();
    }

    // Start automatic slideshow
    function startSlideshow() {
        slideInterval = setInterval(() => {
            nextSlide();
        }, 8000); // 8 seconds for slower slideshow
    }

    // Reset slideshow timer
    function resetSlideshow() {
        clearInterval(slideInterval);
        startSlideshow();
    }

    // Go to next slide
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % slides.length;
        goToSlide(nextIndex);
    }

    // Go to specific slide
    function goToSlide(slideIndex) {
        // Remove active class from current slide
        slides[currentSlide].classList.remove('active');
        
        // Set new current slide
        currentSlide = slideIndex;
        
        // Add active class to new slide
        slides[currentSlide].classList.add('active');
    }

    // Pause slideshow on hover
    const slideshowContainer = document.querySelector('.slideshow-container');
    if (slideshowContainer) {
        slideshowContainer.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        slideshowContainer.addEventListener('mouseleave', () => {
            startSlideshow();
        });
    }

    // Toggle mobile menu
    function toggleMobileMenu() {
        mobileToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (mobileMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    // Close mobile menu
    function closeMobileMenu() {
        mobileToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Event listeners for mobile menu
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function(e) {
            e.preventDefault();
            toggleMobileMenu();
            console.log('Mobile menu toggled');
        });
    }

    if (mobileClose) {
        mobileClose.addEventListener('click', closeMobileMenu);
    }

    // Close menu when clicking on nav links
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Close menu when clicking on menu background
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function(e) {
            if (e.target === mobileMenu) {
                closeMobileMenu();
            }
        });
    }

    // Close menu with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Smooth scrolling for anchor links
    const allLinks = document.querySelectorAll('a[href^="#"]');
    
    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '#home') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar scroll effect
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    function updateNavbar() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 50) {
            header.style.background = 'rgba(0, 0, 0, 0.95)';
            header.style.borderBottom = '1px solid rgba(168, 85, 247, 0.2)';
        } else {
            header.style.background = 'rgba(0, 0, 0, 0.9)';
            header.style.borderBottom = 'none';
        }
        
        lastScrollY = currentScrollY;
    }

    // Throttled scroll event
    let scrollTicking = false;
    function requestScrollUpdate() {
        if (!scrollTicking) {
            requestAnimationFrame(() => {
                updateNavbar();
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    }

    window.addEventListener('scroll', requestScrollUpdate);

    // Handle window resize
    function handleResize() {
        // Close mobile menu if window is resized to desktop
        if (window.innerWidth > 950 && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    }

    window.addEventListener('resize', handleResize);

    // App button interactions
    const appButtons = document.querySelectorAll('.app-button');
    
    appButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
            this.style.boxShadow = '0 10px 30px rgba(168, 85, 247, 0.3)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
        
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(0) scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
    });

    // Download button click handlers
    const downloadButtons = document.querySelectorAll('.download-btn');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add your download logic here
            console.log('Download button clicked');
            // Example: window.open('https://apps.apple.com/your-app', '_blank');
            // Example: window.open('https://play.google.com/store/apps/details?id=your.app', '_blank');
        });
    });

    // App store button click handlers
    const appleButton = document.querySelector('.apple-button');
    const googleButton = document.querySelector('.google-button');

    if (appleButton) {
        appleButton.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Apple App Store button clicked');
            // window.open('https://apps.apple.com/your-app', '_blank');
        });
    }

    if (googleButton) {
        googleButton.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Google Play button clicked');
            // window.open('https://play.google.com/store/apps/details?id=your.app', '_blank');
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.hero-title, .hero-description, .app-buttons, .image-wrapper');
    
    animatedElements.forEach((el, index) => {
        // Initial hidden state
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        
        observer.observe(el);
    });

    // Page load complete
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Trigger initial animations
        setTimeout(() => {
            animatedElements.forEach(el => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            });
        }, 100);
    });

    // Initialize slideshow when DOM is ready
    initSlideshow();

    // Pause slideshow when page is not visible
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            clearInterval(slideInterval);
        } else {
            startSlideshow();
        }
    });

    // Console log for debugging
    console.log('🚀 BookyMet website with fade slideshow initialized successfully!');
});