// Alternative Email Solution using EmailJS
// Add this script to your HTML if you choose EmailJS over Formspree

// EmailJS Configuration
const EMAIL_CONFIG = {
    serviceID: 'YOUR_SERVICE_ID',
    templateID: 'YOUR_TEMPLATE_ID',
    userID: 'YOUR_USER_ID'
};

// Alternative contact form handler using EmailJS
function initializeEmailJS() {
    // Initialize EmailJS
    emailjs.init(EMAIL_CONFIG.userID);
    
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Prepare email parameters
            const templateParams = {
                from_name: document.getElementById('name').value,
                from_email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value,
                to_email: 'ladlipalace.barsana@gmail.com'
            };
            
            // Send email
            emailjs.send(EMAIL_CONFIG.serviceID, EMAIL_CONFIG.templateID, templateParams)
                .then(function(response) {
                    console.log('Email sent successfully:', response.status, response.text);
                    showFormMessage('Thank you! Your message has been sent to ladlipalace.barsana@gmail.com', 'success');
                    contactForm.reset();
                })
                .catch(function(error) {
                    console.error('Email send failed:', error);
                    showFormMessage('Sorry, there was an error sending your message. Please try again or contact us directly.', 'error');
                })
                .finally(function() {
                    // Reset button
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                });
        });
    }
}

// Initialize EmailJS when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Uncomment the line below if you choose to use EmailJS
    // initializeEmailJS();
});
