import { useEffect } from 'react';
import FloatingMenuBar from './three-comp/floating-menubar';
import FloatingProfileAndBio from './three-comp/floating-profile&bio';
import Projects from './main-comp/Projects';
import Skills from './main-comp/Skills';
import Experience from './main-comp/Experience';
import FullScreenCanvas from './three-comp/full-screen-canvas';
import useSmootherScroll from './hooks/useSmootherScroll';
import './App.css';

function App() {
  // Apply our custom smooth scrolling
  useSmootherScroll();

  // Enable smooth scrolling for navigation links
  useEffect(() => {
    // Handle smooth scrolling when clicking on anchor links
    const handleAnchorClick = (e) => {
      const href = e.currentTarget.getAttribute('href');
      
      // Only handle internal anchor links
      if (href?.startsWith('#')) {
        e.preventDefault();
        
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          // Add offset for the fixed menu bar
          const menuHeight = 80; // Approximate height of the menu bar
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - menuHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    };
    
    // Add event listeners to all anchor tags
    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(anchor => {
      anchor.addEventListener('click', handleAnchorClick);
    });
    
    // Cleanup
    return () => {
      anchors.forEach(anchor => {
        anchor.removeEventListener('click', handleAnchorClick);
      });
    };
  }, []);
  
  return (
    <div className="App w-full max-w-full overflow-x-hidden">
      {/* Single full-screen canvas background */}
      <FullScreenCanvas />
      
      <div className="content" style={{ position: 'relative', zIndex: 1, width: '100%', overflowX: 'hidden' }}>
        {/* Fixed menu bar that stays on top */}
        <FloatingMenuBar />
        
        {/* Profile section - now the component itself handles its container */}
        <FloatingProfileAndBio />
        
        {/* Projects section */}
        <Projects />
        
        {/* Skills section */}
        <Skills />
        
        {/* Experience section */}
        <Experience />
        
        {/* Contact section */}
        <section id="contact" className="min-h-screen py-20 relative w-full max-w-full overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-yellow-400 to-amber-500 text-transparent bg-clip-text">
              Get In Touch
            </h2>
            
            <div className="max-w-3xl mx-auto bg-gradient-to-br from-yellow-900/50 to-amber-900/50 backdrop-blur-md 
                          rounded-xl p-8 border border-white/10
                          shadow-[0_0_15px_rgba(245,158,11,0.3)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-yellow-200 mb-4">Contact Information</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-yellow-500/20 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-300" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </div>
                      <a href="mailto:asath12882@gmail.com" className="text-gray-300 hover:text-yellow-200 transition-colors">
                        asath12882@gmail.com
                      </a>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-yellow-500/20 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-300" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                      </div>
                      <a href="tel:+94770664182" className="text-gray-300 hover:text-yellow-200 transition-colors">
                        +94 77 066 4182
                      </a>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-yellow-500/20 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-300" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <a href="https://www.icy-r.dev" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-yellow-200 transition-colors">
                        www.icy-r.dev
                      </a>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <h4 className="text-xl font-bold text-yellow-200 mb-3">Connect With Me</h4>
                    <div className="flex gap-4">
                      <a href="https://www.linkedin.com/in/mohamad-asath/" target="_blank" rel="noopener noreferrer" className="p-3 bg-yellow-500/30 rounded-full text-yellow-300 hover:bg-yellow-500/50 transition-all hover:scale-110">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                        </svg>
                      </a>
                      <a href="https://github.com/icy-r" target="_blank" rel="noopener noreferrer" className="p-3 bg-yellow-500/30 rounded-full text-yellow-300 hover:bg-yellow-500/50 transition-all hover:scale-110">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-yellow-200 mb-4">Send Me a Message</h3>
                  <form className="space-y-4">
                    <div>
                      <input 
                        type="text" 
                        placeholder="Your Name"
                        className="w-full px-4 py-2 bg-yellow-900/30 border border-yellow-500/30 rounded-lg focus:outline-none focus:border-yellow-500/70 text-white placeholder-yellow-200/70"
                      />
                    </div>
                    <div>
                      <input 
                        type="email" 
                        placeholder="Your Email"
                        className="w-full px-4 py-2 bg-yellow-900/30 border border-yellow-500/30 rounded-lg focus:outline-none focus:border-yellow-500/70 text-white placeholder-yellow-200/70"
                      />
                    </div>
                    <div>
                      <textarea 
                        rows="4" 
                        placeholder="Your Message"
                        className="w-full px-4 py-2 bg-yellow-900/30 border border-yellow-500/30 rounded-lg focus:outline-none focus:border-yellow-500/70 text-white placeholder-yellow-200/70 resize-none"
                      ></textarea>
                    </div>
                    <div>
                      <button 
                        type="button"
                        className="px-6 py-3 bg-gradient-to-r from-yellow-600 to-amber-600 text-white font-medium rounded-lg hover:from-amber-600 hover:to-yellow-600 transition-all hover:scale-105 shadow-[0_0_10px_rgba(245,158,11,0.5)] w-full"
                      >
                        Send Message
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="py-6 bg-gradient-to-r from-purple-900/90 to-pink-900/90 backdrop-blur-md border-t border-white/10 w-full overflow-hidden">
          <div className="container mx-auto px-4 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} M Mohamed Asath. All rights reserved.</p>
            <p className="text-sm mt-1">Crafted with React, Three.js, and Tailwind CSS</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
