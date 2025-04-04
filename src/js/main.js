// Import modules
import { initThreeScene } from './threeScene.js';
import { fetchGitHubProjects } from './github.js';
import { initSkillsVisualization, enhanceSkillsWithAI } from './skills.js';
import { setupContactForm } from './contact.js';
import { setupNavigation } from './navigation.js';
import { initAI, generatePersonalizedBio, generateSkillRecommendations } from './ai-integration.js';
import { initLinkedIn, generateExperienceSection } from './linkedin-integration.js';

// Wait for DOM to be loaded
document.addEventListener('DOMContentLoaded', async () => {
  // Initialize loading screen
  const loadingScreen = document.getElementById('loading-screen');
  
  try {
    // Initialize navigation
    setupNavigation();
    
    // Initialize Three.js scene
    await initThreeScene();
    
    // Initialize AI capabilities
    const aiEnabled = await initAI();
    
    // Initialize LinkedIn integration
    const linkedInEnabled = await initLinkedIn();
    
    // Fetch GitHub projects
    await fetchGitHubProjects();
    
    // Load experience section from LinkedIn or fallback
    await loadExperienceSection();
    
    // Initialize skills visualization
    initSkillsVisualization();
    
    // Setup contact form
    setupContactForm();
    
    // Set up project modal events
    setupProjectModal();
    
    // If AI is enabled, enhance portfolio with AI features
    if (aiEnabled && window.projectsData) {
      enhancePortfolioWithAI();
    }
    
    // Hide loading screen after initialization
    setTimeout(() => {
      loadingScreen.style.opacity = '0';
      setTimeout(() => {
        loadingScreen.style.display = 'none';
      }, 500);
    }, 1000);
    
  } catch (error) {
    console.error('Error initializing portfolio:', error);
    document.querySelector('.loading-text').textContent = 'Something went wrong. Please refresh the page.';
  }
});

// Load experience section data from LinkedIn or fallback
async function loadExperienceSection() {
  try {
    const experienceContainer = document.getElementById('experience-container');
    if (!experienceContainer) return;
    
    // Generate experience HTML
    const experienceHTML = await generateExperienceSection();
    
    // Update container
    experienceContainer.innerHTML = experienceHTML;
    
    // Add animation effects to experience items
    const experienceItems = document.querySelectorAll('.experience-item');
    experienceItems.forEach((item, index) => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      }, 300 + (index * 100));
    });
    
  } catch (error) {
    console.error('Error loading experience section:', error);
    const experienceContainer = document.getElementById('experience-container');
    if (experienceContainer) {
      experienceContainer.innerHTML = '<p>Error loading experience data. Please try again later.</p>';
    }
  }
}

// Enhance portfolio with AI generated content
async function enhancePortfolioWithAI() {
  try {
    // Get skill data from the skills module
    const skillsData = window.skillsData || {};
    
    // Generate a personalized bio using AI
    const bio = await generatePersonalizedBio(window.projectsData, skillsData);
    if (bio) {
      // Add bio to the home section
      const bioElement = document.createElement('p');
      bioElement.className = 'ai-bio';
      bioElement.textContent = bio;
      
      // Insert after tagline
      const tagline = document.querySelector('.tagline');
      if (tagline && tagline.parentNode) {
        tagline.parentNode.insertBefore(bioElement, tagline.nextSibling);
      }
    }
    
    // Generate skill recommendations
    const recommendations = await generateSkillRecommendations(window.projectsData, skillsData);
    if (recommendations && recommendations.length > 0) {
      // Create recommendations section
      const recContainer = document.createElement('div');
      recContainer.className = 'skill-category ai-recommendations';
      
      // Add title
      const recTitle = document.createElement('h3');
      recTitle.className = 'category-title';
      recTitle.innerHTML = 'AI Skill Recommendations <span class="ai-badge">AI</span>';
      recContainer.appendChild(recTitle);
      
      // Add recommendations list
      const recList = document.createElement('ul');
      recList.className = 'recommendations-list';
      
      recommendations.forEach(rec => {
        const item = document.createElement('li');
        item.innerHTML = `<strong>${rec.skill}</strong>: ${rec.reason}`;
        recList.appendChild(item);
      });
      
      recContainer.appendChild(recList);
      
      // Add to skills container
      const skillsContainer = document.getElementById('skills-container');
      if (skillsContainer) {
        skillsContainer.appendChild(recContainer);
      }
    }
    
  } catch (error) {
    console.error('Error enhancing portfolio with AI:', error);
  }
}

// Set up project modal functionality
function setupProjectModal() {
  const modal = document.getElementById('project-detail-modal');
  const closeBtn = document.querySelector('.close-btn');
  
  // Close modal when clicking the close button
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  });
  
  // Close modal when clicking outside of modal content
  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });
}

// Handle button actions
document.getElementById('explore-btn').addEventListener('click', () => {
  document.querySelector('a[href="#projects"]').click();
});

document.getElementById('contact-btn').addEventListener('click', () => {
  document.querySelector('a[href="#contact"]').click();
});