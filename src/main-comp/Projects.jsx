import React, { useRef } from 'react';

const Projects = () => {
    const containerRef = useRef(null);
    
    // Project data extracted from CV (f2.html)
    const projects = [
        {
            title: "Personal Portfolio Website",
            url: "https://icy-r.dev",
            description: "A modern, responsive personal portfolio website showcasing my projects and professional experience. Features dynamic content loading, responsive design, and modern UI/UX principles.",
            techStack: "React.js, Vite, Modern UI/UX design principles, ESLint, SWC, GitHub Pages"
        },
        {
            title: "RESTful Personal Finance Management System",
            url: null,
            description: "Developed a comprehensive RESTful API for personal finance management, featuring user authentication, transaction tracking, budget management, and financial goal setting. Implemented secure user authentication and complete CRUD operations.",
            techStack: "Express.js (Node.js), MongoDB, JWT, Swagger/OpenAPI, Automated testing, pnpm"
        },
        {
            title: "OSGi-based Modular System",
            url: null,
            description: "Implemented a modular system using OSGi framework, demonstrating enterprise-level software architecture principles. Features dynamic module management and component-based development.",
            techStack: "Java, OSGi Framework, Maven/Gradle, Modular System Design, Component-based Architecture"
        },
        {
            title: "Skyhawks Data Analysis",
            url: null,
            description: "Data analysis project utilizing Jupyter Notebooks for data processing, visualization, and statistical analysis. Demonstrates proficiency in data science tools and analytical thinking.",
            techStack: "Python, Jupyter Notebook, Pandas, NumPy, Matplotlib/Seaborn, Git"
        },
        {
            title: "AIESEC Platform Development",
            url: "https://github.com/icy-r/aiesec",
            description: "Full-stack development of a platform for global talent exchange initiatives, featuring user management and project coordination capabilities.",
            techStack: "JavaScript, React, Node.js, REST APIs"
        },
        {
            title: "AIESEC Partner Integration",
            url: "https://github.com/icy-r/aiesec-p1",
            description: "Collaborative project implementing partner integration features for global talent exchange platform.",
            techStack: "JavaScript, API Integration, System Architecture"
        }
    ];

    return (
        <div id="projects" className="min-h-screen relative py-20">
            {/* ThreeJS background container - removed, using global canvas */}
            <div ref={containerRef} className="absolute inset-0 -z-10" />
            
            {/* Content with anime styling */}
            <div className="container mx-auto px-4 relative z-10">
                <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text">
                    My Projects
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <div 
                            key={index}
                            className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 backdrop-blur-md 
                                    rounded-xl p-6 border border-white/10 
                                    shadow-[0_0_15px_rgba(255,105,180,0.3)] hover:shadow-[0_0_25px_rgba(255,105,180,0.5)]
                                    transform transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <h3 className="text-2xl font-bold text-pink-200">{project.title}</h3>
                                <div className="space-x-2">
                                    {project.url && (
                                        <a 
                                            href={project.url} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="inline-block text-cyan-300 hover:text-cyan-400 transition-colors"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </a>
                                    )}
                                </div>
                            </div>
                            
                            <p className="text-gray-300 mb-4">{project.description}</p>
                            
                            <div className="mt-auto">
                                <h4 className="text-sm font-semibold text-blue-300 mb-2">Tech Stack:</h4>
                                <div className="flex flex-wrap gap-2">
                                    {project.techStack.split(', ').map((tech, idx) => (
                                        <span 
                                            key={idx}
                                            className="px-2 py-1 bg-purple-900/60 text-xs rounded-full border border-purple-500/30
                                                    text-purple-200"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Projects;