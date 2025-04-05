import React, { useRef } from 'react';

const Experience = () => {
    const containerRef = useRef(null);
    
    // Experience data extracted from CV (f2.html)
    const experiences = [
        {
            title: "Software Engineer Intern",
            company: "IFS",
            location: "Colombo District, Western Province, Sri Lanka (Hybrid)",
            period: "November 2024 - Present",
            responsibilities: [
                "Optimized PL/SQL and Oracle SQL queries to enhance database performance",
                "Collaborated with QA teams to design and execute manual test cases",
                "Modernized legacy Java EE systems by reimplementing core logic using Marble Framework",
                "Participated in Agile workflows for iterative feature delivery",
                "Maintained server-side components using Java/OSGi for enterprise applications"
            ]
        }
    ];
    
    const education = [
      {
        degree:
          "BSc (Hons) Degree in Information Technology (Specialized in SE)",
        institution: "Sri Lanka Institute of Information Technology (SLIIT)",
        period: "2023 - 2027",
        achievements: "Dean's List - Year 2 Semester 1",
      },
      {
        degree: "Secondary Education",
        institution:
          "Jaya MMV - Kekirawa (A/L) | Kekunagolla National School - Kurunegala (O/L)",
        period: "2017 - 2021",
      },
    ];
    
    const extracurricular = [
        {
            role: "Vice President (Outgoing Global Talent)",
            organization: "AIESEC in SLIIT",
            period: "July 2024 - Present",
            description: "Leading cross-cultural projects and global talent exchange initiatives."
        }
    ];
    
    const certifications = [
        {
            title: "Introduction to Career Skills in Data Analytics",
            issuer: "LinkedIn",
            date: "Issued March 2025"
        },
        {
            title: "Introduction to Prompt Engineering",
            issuer: "GitHub",
            date: "Issued June 2024"
        },
        {
            title: "Mobile App Development",
            issuer: "Simply Learn",
            date: "Issued July 2024"
        }
    ];

    return (
        <div id="experience" className="min-h-screen relative py-20">
            {/* ThreeJS background container - removed, using global canvas */}
            <div ref={containerRef} className="absolute inset-0 -z-10" />
            
            {/* Content with anime styling */}
            <div className="container mx-auto px-4 relative z-10">
                <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-indigo-500 text-transparent bg-clip-text">
                    Experience & Education
                </h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Work Experience Section */}
                    <div>
                        <h3 className="text-2xl font-bold mb-6 text-purple-300 relative pl-4 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-gradient-to-b before:from-purple-500 before:to-pink-500">
                            Work Experience
                        </h3>
                        
                        {experiences.map((exp, index) => (
                            <div 
                                key={index}
                                className="mb-8 bg-gradient-to-br from-purple-900/30 to-indigo-900/30 backdrop-blur-sm 
                                        rounded-xl p-6 border border-white/10
                                        shadow-[0_0_15px_rgba(147,51,234,0.2)] hover:shadow-[0_0_15px_rgba(147,51,234,0.4)]
                                        transform transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="flex justify-between items-start flex-wrap">
                                    <h4 className="text-xl font-bold text-pink-200 mb-1">{exp.title}</h4>
                                    <span className="text-sm text-cyan-400">{exp.period}</span>
                                </div>
                                
                                <p className="text-gray-300 mb-3">{exp.company}</p>
                                <p className="text-gray-400 text-sm mb-4">{exp.location}</p>
                                
                                <ul className="space-y-2">
                                    {exp.responsibilities.map((resp, idx) => (
                                        <li 
                                            key={idx} 
                                            className="text-gray-300 pl-4 relative text-sm before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-gradient-to-r before:from-pink-500 before:to-purple-500 before:rounded-full"
                                        >
                                            {resp}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    
                    {/* Education Section */}
                    <div>
                        <h3 className="text-2xl font-bold mb-6 text-blue-300 relative pl-4 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-gradient-to-b before:from-blue-500 before:to-cyan-500">
                            Education
                        </h3>
                        
                        {education.map((edu, index) => (
                            <div 
                                key={index}
                                className="mb-6 bg-gradient-to-br from-blue-900/30 to-indigo-900/30 backdrop-blur-sm 
                                        rounded-xl p-6 border border-white/10
                                        shadow-[0_0_15px_rgba(59,130,246,0.2)] hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]
                                        transform transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="flex justify-between items-start flex-wrap">
                                    <h4 className="text-xl font-bold text-cyan-200 mb-1">{edu.degree}</h4>
                                    <span className="text-sm text-pink-400">{edu.period}</span>
                                </div>
                                
                                <p className="text-gray-300 mb-2">{edu.institution}</p>
                                {edu.achievements && (
                                    <p className="text-blue-300 font-semibold">{edu.achievements}</p>
                                )}
                            </div>
                        ))}
                        
                        {/* Certifications */}
                        <h3 className="text-2xl font-bold mb-6 mt-10 text-green-300 relative pl-4 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-gradient-to-b before:from-green-500 before:to-emerald-500">
                            Certifications
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {certifications.map((cert, index) => (
                                <div 
                                    key={index}
                                    className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 backdrop-blur-sm 
                                            rounded-xl p-4 border border-white/10
                                            shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:shadow-[0_0_15px_rgba(16,185,129,0.4)]
                                            transform transition-all duration-300 hover:-translate-y-1"
                                >
                                    <h4 className="text-lg font-semibold text-emerald-200 mb-1">{cert.title}</h4>
                                    <p className="text-gray-300 text-sm">{cert.issuer}</p>
                                    <p className="text-gray-400 text-xs">{cert.date}</p>
                                </div>
                            ))}
                        </div>
                        
                        {/* Extracurricular Activities */}
                        <h3 className="text-2xl font-bold mb-6 mt-10 text-yellow-300 relative pl-4 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-gradient-to-b before:from-yellow-500 before:to-amber-500">
                            Extracurricular Activities
                        </h3>
                        
                        {extracurricular.map((activity, index) => (
                            <div 
                                key={index}
                                className="mb-4 bg-gradient-to-br from-amber-900/30 to-yellow-900/30 backdrop-blur-sm 
                                        rounded-xl p-4 border border-white/10
                                        shadow-[0_0_15px_rgba(245,158,11,0.2)] hover:shadow-[0_0_15px_rgba(245,158,11,0.4)]
                                        transform transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="flex justify-between items-start flex-wrap">
                                    <h4 className="text-lg font-semibold text-amber-200 mb-1">{activity.role}</h4>
                                    <span className="text-sm text-blue-400">{activity.period}</span>
                                </div>
                                
                                {activity.organization && (
                                    <p className="text-gray-300 text-sm mb-1">{activity.organization}</p>
                                )}
                                
                                <p className="text-gray-400 text-sm">{activity.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Experience;