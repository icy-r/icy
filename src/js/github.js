import axios from 'axios';
import { enhanceProjectDescription } from './ai-integration.js';

// GitHub API endpoints
const GITHUB_API_URL = 'https://api.github.com';

// Your GitHub username - replace with your own or use environment variables
const GITHUB_USERNAME = 'icy-r'; 

// Fetch GitHub projects and populate the projects section
export async function fetchGitHubProjects() {
    try {
        const projectsContainer = document.getElementById('projects-container');
        projectsContainer.innerHTML = '<div class="loading">Loading projects...</div>';
        
        // Fetch repositories from GitHub
        const response = await axios.get(`${GITHUB_API_URL}/users/${GITHUB_USERNAME}/repos`, {
            params: {
                sort: 'updated',
                per_page: 9
            }
        });
        
        // Check for empty response
        if (!response.data || response.data.length === 0) {
            projectsContainer.innerHTML = '<p>No projects found. Check back later!</p>';
            return;
        }
        
        // Clear loading message
        projectsContainer.innerHTML = '';
        
        // Store projects for other uses (like AI skill recommendations)
        window.projectsData = response.data;
        
        // Process and display each repository
        for (const repo of response.data) {
            // Skip forked repositories if you want
            if (repo.fork) continue;
            
            // Create project card element
            const projectCard = await createProjectCard(repo);
            projectsContainer.appendChild(projectCard);
            
            // Add event listener to open project details modal
            projectCard.addEventListener('click', () => {
                openProjectModal(repo);
            });
        }
        
    } catch (error) {
        console.error('Error fetching GitHub projects:', error);
        document.getElementById('projects-container').innerHTML = 
            '<p>Error loading projects. Please try again later.</p>';
    }
}

// Create a project card element for each repository
async function createProjectCard(repo) {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    // Get language colors
    const languageColor = getLanguageColor(repo.language);
    
    // Get languages to pass to AI for context
    const languages = [];
    if (repo.language) {
        languages.push(repo.language);
    }
    
    try {
        // Fetch repository languages if available
        const languagesRes = await axios.get(repo.languages_url);
        Object.keys(languagesRes.data).forEach(lang => {
            if (!languages.includes(lang)) {
                languages.push(lang);
            }
        });
    } catch (error) {
        console.warn('Could not fetch languages for', repo.name);
    }
    
    // Try to enhance description with AI
    let description = repo.description || 'No description available';
    
    try {
        const enhancedDescription = await enhanceProjectDescription(
            repo.name, 
            languages, 
            repo.description
        );
        
        if (enhancedDescription && enhancedDescription !== repo.description) {
            description = enhancedDescription;
            // Store the enhanced description for later use
            repo.enhancedDescription = enhancedDescription;
        }
    } catch (error) {
        console.warn('Could not enhance description with AI for', repo.name);
    }
    
    // Create project card HTML
    card.innerHTML = `
        <div class="project-image" style="background: ${languageColor ? languageColor : '#6c63ff'}"></div>
        <div class="project-info">
            <h3 class="project-title">${repo.name}</h3>
            <p class="project-description">${description}</p>
            <div class="project-tech">
                ${languages.map(lang => `<span class="tech-tag">${lang}</span>`).join('')}
                <span class="tech-tag">⭐ ${repo.stargazers_count}</span>
                <span class="tech-tag">🍴 ${repo.forks_count}</span>
            </div>
        </div>
    `;
    
    return card;
}

// Open project details in a modal
async function openProjectModal(repo) {
    try {
        const modal = document.getElementById('project-detail-modal');
        const modalContent = document.getElementById('project-detail-content');
        
        // Set loading state
        modalContent.innerHTML = '<div class="loading">Loading project details...</div>';
        
        // Show modal
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Fetch additional repository details if needed
        let readme = null;
        try {
            const readmeRes = await axios.get(`${GITHUB_API_URL}/repos/${GITHUB_USERNAME}/${repo.name}/readme`, {
                headers: { 'Accept': 'application/vnd.github.v3.html' }
            });
            readme = readmeRes.data;
        } catch (error) {
            console.warn('README not found for', repo.name);
        }
        
        // Fetch repository languages
        const languagesRes = await axios.get(repo.languages_url);
        const languages = Object.keys(languagesRes.data);
        
        // Fetch commits to get last update date
        const commitsRes = await axios.get(`${GITHUB_API_URL}/repos/${GITHUB_USERNAME}/${repo.name}/commits`, {
            params: { per_page: 1 }
        });
        const lastCommitDate = commitsRes.data[0]?.commit.author.date;
        
        // Use enhanced description if available
        const description = repo.enhancedDescription || repo.description || 'No description available';
        
        // Create modal content with project details
        modalContent.innerHTML = `
            <div class="project-header">
                <h2>${repo.name}</h2>
                <div class="project-meta">
                    ${lastCommitDate ? `<span>Last updated: ${new Date(lastCommitDate).toLocaleDateString()}</span>` : ''}
                    <span>⭐ ${repo.stargazers_count} stars</span>
                    <span>🍴 ${repo.forks_count} forks</span>
                </div>
            </div>
            
            <div class="project-body">
                <div class="project-description">
                    <h3>About</h3>
                    <p>${description}</p>
                </div>
                
                <div class="project-languages">
                    <h3>Technologies</h3>
                    <div class="tech-tags">
                        ${languages.map(lang => `<span class="tech-tag" style="background-color: ${getLanguageColor(lang, true)}">${lang}</span>`).join('')}
                    </div>
                </div>
                
                ${readme ? `<div class="project-readme"><h3>README</h3>${readme}</div>` : ''}
                
                <div class="project-links">
                    <a href="${repo.html_url}" target="_blank" class="primary-btn">View on GitHub</a>
                    ${repo.homepage ? `<a href="${repo.homepage}" target="_blank" class="secondary-btn">Live Demo</a>` : ''}
                </div>
            </div>
        `;
        
    } catch (error) {
        console.error('Error fetching project details:', error);
        document.getElementById('project-detail-content').innerHTML = 
            '<p>Error loading project details. Please try again later.</p>';
    }
}

// Get language color for visual representation
function getLanguageColor(language, isTransparent = false) {
    if (!language) return null;
    
    // Map of programming languages to colors
    const colors = {
        JavaScript: isTransparent ? 'rgba(241, 224, 90, 0.2)' : '#f1e05a',
        TypeScript: isTransparent ? 'rgba(49, 120, 198, 0.2)' : '#3178c6',
        HTML: isTransparent ? 'rgba(227, 76, 38, 0.2)' : '#e34c26',
        CSS: isTransparent ? 'rgba(86, 61, 124, 0.2)' : '#563d7c',
        Python: isTransparent ? 'rgba(53, 114, 165, 0.2)' : '#3572a5',
        Java: isTransparent ? 'rgba(176, 114, 25, 0.2)' : '#b07219',
        PHP: isTransparent ? 'rgba(79, 93, 149, 0.2)' : '#4F5D95',
        Ruby: isTransparent ? 'rgba(112, 21, 22, 0.2)' : '#701516',
        C: isTransparent ? 'rgba(85, 85, 85, 0.2)' : '#555555',
        'C++': isTransparent ? 'rgba(243, 75, 125, 0.2)' : '#f34b7d',
        'C#': isTransparent ? 'rgba(23, 134, 0, 0.2)' : '#178600',
        Go: isTransparent ? 'rgba(0, 173, 216, 0.2)' : '#00add8',
        Rust: isTransparent ? 'rgba(222, 165, 132, 0.2)' : '#dea584',
        Swift: isTransparent ? 'rgba(252, 73, 32, 0.2)' : '#ffac45',
    };
    
    return colors[language] || (isTransparent ? 'rgba(108, 99, 255, 0.2)' : '#6c63ff');
}