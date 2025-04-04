import axios from 'axios';

// Gemini API endpoint
const GEMINI_API_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

// Your API key - you should use an environment variable for this in production
let API_KEY = '';

// Initialize the AI integration
export async function initAI() {
    try {
        // In a real application, you would load this from environment variables
        // For development purposes, we're providing an input method
        if (!API_KEY) {
            API_KEY = await promptForAPIKey();
        }
        
        return !!API_KEY;
    } catch (error) {
        console.error('Error initializing AI:', error);
        return false;
    }
}

// Prompt user for API key (only for development)
function promptForAPIKey() {
    return new Promise((resolve) => {
        // Create modal for API key input
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
            <h3 style="color: #ccd6f6; margin-bottom: 20px;">Enter Gemini API Key</h3>
            <p style="color: #8892b0; margin-bottom: 20px;">
                To enable AI features in this portfolio, please enter a valid Gemini API key.
                You can get one from <a href="https://makersuite.google.com/app/apikey" target="_blank" style="color: #6c63ff;">Google AI Studio</a>.
            </p>
            <div style="margin-bottom: 20px;">
                <input type="text" id="api-key-input" placeholder="Enter API Key" style="width: 100%; padding: 10px; background: #172a45; border: 1px solid #293d5a; color: #ccd6f6; border-radius: 5px;">
            </div>
            <div style="display: flex; justify-content: space-between;">
                <button id="skip-ai-btn" style="padding: 10px 15px; background: transparent; border: 1px solid #6c63ff; color: #6c63ff; border-radius: 5px; cursor: pointer;">Skip AI Features</button>
                <button id="submit-api-key" style="padding: 10px 15px; background: #6c63ff; color: white; border: none; border-radius: 5px; cursor: pointer;">Submit</button>
            </div>
        `;
        
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        // Add event listeners
        document.getElementById('submit-api-key').addEventListener('click', () => {
            const key = document.getElementById('api-key-input').value.trim();
            if (key) {
                document.body.removeChild(modal);
                resolve(key);
            } else {
                alert('Please enter a valid API key or skip AI features');
            }
        });
        
        document.getElementById('skip-ai-btn').addEventListener('click', () => {
            document.body.removeChild(modal);
            resolve('');
        });
    });
}

// Generate project descriptions with Gemini
export async function enhanceProjectDescription(projectName, codeLanguages, repoDescription) {
    if (!API_KEY) return repoDescription;
    
    try {
        const prompt = `
            Create a professional and engaging description for a software project with the following details:
            - Project name: ${projectName}
            - Programming languages used: ${codeLanguages.join(', ')}
            - Original brief description: "${repoDescription || 'No description available'}"
            
            The description should be 2-3 sentences, highlight the project's purpose and technical features, 
            and be written in a professional tone suitable for a developer portfolio.
        `;
        
        const response = await axios.post(
            `${GEMINI_API_ENDPOINT}?key=${API_KEY}`,
            {
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }]
            }
        );
        
        if (response.data && response.data.candidates && response.data.candidates[0]) {
            return response.data.candidates[0].content.parts[0].text.trim();
        } else {
            return repoDescription;
        }
    } catch (error) {
        console.error('Error generating project description with AI:', error);
        return repoDescription;
    }
}

// Generate skill recommendations with Gemini
export async function generateSkillRecommendations(projects, currentSkills) {
    if (!API_KEY) return [];
    
    try {
        const prompt = `
            Based on the following projects and current skills, provide 3 specific skill recommendations for a software developer to focus on next.
            
            Projects: 
            ${projects.map(p => `- ${p.name}: ${p.description || 'No description'} (Languages: ${p.language || 'Not specified'})`).join('\n')}
            
            Current skills:
            ${Object.entries(currentSkills).map(([category, skills]) => 
                `${category}: ${skills.map(s => s.name).join(', ')}`
            ).join('\n')}
            
            Format your response as a JSON array with 3 objects having "skill" and "reason" properties, with no introduction or conclusion text.
            Example: [{"skill":"GraphQL","reason":"Would complement your backend work with REST APIs"},...]
        `;
        
        const response = await axios.post(
            `${GEMINI_API_ENDPOINT}?key=${API_KEY}`,
            {
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }]
            }
        );
        
        if (response.data && response.data.candidates && response.data.candidates[0]) {
            const text = response.data.candidates[0].content.parts[0].text.trim();
            try {
                return JSON.parse(text);
            } catch (e) {
                console.error('Error parsing AI response as JSON:', e);
                return [];
            }
        } else {
            return [];
        }
    } catch (error) {
        console.error('Error generating skill recommendations with AI:', error);
        return [];
    }
}

// Generate a personalized bio with Gemini
export async function generatePersonalizedBio(projects, skills, name = 'Developer') {
    if (!API_KEY) return '';
    
    try {
        // Extract main skills and projects for the prompt
        const mainSkills = Object.values(skills)
            .flat()
            .sort((a, b) => b.level - a.level)
            .slice(0, 5)
            .map(s => s.name);
        
        const topProjects = projects
            .slice(0, 3)
            .map(p => p.name);
        
        const prompt = `
            Create a professional first-person bio for a software developer with the following details:
            - Name: ${name}
            - Top skills: ${mainSkills.join(', ')}
            - Notable projects: ${topProjects.join(', ')}
            
            The bio should be 3-4 sentences, highlight expertise and interests in software development,
            be written in a conversational but professional first-person tone, and be suitable for a developer portfolio.
            Do not use the placeholder name "Developer" in the bio if that's the provided name.
        `;
        
        const response = await axios.post(
            `${GEMINI_API_ENDPOINT}?key=${API_KEY}`,
            {
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }]
            }
        );
        
        if (response.data && response.data.candidates && response.data.candidates[0]) {
            return response.data.candidates[0].content.parts[0].text.trim();
        } else {
            return '';
        }
    } catch (error) {
        console.error('Error generating personalized bio with AI:', error);
        return '';
    }
}