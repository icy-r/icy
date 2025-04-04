import axios from 'axios';

// LinkedIn API configuration
const LINKEDIN_API_URL = 'https://api.linkedin.com/v2';
let ACCESS_TOKEN = '';

// Initialize the LinkedIn integration
export async function initLinkedIn() {
    try {
        // In a real app, you'd implement proper OAuth 2.0 flow
        // For this demo, we'll use a simplified approach with a token input
        if (!ACCESS_TOKEN) {
            ACCESS_TOKEN = await promptForLinkedInToken();
        }
        
        return !!ACCESS_TOKEN;
    } catch (error) {
        console.error('Error initializing LinkedIn integration:', error);
        return false;
    }
}

// Prompt user for LinkedIn access token (development only)
function promptForLinkedInToken() {
    return new Promise((resolve) => {
        // Create modal for token input
        const modal = document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0,0,0,0.8)';
        modal.style.display = 'flex';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';
        modal.style.zIndex = '1001';
        
        const modalContent = document.createElement('div');
        modalContent.style.backgroundColor = '#0a192f';
        modalContent.style.padding = '30px';
        modalContent.style.borderRadius = '10px';
        modalContent.style.width = '500px';
        modalContent.style.maxWidth = '90%';
        
        modalContent.innerHTML = `
            <h3 style="color: #ccd6f6; margin-bottom: 20px;">LinkedIn Integration</h3>
            <p style="color: #8892b0; margin-bottom: 20px;">
                To enable LinkedIn data in this portfolio, please enter a valid LinkedIn access token.
                Getting a LinkedIn API token requires registering an application in the LinkedIn Developer Portal.
            </p>
            <div style="margin-bottom: 20px;">
                <input type="text" id="linkedin-token-input" placeholder="Enter LinkedIn Access Token" style="width: 100%; padding: 10px; background: #172a45; border: 1px solid #293d5a; color: #ccd6f6; border-radius: 5px;">
            </div>
            <div style="display: flex; justify-content: space-between;">
                <button id="skip-linkedin-btn" style="padding: 10px 15px; background: transparent; border: 1px solid #6c63ff; color: #6c63ff; border-radius: 5px; cursor: pointer;">Skip LinkedIn Integration</button>
                <button id="submit-linkedin-token" style="padding: 10px 15px; background: #6c63ff; color: white; border: none; border-radius: 5px; cursor: pointer;">Submit</button>
            </div>
        `;
        
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        // Add event listeners
        document.getElementById('submit-linkedin-token').addEventListener('click', () => {
            const token = document.getElementById('linkedin-token-input').value.trim();
            if (token) {
                document.body.removeChild(modal);
                resolve(token);
            } else {
                alert('Please enter a valid LinkedIn token or skip LinkedIn integration');
            }
        });
        
        document.getElementById('skip-linkedin-btn').addEventListener('click', () => {
            document.body.removeChild(modal);
            resolve('');
        });
    });
}

// Fetch LinkedIn profile data
export async function fetchLinkedInProfile() {
    if (!ACCESS_TOKEN) {
        console.warn('LinkedIn access token not available');
        return null;
    }
    
    try {
        // Fetch basic profile information
        const profileResponse = await axios.get(`${LINKEDIN_API_URL}/me`, {
            headers: {
                'Authorization': `Bearer ${ACCESS_TOKEN}`
            }
        });
        
        // Fetch profile picture
        const pictureResponse = await axios.get(`${LINKEDIN_API_URL}/me/profilePicture?projection=(displayImage~:playableStreams)`, {
            headers: {
                'Authorization': `Bearer ${ACCESS_TOKEN}`
            }
        });
        
        return {
            basicInfo: profileResponse.data,
            pictureInfo: pictureResponse.data
        };
    } catch (error) {
        console.error('Error fetching LinkedIn profile:', error);
        return null;
    }
}

// Fetch LinkedIn experience data
export async function fetchLinkedInExperience() {
    if (!ACCESS_TOKEN) {
        console.warn('LinkedIn access token not available');
        return [];
    }
    
    try {
        const response = await axios.get(`${LINKEDIN_API_URL}/me/positions`, {
            headers: {
                'Authorization': `Bearer ${ACCESS_TOKEN}`
            }
        });
        
        return response.data.elements || [];
    } catch (error) {
        console.error('Error fetching LinkedIn experience:', error);
        return [];
    }
}

// Fetch LinkedIn skills
export async function fetchLinkedInSkills() {
    if (!ACCESS_TOKEN) {
        console.warn('LinkedIn access token not available');
        return [];
    }
    
    try {
        const response = await axios.get(`${LINKEDIN_API_URL}/me/skills`, {
            headers: {
                'Authorization': `Bearer ${ACCESS_TOKEN}`
            }
        });
        
        return response.data.elements || [];
    } catch (error) {
        console.error('Error fetching LinkedIn skills:', error);
        return [];
    }
}

// Generate a professional experience section using LinkedIn data
export async function generateExperienceSection() {
    try {
        const experiences = await fetchLinkedInExperience();
        
        if (!experiences || experiences.length === 0) {
            // If no LinkedIn data, return simulated experience data
            return getSimulatedExperienceData();
        }
        
        const experienceHTML = experiences.map(exp => {
            return `
                <div class="experience-item">
                    <div class="experience-header">
                        <h3>${exp.title}</h3>
                        <span class="company-name">${exp.companyName}</span>
                    </div>
                    <div class="experience-duration">
                        ${formatDate(exp.startDate)} - ${exp.endDate ? formatDate(exp.endDate) : 'Present'}
                    </div>
                    <p class="experience-description">${exp.description || ''}</p>
                </div>
            `;
        }).join('');
        
        return experienceHTML;
    } catch (error) {
        console.error('Error generating experience section:', error);
        return getSimulatedExperienceData();
    }
}

// Helper function to format date from LinkedIn format
function formatDate(dateObj) {
    if (!dateObj) return '';
    
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    return `${months[dateObj.month - 1]} ${dateObj.year}`;
}

// Fallback function that returns simulated experience data
function getSimulatedExperienceData() {
    return `
        <div class="experience-item">
            <div class="experience-header">
                <h3>Senior Frontend Developer</h3>
                <span class="company-name">TechInnovate Solutions</span>
            </div>
            <div class="experience-duration">January 2021 - Present</div>
            <p class="experience-description">
                Led the development of responsive web applications using modern JavaScript frameworks.
                Implemented performance optimizations resulting in 40% faster load times.
                Mentored junior developers and introduced best practices for code quality.
            </p>
        </div>
        <div class="experience-item">
            <div class="experience-header">
                <h3>Full Stack Developer</h3>
                <span class="company-name">Digital Ventures Inc</span>
            </div>
            <div class="experience-duration">March 2018 - December 2020</div>
            <p class="experience-description">
                Developed and maintained multiple client projects using React, Node.js, and MongoDB.
                Collaborated with design team to implement intuitive user interfaces.
                Implemented CI/CD pipelines to streamline deployment processes.
            </p>
        </div>
        <div class="experience-item">
            <div class="experience-header">
                <h3>Junior Web Developer</h3>
                <span class="company-name">WebTech Studios</span>
            </div>
            <div class="experience-duration">June 2016 - February 2018</div>
            <p class="experience-description">
                Created responsive websites for diverse clients using HTML5, CSS3, and JavaScript.
                Assisted in the migration of legacy systems to modern frameworks.
                Participated in daily scrum meetings and biweekly sprint planning.
            </p>
        </div>
    `;
}