import * as THREE from 'three';
import { useEffect, useRef } from 'react';

// Enhanced anime-styled floating menu bar with portfolio links
const FloatingMenuBar = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        // === THREE.JS CODE START ===
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        containerRef.current.appendChild(renderer.domElement);

        // Particle Geometry
        const geometry = new THREE.BufferGeometry();
        const vertices = [];

        for (let i = 0; i < 10000; i++) {
            vertices.push((Math.random() - 0.5) * 2000);
            vertices.push((Math.random() - 0.5) * 2000);
            vertices.push((Math.random() - 0.5) * 2000);
        }

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

        // Enhanced particle material with more vibrant colors and larger size for better anime style
        const material = new THREE.PointsMaterial({ 
            color: 0x00ffff, 
            size: 3,
            transparent: true,
            opacity: 0.8
        });
        const particles = new THREE.Points(geometry, material);
        scene.add(particles);

        camera.position.z = 500;

        // Animation with more dynamic rotation for enhanced anime feel
        const animate = () => {
            requestAnimationFrame(animate);

            particles.rotation.x += 0.0015;
            particles.rotation.y += 0.0015;
            
            // Add subtle wave effect
            particles.position.y = Math.sin(Date.now() * 0.0005) * 3;

            renderer.render(scene, camera);
        };

        animate();

        // Resize handling
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);
        
        // Clean up function
        return () => {
            window.removeEventListener('resize', handleResize);
            if(containerRef.current) {
                containerRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
            geometry.dispose();
            material.dispose();
        };
    }, []);

    // Function to handle download of CV as PDF - Fixed to prevent page refresh
    const handleDownloadCV = (e) => {
        e.preventDefault(); // Prevent default behavior (page refresh)
        
        // Create blob URL for the PDF (this avoids page refresh)
        fetch('/M_Mohamed_Asath-CV.pdf')
            .then(response => response.blob())
            .then(blob => {
                // Create a blob URL
                const url = window.URL.createObjectURL(blob);
                
                // Create temporary anchor element
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = 'M_Mohamed_Asath-CV.pdf'; 
                
                // Append to body, click, and remove
                document.body.appendChild(a);
                a.click();
                
                // Clean up
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            })
            .catch(err => console.error('Download failed:', err));
    };

    return (
        <div ref={containerRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9000]">
            {/* Enhanced anime-styled menu with gradient background, positioning and neon effects 
                Increased z-index to 9999 to ensure it's always on top */}
            <div className="fixed top-4 left-1/2 transform -translate-x-1/2 w-auto min-w-[480px] 
                           py-3 px-8 rounded-full bg-gradient-to-r from-purple-800 via-pink-600 to-blue-700 
                           shadow-[0_0_20px_rgba(255,0,255,0.7)] backdrop-blur-md
                           border border-white/20 z-[9999] pointer-events-auto">
                <nav className="flex justify-center items-center space-x-6">
                    <a href="#home" className="text-white font-bold hover:text-cyan-300 transition-all duration-300 
                                              transform hover:scale-110 relative group">
                        Home
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
                    </a>
                    <a href="#projects" className="text-white font-bold hover:text-pink-300 transition-all duration-300 
                                                 transform hover:scale-110 relative group">
                        Projects
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-400 group-hover:w-full transition-all duration-300"></span>
                    </a>
                    <a href="#skills" className="text-white font-bold hover:text-purple-300 transition-all duration-300 
                                               transform hover:scale-110 relative group">
                        Skills
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300"></span>
                    </a>
                    <a href="#experience" className="text-white font-bold hover:text-blue-300 transition-all duration-300 
                                                  transform hover:scale-110 relative group">
                        Experience
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
                    </a>
                    <a href="#contact" className="text-white font-bold hover:text-yellow-300 transition-all duration-300 
                                                transform hover:scale-110 relative group">
                        Contact
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
                    </a>
                    
                    {/* Interactive CV Download Button */}
                                        <button 
                        onClick={handleDownloadCV}
                        className="ml-2 px-4 py-1.5 bg-gradient-to-r from-pink-600 to-purple-600
                                 rounded-full text-white font-semibold text-sm
                                 hover:from-purple-600 hover:to-pink-600 
                                 transition-all duration-300 hover:scale-105 hover:shadow-lg
                                 shadow-[0_0_10px_rgba(219,39,119,0.5)]
                                 flex items-center gap-2 group"
                    >
                        <span className="group-hover:translate-x-1 transition-transform duration-300 text-center">
                            CV
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" 
                             className="h-4 w-4 transform translate-y-[-2000%] group-hover:translate-y-0 transition-transform duration-300" 
                             fill="none" 
                             viewBox="0 0 24 24" 
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                    </button>
                </nav>
            </div>
            
            {/* Floating interactive 3D download button positioned at bottom right */}
            <InteractiveDownloadButton />
        </div>
    );
};

// Interactive 3D Download Button Component using Three.js
const InteractiveDownloadButton = () => {
    const buttonRef = useRef(null);
    
    useEffect(() => {
        // Create a mini three.js scene for the button
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        
        const renderer = new THREE.WebGLRenderer({ 
            alpha: true,
            antialias: true 
        });
        renderer.setSize(100, 100);
        buttonRef.current.appendChild(renderer.domElement);
        
        // Create a glowing sphere
        const geometry = new THREE.SphereGeometry(1, 32, 32);
        const material = new THREE.MeshBasicMaterial({
            color: 0xff55ff,
            transparent: true,
            opacity: 0.8
        });
        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);
        
        // Add a halo effect
        const haloGeometry = new THREE.SphereGeometry(1.3, 32, 32);
        const haloMaterial = new THREE.MeshBasicMaterial({
            color: 0x00ffff,
            transparent: true,
            opacity: 0.3,
            side: THREE.BackSide
        });
        const halo = new THREE.Mesh(haloGeometry, haloMaterial);
        scene.add(halo);
        
        // Position camera
        camera.position.z = 3;
        
        // Animation
        const animate = () => {
            requestAnimationFrame(animate);
            
            // Floating animation
            sphere.position.y = Math.sin(Date.now() * 0.002) * 0.1;
            halo.position.y = sphere.position.y;
            
            // Subtle rotation
            sphere.rotation.y += 0.01;
            sphere.rotation.x += 0.005;
            
            // Pulsating effect for the halo
            const pulse = Math.sin(Date.now() * 0.003) * 0.1 + 1.3;
            halo.scale.set(pulse, pulse, pulse);
            
            renderer.render(scene, camera);
        };
        
        animate();
        
        // Cleanup function
        return () => {
            if (buttonRef.current) {
                buttonRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
            geometry.dispose();
            material.dispose();
            haloGeometry.dispose();
            haloMaterial.dispose();
        };
    }, []);
    
    // Handle download action - Fixed to prevent page refresh
    const downloadCV = (e) => {
        e.preventDefault(); // Prevent default behavior
        
        // Create blob URL for the PDF (this avoids page refresh)
        fetch('/M_Mohamed_Asath-CV.pdf')
            .then(response => response.blob())
            .then(blob => {
                // Create a blob URL
                const url = window.URL.createObjectURL(blob);
                
                // Create temporary anchor element
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = 'M_Mohamed_Asath-CV.pdf';
                
                // Append to body, click, and remove
                document.body.appendChild(a);
                a.click();
                
                // Clean up
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            })
            .catch(err => console.error('Download failed:', err));
    };
    
    return (
        <div
            ref={buttonRef}
            onClick={downloadCV}
            className="fixed bottom-6 right-6 w-[80px] h-[80px] cursor-pointer
                      hover:scale-110 transition-all duration-300 z-[8000] pointer-events-auto flex items-center justify-center
                      rounded-full bg-gradient-to-r from-purple-800 to-pink-600
                      shadow-[0_0_20px_rgba(255,0,255,0.7)] backdrop-blur-md
                      border border-white/20 transform hover:translate-y-1"
            title="Download M Mohamed Asath's CV"
        >
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-center text-white font-bold text-lg self-center">
                    CV
                </span>
            </div>
        </div>
    );
};

export default FloatingMenuBar;