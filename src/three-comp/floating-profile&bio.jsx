import { useRef, useState, useEffect } from 'react';

// Anime-styled profile and bio with Tailwind CSS and GitHub API integration - now part of normal document flow
const FloatingProfileAndBio = () => {
    const containerRef = useRef(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch GitHub profile data
    useEffect(() => {
        const fetchGitHubProfile = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://api.github.com/users/icy-r');
                
                if (!response.ok) {
                    throw new Error(`GitHub API returned ${response.status}`);
                }
                
                const data = await response.json();
                setProfile(data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching GitHub profile:', err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchGitHubProfile();
    }, []);

    // Profile content from f2.html adapted for the component
    const staticProfileData = {
        name: "M Mohamed Asath",
        title: "Software Engineer Intern @ IFS | Computer Software Engineering",
        bio: "As a software engineer intern at IFS, I specialize in database queries and server-side development while pursuing my education at SLIIT. I am passionate about applying web technologies to create innovative and efficient software solutions.",
        education: "BSc (Hons) Degree in Information Technology (Specialized in SE)",
        school: "Sri Lanka Institute of Information Technology (SLIIT)",
        skills: ["JavaScript/TypeScript", "Java/JUnit", "Python", "React.js", "Node.js", "MongoDB", "Git & GitHub"]
    };

    return (
        // Changed from fixed to relative positioning so it flows with the document
        <div id="home" className="relative min-h-screen w-full flex items-center justify-center pt-24 pb-16">
            {/* Background particles container - absolute positioned within section - removed, using global canvas */}
            <div ref={containerRef} className="absolute inset-0 z-0"></div>
            
            {/* Anime-styled profile card with glassmorphism effect */}
            <div className="relative max-w-3xl w-full md:w-3/4 p-8 mx-4 
                           bg-gradient-to-br from-purple-800/70 via-pink-700/70 to-indigo-800/70 
                           backdrop-blur-md rounded-xl 
                           shadow-[0_0_25px_rgba(255,105,180,0.5)] 
                           border border-white/20 z-10">
                
                {/* Loading state */}
                {loading && (
                    <div className="flex justify-center items-center h-40">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-300"></div>
                    </div>
                )}
                
                {/* Error state */}
                {error && !loading && (
                    <div className="text-red-300 text-center p-4">
                        <p>Failed to load GitHub profile: {error}</p>
                        <p>Showing static profile instead</p>
                    </div>
                )}
                
                {/* Profile content - uses GitHub data if available, falls back to static data */}
                <div className="flex flex-col md:flex-row gap-6 text-white items-center md:items-start">
                    {/* Profile image */}
                    <div className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 animate-pulse opacity-70"></div>
                        <img 
                            src={profile?.avatar_url || "https://avatars.githubusercontent.com/u/10051162?v=4"} 
                            alt="Profile" 
                            className="rounded-full w-full h-full object-cover relative z-10 p-1" 
                        />
                        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-400 via-pink-500 to-blue-500 opacity-70 blur-sm -z-10"></div>
                    </div>
                    
                    {/* Profile info */}
                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-300 to-blue-300 inline-block text-transparent bg-clip-text">
                            {profile?.name || staticProfileData.name}
                        </h1>
                        
                        <h2 className="text-xl text-pink-200 mt-1">
                            {profile?.bio || staticProfileData.title}
                        </h2>
                        
                        <p className="mt-3 text-gray-200 max-w-2xl">
                            {staticProfileData.bio}
                        </p>
                        
                        {/* Education Section */}
                        <div className="mt-4">
                            <h3 className="text-lg font-semibold text-blue-200">Education</h3>
                            <p className="text-gray-300">{staticProfileData.education}</p>
                            <p className="text-gray-400 text-sm">{staticProfileData.school}</p>
                        </div>
                        
                        {/* Skills Section - Anime-styled tags */}
                        <div className="mt-4">
                            <h3 className="text-lg font-semibold text-blue-200 mb-2">Key Skills</h3>
                            <div className="flex flex-wrap gap-2">
                                {staticProfileData.skills.map((skill, index) => (
                                    <span 
                                        key={index}
                                        className="px-3 py-1 rounded-full text-sm 
                                                bg-gradient-to-r from-purple-600 to-pink-600
                                                hover:from-pink-600 hover:to-purple-600
                                                shadow-[0_0_8px_rgba(255,0,255,0.5)]
                                                transition-all duration-300 hover:scale-105"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                        
                        {/* GitHub stats */}
                        <div className="mt-6 flex flex-wrap gap-4 justify-center md:justify-start text-center">
                            <div className="bg-purple-900/40 p-2 rounded-lg border border-pink-500/30">
                                <div className="text-2xl font-bold text-white">{profile?.public_repos || "?"}</div>
                                <div className="text-xs text-gray-300">Repositories</div>
                            </div>
                            <div className="bg-purple-900/40 p-2 rounded-lg border border-pink-500/30">
                                <div className="text-2xl font-bold text-white">{profile?.followers || "?"}</div>
                                <div className="text-xs text-gray-300">Followers</div>
                            </div>
                            <div className="bg-purple-900/40 p-2 rounded-lg border border-pink-500/30">
                                <div className="text-2xl font-bold text-white">{profile?.following || "?"}</div>
                                <div className="text-xs text-gray-300">Following</div>
                            </div>
                        </div>
                        
                        {/* PDF Download Button and GitHub Link */}
                        <div className="mt-6 flex justify-center md:justify-start gap-4">
                            <a 
                                href="/M_Mohamed_Asath-CV.pdf" 
                                download="M_Mohamed_Asath-CV.pdf"
                                className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-pink-600 to-purple-600 
                                          rounded-full text-white font-semibold
                                          hover:from-purple-600 hover:to-pink-600 
                                          transition-all duration-300 hover:scale-105
                                          shadow-[0_0_10px_rgba(219,39,119,0.5)] gap-2"
                            >
                                <span>Download CV</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                            </a>
                            
                            {/* GitHub link */}
                            <a 
                                href={profile?.html_url || "https://github.com/icy-r"} 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 
                                          rounded-full text-white font-semibold
                                          hover:from-blue-600 hover:to-indigo-600 
                                          transition-all duration-300 hover:scale-105
                                          shadow-[0_0_10px_rgba(79,70,229,0.5)] gap-2"
                            >
                                <span>GitHub</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FloatingProfileAndBio;