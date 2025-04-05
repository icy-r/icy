import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const FullScreenCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Create scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    canvasRef.current.appendChild(renderer.domElement);
    
    // Create particles for visual effect
    const geometry = new THREE.BufferGeometry();
    const particleCount = 5000;
    const posArray = new Float32Array(particleCount * 3);
    
    for(let i = 0; i < particleCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    // Create gradient material
    const material = new THREE.PointsMaterial({
      size: 0.02,
      color: 0x8e44ad,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });
    
    const particleMesh = new THREE.Points(geometry, material);
    scene.add(particleMesh);
    
    camera.position.z = 3;
    
    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      particleMesh.rotation.x += 0.0003;
      particleMesh.rotation.y += 0.0005;
      
      // Wave effect
      const positions = particleMesh.geometry.attributes.position.array;
      for(let i = 0; i < positions.length; i+=3) {
        positions[i+1] += Math.sin(Date.now() * 0.001 + positions[i] * 0.1) * 0.0007;
      }
      particleMesh.geometry.attributes.position.needsUpdate = true;
      
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
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if(canvasRef.current && canvasRef.current.contains(renderer.domElement)) {
        canvasRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <div 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-screen z-[-1]"
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh'
      }}
    />
  );
};

export default FullScreenCanvas;