// Handle contact form functionality
export function setupContactForm() {
    const contactForm = document.getElementById('submit-form');
    
    if (contactForm) {
        contactForm.addEventListener('click', async (e) => {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Validate form data
            if (!name || !email || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Show loading state
            contactForm.disabled = true;
            contactForm.textContent = 'Sending...';
            
            try {
                // In a real application, you would send this data to a server
                // For demonstration purposes, we'll simulate a successful submission
                await simulateFormSubmission({ name, email, message });
                
                // Clear form fields
                document.getElementById('name').value = '';
                document.getElementById('email').value = '';
                document.getElementById('message').value = '';
                
                // Show success message
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                
            } catch (error) {
                console.error('Error sending message:', error);
                showNotification('Failed to send message. Please try again later.', 'error');
            } finally {
                // Restore button state
                contactForm.disabled = false;
                contactForm.textContent = 'Send Message';
            }
        });
    }
    
    // Setup social links
    setupSocialLinks();
}

// Display notification messages to the user
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add notification to the DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
        notification.style.opacity = '1';
    }, 10);
    
    // Remove after a delay
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        notification.style.opacity = '0';
        
        // Remove from DOM after animation completes
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 5000);
}

// Validate email format
function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

// Simulate form submission (replace with actual API call in production)
function simulateFormSubmission(data) {
    return new Promise((resolve) => {
        // Simulate network delay
        setTimeout(() => {
            console.log('Form data that would be sent to server:', data);
            resolve({ success: true });
        }, 1500);
    });
}

// Setup social media links
function setupSocialLinks() {
    const githubLink = document.querySelector('.social-link.github');
    const linkedinLink = document.querySelector('.social-link.linkedin');
    const twitterLink = document.querySelector('.social-link.twitter');
    
    // Update links with your actual social media URLs
    if (githubLink) {
        githubLink.href = 'https://github.com/yourusername';
    }
    
    if (linkedinLink) {
        linkedinLink.href = 'https://linkedin.com/in/yourusername';
    }
    
    if (twitterLink) {
        twitterLink.href = 'https://twitter.com/yourusername';
    }
}