// Handle smooth scrolling and navigation
export function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('.section');
    
    // Add click event to each navigation link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the target section id
            const targetId = this.getAttribute('href').substring(1);
            
            // Update active navigation link
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
            
            // Hide all sections and show the target section
            sections.forEach(section => {
                section.classList.remove('active');
                section.style.opacity = '0';
            });
            
            const targetSection = document.getElementById(targetId);
            targetSection.classList.add('active');
            
            // Use setTimeout to ensure the transitions work properly
            setTimeout(() => {
                targetSection.style.opacity = '1';
                
                // Smooth scroll to the section
                window.scrollTo({
                    top: targetSection.offsetTop - 80, // Account for navbar height
                    behavior: 'smooth'
                });
            }, 50);
        });
    });
    
    // Handle scroll events to update active navigation link
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        
        // Find the current section in view
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                const id = section.getAttribute('id');
                
                // Update navigation links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
        
        // Update navbar appearance on scroll
        const navbar = document.getElementById('main-nav');
        if (scrollPosition > 50) {
            navbar.style.padding = '15px';
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '20px';
            navbar.style.boxShadow = 'none';
        }
    });
}

// Export a function to handle hash navigation on page load
export function handleInitialNavigation() {
    // Check if there's a hash in the URL
    if (window.location.hash) {
        const targetId = window.location.hash.substring(1);
        const targetLink = document.querySelector(`.nav-links a[href="#${targetId}"]`);
        
        // Click the link if it exists
        if (targetLink) {
            setTimeout(() => {
                targetLink.click();
            }, 500); // Delay to ensure everything is loaded
        }
    }
}