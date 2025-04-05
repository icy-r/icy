import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeBGParticle = ({ children }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        // === THREE.JS CODE START ===
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true }); // Add antialiasing for smoother edges
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

        // Particle Material
        const material = new THREE.PointsMaterial({ color: 0xffffff, size: 2 }); // Added size for visibility
        const particles = new THREE.Points(geometry, material);
        scene.add(particles);

        camera.position.z = 500;

        // Animation
        const animate = () => {
            requestAnimationFrame(animate);

            particles.rotation.x += 0.001;
            particles.rotation.y += 0.001;

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
            geometry.dispose(); // Dispose geometry
            material.dispose(); // Dispose material
        };
        // === THREE.JS CODE END ===
    }, []);

    return (
        <div ref={containerRef} className='three-bg-particle' style={{ 
            position: 'relative',
            width: '100%',
            overflow: 'hidden'
        }}>
            {/* Darker semi-transparent overlay to improve text visibility */}
            <div className='overlay' style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '100%', 
                backgroundColor: 'rgba(0, 0, 0, 0.75)' // Increased opacity from 0.5 to 0.75
            }}></div>
            {/* Children elements */}
            <div className='content' style={{ 
                position: 'relative', 
                zIndex: 1, 
                color: 'white', 
                padding: '0',
                width: '100%',
                overflowX: 'hidden'
            }}>
                {children}
            </div>
        </div>
    );
};

export default ThreeBGParticle;