import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap';

// Variables for our scene
let scene, camera, renderer, controls;
let particles, particleGeometry;
let mouseX = 0, mouseY = 0;
let targetX = 0, targetY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

export async function initThreeScene() {
    const container = document.getElementById('scene-container');

    // Scene setup
    scene = new THREE.Scene();
    
    // Camera setup
    const fov = 75;
    const aspect = window.innerWidth / window.innerHeight;
    const near = 0.1;
    const far = 1000;
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 30;
    
    // Renderer setup
    renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        alpha: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    
    // Controls setup
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    
    // Create particles
    await createParticles();
    
    // Add event listeners
    window.addEventListener('resize', onWindowResize);
    document.addEventListener('mousemove', onDocumentMouseMove);
    
    // Start animation loop
    animate();
    
    return true;
}

async function createParticles() {
    const particleCount = 3000;
    
    particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    // Generate particle texture programmatically
    const particleTexture = createParticleTexture();
    
    // Generate random particles
    const colorOptions = [
        new THREE.Color(0x6c63ff), // Primary color
        new THREE.Color(0x8c83ff), // Lighter primary
        new THREE.Color(0x4c43cf), // Darker primary
        new THREE.Color(0xf50057)  // Accent color
    ];
    
    for (let i = 0; i < particleCount; i++) {
        // Position
        const x = (Math.random() - 0.5) * 100;
        const y = (Math.random() - 0.5) * 100;
        const z = (Math.random() - 0.5) * 100;
        
        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
        
        // Color
        const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    // Material
    const particleMaterial = new THREE.PointsMaterial({
        size: 0.7,
        sizeAttenuation: true,
        transparent: true,
        alphaTest: 0.01,
        map: particleTexture,
        vertexColors: true
    });
    
    // Create the particle system
    particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
}

// Function to create a circular particle texture
function createParticleTexture() {
    const canvas = document.createElement('canvas');
    const size = 128;
    canvas.width = size;
    canvas.height = size;
    
    const context = canvas.getContext('2d');
    
    // Create a radial gradient for a soft particle
    const gradient = context.createRadialGradient(
        size / 2, size / 2, 0,
        size / 2, size / 2, size / 2
    );
    
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.5)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    
    // Draw the particle
    context.fillStyle = gradient;
    context.fillRect(0, 0, size, size);
    
    // Create THREE.js texture from canvas
    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    
    return texture;
}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove(event) {
    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;
}

function animate() {
    requestAnimationFrame(animate);
    
    // Update controls
    controls.update();
    
    // Smooth follow mouse
    targetX = mouseX * 0.001;
    targetY = mouseY * 0.001;
    
    if (particles) {
        particles.rotation.y += 0.002;
        gsap.to(particles.rotation, {
            x: targetY * 0.5,
            y: targetX * 0.5,
            duration: 2
        });
    }
    
    // Render
    renderer.render(scene, camera);
}