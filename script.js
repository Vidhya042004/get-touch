document.addEventListener('DOMContentLoaded', function() {
    // Form submission handler
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const btn = this.querySelector('.submit-btn');
        const originalText = btn.textContent;
        
        // Change button state to loading
        btn.textContent = 'Signing Up...';
        btn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            btn.textContent = 'Welcome Aboard!';
            alert('Thank you for signing up! We\'ll be in touch soon.');
            
            // Reset form after success message
            setTimeout(() => {
                this.reset();
                btn.textContent = originalText;
                btn.disabled = false;
            }, 2000);
        }, 1500);
    });

    // Form validation with visual feedback
    const inputs = document.querySelectorAll('input, select, textarea');

    inputs.forEach(input => {
        // Add focus effect
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        // Remove focus effect and validate
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
            validateField(this);
        });
        
        // Real-time validation
        input.addEventListener('input', function() {
            validateField(this);
        });
    });

    // Field validation function
    function validateField(field) {
        const isValid = field.checkValidity() && field.value.trim() !== '';
        
        if (field.hasAttribute('required')) {
            if (isValid) {
                field.style.borderBottomColor = '#4CAF50';
            } else if (field.value.trim() === '') {
                field.style.borderBottomColor = 'rgba(255, 255, 255, 0.3)';
            } else {
                field.style.borderBottomColor = '#f44336';
            }
        }
    }

    // Email format validation
    document.getElementById('email').addEventListener('input', function() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValidEmail = emailRegex.test(this.value);
        
        if (this.value.trim() !== '') {
            if (isValidEmail) {
                this.style.borderBottomColor = '#4CAF50';
            } else {
                this.style.borderBottomColor = '#f44336';
            }
        } else {
            this.style.borderBottomColor = 'rgba(255, 255, 255, 0.3)';
        }
    });

    // Phone number formatting
    document.getElementById('contact').addEventListener('input', function() {
        // Remove all non-digit characters
        let value = this.value.replace(/\D/g, '');
        
        // Format as (XXX) XXX-XXXX for US numbers
        if (value.length >= 6) {
            value = value.replace(/(\d{3})(\d{3})(\d+)/, '($1) $2-$3');
        } else if (value.length >= 3) {
            value = value.replace(/(\d{3})(\d+)/, '($1) $2');
        }
        
        this.value = value;
    });

    // Form animation on load
    const formGroups = document.querySelectorAll('.form-group');
    
    formGroups.forEach((group, index) => {
        group.style.opacity = '0';
        group.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            group.style.transition = 'all 0.5s ease';
            group.style.opacity = '1';
            group.style.transform = 'translateY(0)';
        }, index * 100);
    });
});