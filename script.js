document.addEventListener('DOMContentLoaded', function () {
    // Dynamic Footer Year Update
    const footerYear = document.querySelector('footer p');
    const currentYear = new Date().getFullYear();
    footerYear.textContent = `© ${currentYear} News Football Academy. All rights reserved.`;

    // Navbar Toggle Functionality
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    const closeBtn = document.getElementById('close-btn');

    menuToggle.addEventListener('click', function () {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    closeBtn.addEventListener('click', function () {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    });

    // Smooth Scroll for Navigation Links
    const navLinksItems = document.querySelectorAll('.nav-links a');
    navLinksItems.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            window.scrollTo({
                top: targetSection.offsetTop - 70, // Adjust for navbar height
                behavior: 'smooth'
            });

            // Close mobile menu after clicking a link
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    });

    // Coach Card Click Interaction
    const coachCards = document.querySelectorAll('.coach');
    coachCards.forEach(card => {
        card.addEventListener('click', function () {
            // Remove highlighted class from all cards
            coachCards.forEach(c => c.classList.remove('highlighted'));
            // Add highlighted class to the clicked card
            this.classList.add('highlighted');
        });
    });

    // WhatsApp Form Submission with Validation
    const submitBtn = document.getElementById('submit-btn');
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');

    // Real-time form input validation with detailed feedback
    formInputs.forEach(input => {
        input.addEventListener('input', function () {
            let errorMessage = '';
            if (this.id === 'name' && this.value.trim() === '') {
                errorMessage = 'Name is required.';
                this.style.borderColor = '#FF0000';
            } else if (this.id === 'email' && (!this.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value))) {
                errorMessage = 'Please enter a valid email address.';
                this.style.borderColor = '#FF0000';
            } else if (this.id === 'phone' && (!this.value.trim() || !/^\d{10}$/.test(this.value))) {
                errorMessage = 'Please enter a valid 10-digit phone number.';
                this.style.borderColor = '#FF0000';
            } else if (this.id === 'message' && this.value.trim() === '') {
                errorMessage = 'Message is required.';
                this.style.borderColor = '#FF0000';
            } else {
                this.style.borderColor = '#680000';
            }

            // Display error message below the input
            let errorElement = this.nextElementSibling;
            if (!errorElement || !errorElement.classList.contains('error-message')) {
                errorElement = document.createElement('span');
                errorElement.className = 'error-message';
                errorElement.style.color = '#FF0000';
                errorElement.style.fontSize = '14px';
                this.parentNode.appendChild(errorElement);
            }
            errorElement.textContent = errorMessage;
        });
    });

    submitBtn.addEventListener('click', function () {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const message = document.getElementById('message').value.trim();

        // Validate form fields
        let isValid = true;
        const errors = {};

        if (!name) {
            document.getElementById('name').style.borderColor = '#FF0000';
            errors.name = 'Name is required.';
            isValid = false;
        }
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            document.getElementById('email').style.borderColor = '#FF0000';
            errors.email = 'Please enter a valid email address.';
            isValid = false;
        }
        if (!phone || !/^\d{10}$/.test(phone)) {
            document.getElementById('phone').style.borderColor = '#FF0000';
            errors.phone = 'Please enter a valid 10-digit phone number.';
            isValid = false;
        }
        if (!message) {
            document.getElementById('message').style.borderColor = '#FF0000';
            errors.message = 'Message is required.';
            isValid = false;
        }

        if (!isValid) {
            let errorMessage = 'Please correct the following errors:\n';
            for (let key in errors) {
                errorMessage += `- ${errors[key]}\n`;
            }
            alert(errorMessage);
            return;
        }

        // Construct WhatsApp message
        const whatsappNumber = '9632877217';
        const whatsappMessage = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`;
        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

        // Open WhatsApp link in a new tab
        window.open(whatsappLink, '_blank');

        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.style.color = '#D4AF37';
        successMessage.style.fontSize = '16px';
        successMessage.style.marginTop = '10px';
        successMessage.style.textAlign = 'center';
        successMessage.textContent = 'Message sent successfully! We will contact you soon.';
        submitBtn.parentNode.appendChild(successMessage);

        // Remove success message after 3 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 3000);

        // Reset form after submission
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('phone').value = '';
        document.getElementById('message').value = '';
        formInputs.forEach(input => {
            input.style.borderColor = '#680000';
            const errorElement = input.nextElementSibling;
            if (errorElement && errorElement.classList.contains('error-message')) {
                errorElement.textContent = '';
            }
        });
    });

    // Scroll Animation Trigger
    const sections = document.querySelectorAll('section');
    const options = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Scroll-to-Top Button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.id = 'scroll-to-top';
    scrollToTopBtn.textContent = '↑ Top';
    scrollToTopBtn.style.position = 'fixed';
    scrollToTopBtn.style.bottom = '20px';
    scrollToTopBtn.style.right = '20px';
    scrollToTopBtn.style.backgroundColor = '#680000';
    scrollToTopBtn.style.color = '#F5EAEA';
    scrollToTopBtn.style.border = 'none';
    scrollToTopBtn.style.padding = '10px 15px';
    scrollToTopBtn.style.borderRadius = '5px';
    scrollToTopBtn.style.cursor = 'pointer';
    scrollToTopBtn.style.display = 'none';
    scrollToTopBtn.style.zIndex = '1000';
    scrollToTopBtn.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    document.body.appendChild(scrollToTopBtn);

    window.addEventListener('scroll', function () {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.display = 'block';
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.transform = 'scale(1)';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.transform = 'scale(0.8)';
            setTimeout(() => {
                if (window.scrollY <= 300) {
                    scrollToTopBtn.style.display = 'none';
                }
            }, 300);
        }
    });

    scrollToTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    scrollToTopBtn.addEventListener('mouseover', function () {
        this.style.backgroundColor = '#D4AF37';
        this.style.transform = 'scale(1.1)';
    });

    scrollToTopBtn.addEventListener('mouseout', function () {
        this.style.backgroundColor = '#680000';
        this.style.transform = 'scale(1)';
    });
});