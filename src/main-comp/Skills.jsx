import React, { useState, useRef } from 'react';

const Skills = () => {
    const containerRef = useRef(null);
    const [activeTab, setActiveTab] = useState('development');
    
    // Skills data extracted from CV (f2.html)
    const skillsData = {
        development: [
            "JavaScript/TypeScript", "Java/JUnit", "Python", "C/C++", 
            "React.js", "Tailwind CSS", "Vite", "Framer Motion",
            "Node.js", "Express.js", "RESTful APIs", "JWT Authentication",
            "Android (Java)", "MongoDB", "Firebase", "MySQL", 
            "Git & GitHub", "SQL/PLSQL", "Postman", "Figma (basic)",
            "Android Studio", "npm/yarn", "Docker", "Linux/TAR",
            "Marble Framework", "Java/OSGi", "CI/CD Pipelines"
        ],
        soft: [
            "Leadership", "Team Management", "Communication", "Presentation Skills",
            "Teamwork", "Problem-solving", "Time Management", "Multitasking",
            "Adaptability", "Analytical Thinking", "Project Management",
            "Fast Learner", "Self-Motivated"
        ],
        interests: [
            "Android App Development", "UI/UX Design", "Cloud Computing", "AWS",
            "Firebase Hosting", "Server-side Development", "Backend Architecture", 
            "Problem Solving", "Algorithmic Thinking", "DevOps (Beginner)",
            "Full Stack Development", "Open Source Contribution", "Linux"
        ]
    };

    return (
        <div id="skills" className="min-h-screen relative py-20">
            {/* ThreeJS background container - removed, using global canvas */}
            <div ref={containerRef} className="absolute inset-0 -z-10" />
            
            {/* Content with anime styling */}
            <div className="container mx-auto px-4 relative z-10">
                <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-cyan-500 text-transparent bg-clip-text">
                    My Skills
                </h2>
                
                {/* Skills tab navigation */}
                <div className="flex justify-center mb-10">
                    <div className="inline-flex bg-purple-900/30 backdrop-blur-md rounded-full p-1 border border-white/10">
                        {['development', 'soft', 'interests'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                                    activeTab === tab 
                                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg' 
                                        : 'text-gray-300 hover:text-white'
                                }`}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
                
                {/* Skills content - Anime styled skill pills */}
                <div className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto">
                    {skillsData[activeTab].map((skill, index) => (
                        <div 
                            key={index}
                            className="group relative"
                        >
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full opacity-60 blur-sm group-hover:opacity-100 transition duration-300"></div>
                            <span 
                                className="relative px-4 py-1.5 bg-purple-900/80 rounded-full text-white font-medium cursor-default
                                         border border-white/10 backdrop-blur-sm
                                         transform transition-all duration-300 hover:scale-105 hover:shadow-glow-sm inline-block"
                            >
                                {skill}
                            </span>
                        </div>
                    ))}
                </div>
                
                {/* Tab descriptions */}
                <div className="mt-12 max-w-2xl mx-auto text-center text-gray-300">
                    {activeTab === 'development' && (
                        <p className="animate-fade-in">
                            My technical expertise spans front-end and back-end technologies, with a focus on JavaScript/TypeScript ecosystems and Java development. 
                            I'm passionate about creating efficient, maintainable code and continuously expanding my skill set.
                        </p>
                    )}
                    
                    {activeTab === 'soft' && (
                        <p className="animate-fade-in">
                            Beyond technical abilities, I've developed strong interpersonal and organizational skills. I thrive in collaborative environments, 
                            communicate effectively, and adapt quickly to new challenges and technologies.
                        </p>
                    )}
                    
                    {activeTab === 'interests' && (
                        <p className="animate-fade-in">
                            I'm particularly interested in these areas and actively pursuing knowledge and experience in them. 
                            These interests drive my continuous learning and inspire the personal projects I undertake.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Skills;