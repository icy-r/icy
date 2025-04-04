import * as THREE from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';
import gsap from 'gsap';

// Define your skills in different categories
const skillsData = {
    frontend: [
        { name: "HTML", level: 90 },
        { name: "CSS", level: 85 },
        { name: "JavaScript", level: 95 },
        { name: "React", level: 88 },
        { name: "Angular", level: 80 },
        { name: "Vue", level: 75 }
    ],
    backend: [
        { name: "Node.js", level: 85 },
        { name: "Python", level: 80 },
        { name: "Express", level: 82 },
        { name: "MongoDB", level: 78 },
        { name: "SQL", level: 75 },
        { name: "GraphQL", level: 70 }
    ],
    other: [
        { name: "Git", level: 88 },
        { name: "AWS", level: 75 },
        { name: "Docker", level: 72 },
        { name: "Webpack", level: 78 },
        { name: "ThreeJS", level: 65 },
        { name: "TensorFlow", level: 60 }
    ]
};

// Store skills data globally for other modules to access
window.skillsData = skillsData;

// Variables for 3D visualization
let scene, camera, renderer, controls;
let skillSpheres = [];
let categoryGroups = {};

// Initialize skills visualization
export function initSkillsVisualization() {
    // Create regular skill categories display
    createSkillCategories();
    
    // Create 3D skill visualization
    createSkillsVisualization();
}

// Create regular skill categories display
function createSkillCategories() {
    const skillsContainer = document.getElementById('skills-container');
    
    // Create a container for each skill category
    Object.entries(skillsData).forEach(([category, skills]) => {
        // Create category container
        const categoryElement = document.createElement('div');
        categoryElement.className = 'skill-category';
        
        // Create category title
        const titleElement = document.createElement('h3');
        titleElement.className = 'category-title';
        titleElement.textContent = capitalize(category);
        categoryElement.appendChild(titleElement);
        
        // Create skills list container
        const skillsList = document.createElement('div');
        skillsList.className = 'skill-list';
        
        // Add each skill to the list
        skills.forEach(skill => {
            // Create skill item with interactive animation
            const skillItem = createSkillItem(skill);
            skillsList.appendChild(skillItem);
        });
        
        // Append skills list to category container
        categoryElement.appendChild(skillsList);
        
        // Append category to skills container
        skillsContainer.appendChild(categoryElement);
    });
    
    // Create container for 3D visualization
    const visualizationContainer = document.createElement('div');
    visualizationContainer.id = 'skills-visualization';
    visualizationContainer.className = 'skills-visualization';
    visualizationContainer.style.height = '400px';
    visualizationContainer.style.width = '100%';
    visualizationContainer.style.marginTop = '40px';
    visualizationContainer.style.position = 'relative';
    visualizationContainer.style.overflow = 'hidden';
    visualizationContainer.style.borderRadius = '10px';
    visualizationContainer.style.backgroundColor = 'rgba(26, 39, 59, 0.5)';
    
    // Add visualization container to the skills section
    skillsContainer.appendChild(visualizationContainer);
}

// Create a single skill item element
function createSkillItem(skill) {
    const skillItem = document.createElement('div');
    skillItem.className = 'skill-item';
    skillItem.setAttribute('data-level', skill.level);
    skillItem.textContent = skill.name;
    
    // Add hover animation
    skillItem.addEventListener('mouseover', () => {
        skillItem.style.transform = 'translateY(-5px)';
        skillItem.style.backgroundColor = `rgba(108, 99, 255, ${skill.level / 100})`;
        
        // Highlight the corresponding sphere in 3D visualization
        highlightSkillSphere(skill.name);
    });
    
    skillItem.addEventListener('mouseout', () => {
        skillItem.style.transform = 'translateY(0)';
        skillItem.style.backgroundColor = 'rgba(108, 99, 255, 0.2)';
        
        // Reset highlighted spheres
        resetSkillSpheres();
    });
    
    return skillItem;
}

// Create 3D visualization of skills
function createSkillsVisualization() {
    const container = document.getElementById('skills-visualization');
    if (!container) return;
    
    // Scene setup
    scene = new THREE.Scene();
    
    // Camera setup
    const aspect = container.clientWidth / container.clientHeight;
    camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
    camera.position.z = 30;
    
    // Renderer setup
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
    
    // Controls setup
    controls = new TrackballControls(camera, renderer.domElement);
    controls.rotateSpeed = 2.5;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;
    controls.noZoom = false;
    controls.noPan = false;
    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);
    
    // Create skill nodes
    createSkillNodes();
    
    // Add window resize handler
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
        controls.update();
    });
    
    // Start animation loop
    animate();
}

// Create 3D nodes for each skill
function createSkillNodes() {
    let categoryIndex = 0;
    
    // Create a group for each category
    Object.entries(skillsData).forEach(([category, skills]) => {
        const group = new THREE.Group();
        scene.add(group);
        categoryGroups[category] = group;
        
        // Calculate angle for this category in the visualization
        const categoryAngle = (categoryIndex / Object.keys(skillsData).length) * Math.PI * 2;
        const categoryRadius = 15;
        const categoryX = Math.sin(categoryAngle) * categoryRadius;
        const categoryZ = Math.cos(categoryAngle) * categoryRadius;
        
        // Position the group
        group.position.set(categoryX, 0, categoryZ);
        
        // Create spheres for each skill
        skills.forEach((skill, skillIndex) => {
            // Calculate position in a circular pattern
            const angle = (skillIndex / skills.length) * Math.PI * 2;
            const radius = 8;
            const x = Math.sin(angle) * radius;
            const y = (skill.level / 40) - 1; // Higher level = higher position
            const z = Math.cos(angle) * radius;
            
            // Create sphere
            const size = 0.4 + (skill.level / 100);
            const geometry = new THREE.SphereGeometry(size, 32, 32);
            
            // Create material with a glow effect
            const material = new THREE.MeshPhongMaterial({
                color: getSkillColor(category, skillIndex),
                emissive: getSkillColor(category, skillIndex, 0.2),
                emissiveIntensity: 0.5,
                transparent: true,
                opacity: 0.9,
                shininess: 100
            });
            
            const sphere = new THREE.Mesh(geometry, material);
            sphere.position.set(x, y, z);
            sphere.userData = { 
                type: 'skill', 
                name: skill.name, 
                category: category, 
                level: skill.level,
                originalScale: sphere.scale.clone(),
                originalEmissive: material.emissive.clone()
            };
            
            // Add to group
            group.add(sphere);
            
            // Store reference to skill sphere
            skillSpheres.push(sphere);
            
            // Add skill name as a text sprite
            createTextSprite(skill.name, sphere, size);
            
            // Add connecting line to center
            createConnectingLine(new THREE.Vector3(0, 0, 0), sphere.position, group, category);
        });
        
        // Create category label
        const categoryLabel = document.createElement('div');
        categoryLabel.className = 'category-3d-label';
        categoryLabel.textContent = capitalize(category);
        categoryLabel.style.position = 'absolute';
        categoryLabel.style.color = getCategoryColor(category);
        categoryLabel.style.fontWeight = 'bold';
        categoryLabel.style.textShadow = '0 0 5px rgba(0,0,0,0.5)';
        categoryLabel.style.display = 'none'; // Will be positioned in the animate loop
        
        document.getElementById('skills-visualization').appendChild(categoryLabel);
        
        // Store the label in the group for positioning
        group.userData = { label: categoryLabel };
        
        categoryIndex++;
    });
}

// Create text sprite for skill name
function createTextSprite(text, parent, size) {
    // Use HTML elements for labels that will be positioned in the animation loop
    const label = document.createElement('div');
    label.className = 'skill-3d-label';
    label.textContent = text;
    label.style.position = 'absolute';
    label.style.fontSize = '12px';
    label.style.color = '#ffffff';
    label.style.textShadow = '0 0 3px rgba(0,0,0,0.8)';
    label.style.display = 'none'; // Will be positioned in the animate loop
    
    document.getElementById('skills-visualization').appendChild(label);
    
    // Store the label in the parent for positioning
    parent.userData.label = label;
}

// Create a line connecting a skill node to its category center
function createConnectingLine(startPoint, endPoint, group, category) {
    const geometry = new THREE.BufferGeometry().setFromPoints([startPoint, endPoint]);
    const material = new THREE.LineBasicMaterial({ 
        color: getCategoryColor(category, 0.4),
        transparent: true,
        opacity: 0.3
    });
    
    const line = new THREE.Line(geometry, material);
    group.add(line);
    
    return line;
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    // Update controls
    controls.update();
    
    // Update position of HTML labels to match 3D objects
    updateLabels();
    
    // Rotate each category group slightly
    Object.values(categoryGroups).forEach(group => {
        group.rotation.y += 0.002;
    });
    
    // Render
    renderer.render(scene, camera);
}

// Update positions of HTML labels to match 3D positions
function updateLabels() {
    // Skip if container isn't available
    const container = document.getElementById('skills-visualization');
    if (!container) return;
    
    // Get container bounds
    const rect = container.getBoundingClientRect();
    
    // Update skill labels
    skillSpheres.forEach(sphere => {
        if (!sphere.userData.label) return;
        
        // Get screen position of sphere
        const position = new THREE.Vector3();
        position.setFromMatrixPosition(sphere.matrixWorld);
        position.project(camera);
        
        // Convert normalized coordinates to pixel coordinates
        const x = (position.x * 0.5 + 0.5) * rect.width;
        const y = (-position.y * 0.5 + 0.5) * rect.height;
        
        // Check if sphere is in front of camera (z between -1 and 1 in clip space)
        if (position.z > -1 && position.z < 1) {
            sphere.userData.label.style.display = 'block';
            sphere.userData.label.style.left = `${x}px`;
            sphere.userData.label.style.top = `${y}px`;
        } else {
            sphere.userData.label.style.display = 'none';
        }
    });
    
    // Update category labels
    Object.values(categoryGroups).forEach(group => {
        if (!group.userData || !group.userData.label) return;
        
        // Calculate center position of group
        const position = new THREE.Vector3();
        position.setFromMatrixPosition(group.matrixWorld);
        position.project(camera);
        
        // Convert normalized coordinates to pixel coordinates
        const x = (position.x * 0.5 + 0.5) * rect.width;
        const y = (-position.y * 0.5 + 0.5) * rect.height - 30; // Offset upward
        
        // Show label if in front of camera
        if (position.z > -1 && position.z < 1) {
            group.userData.label.style.display = 'block';
            group.userData.label.style.left = `${x}px`;
            group.userData.label.style.top = `${y}px`;
        } else {
            group.userData.label.style.display = 'none';
        }
    });
}

// Highlight a skill sphere when corresponding skill item is hovered
function highlightSkillSphere(skillName) {
    skillSpheres.forEach(sphere => {
        if (sphere.userData.name === skillName) {
            // Scale up
            gsap.to(sphere.scale, {
                x: sphere.userData.originalScale.x * 1.4,
                y: sphere.userData.originalScale.y * 1.4,
                z: sphere.userData.originalScale.z * 1.4,
                duration: 0.3
            });
            
            // Increase emissive intensity
            gsap.to(sphere.material, {
                emissiveIntensity: 1.0,
                duration: 0.3
            });
            
            // Make label more prominent
            if (sphere.userData.label) {
                sphere.userData.label.style.fontWeight = 'bold';
                sphere.userData.label.style.fontSize = '14px';
            }
        }
    });
}

// Reset all skill spheres to normal state
function resetSkillSpheres() {
    skillSpheres.forEach(sphere => {
        // Reset scale
        gsap.to(sphere.scale, {
            x: sphere.userData.originalScale.x,
            y: sphere.userData.originalScale.y,
            z: sphere.userData.originalScale.z,
            duration: 0.3
        });
        
        // Reset emissive intensity
        gsap.to(sphere.material, {
            emissiveIntensity: 0.5,
            duration: 0.3
        });
        
        // Reset label
        if (sphere.userData.label) {
            sphere.userData.label.style.fontWeight = 'normal';
            sphere.userData.label.style.fontSize = '12px';
        }
    });
}

// Get color for skill based on category and index
function getSkillColor(category, index, opacity = 1.0) {
    const colors = {
        frontend: [
            new THREE.Color(0x6c63ff),
            new THREE.Color(0x8385e5),
            new THREE.Color(0x9b8feb),
            new THREE.Color(0xb39af0),
            new THREE.Color(0xcaa4f5),
            new THREE.Color(0xe2affa)
        ],
        backend: [
            new THREE.Color(0x00bcd4),
            new THREE.Color(0x26c6da),
            new THREE.Color(0x4dd0e1),
            new THREE.Color(0x80deea),
            new THREE.Color(0xb2ebf2),
            new THREE.Color(0xe0f7fa)
        ],
        other: [
            new THREE.Color(0xff9800),
            new THREE.Color(0xffa726),
            new THREE.Color(0xffb74d),
            new THREE.Color(0xffcc80),
            new THREE.Color(0xffe0b2),
            new THREE.Color(0xfff3e0)
        ]
    };
    
    const color = colors[category][index % colors[category].length];
    return color;
}

// Get general color for a category
function getCategoryColor(category, opacity = 1.0) {
    const colors = {
        frontend: '#6c63ff',
        backend: '#00bcd4',
        other: '#ff9800'
    };
    
    return colors[category] || '#ffffff';
}

// For AI enhancement integration
export async function enhanceSkillsWithAI() {
    // This function could be implemented to use AI APIs like Gemini
    // to analyze skills and provide personalized recommendations
    // or create dynamic skill visualizations based on project analysis
    
    console.log('AI skills enhancement functionality would be implemented here');
    
    // Return mock data
    return {
        recommendations: [
            'Consider learning GraphQL to enhance your API development skills',
            'Your frontend skills are strong, explore more WebGL and Three.js projects',
            'Based on your backend work, learning Rust could be beneficial'
        ]
    };
}

// Helper function to capitalize a string
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}