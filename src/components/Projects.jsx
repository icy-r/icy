import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/users/icy-r/repos?sort=updated&per_page=10"
        );
        const data = await response.json();
        setProjects(data);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <div className="min-w-[100vw] flex items-center justify-center bg-gradient-to-br from-purple-900 to-blue-900 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center"
        >
          <h1 className="text-4xl font-bold text-white text-center p-12">
            Error: {error}
          </h1>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-w-[100vw] flex items-center justify-center bg-gradient-to-br from-purple-900 to-blue-900 overflow-hidden">
      {isLoading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center"
        >
          <h1 className="text-4xl font-bold text-white">Loading...</h1>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center"
        >
          <h1 className="text-4xl font-bold text-white text-center p-12">
            Projects
          </h1>
          <div className="flex flex-wrap justify-center">
            {projects.map((project) => (
              <div
                key={project.id}
                className="m-4 p-4 bg-white rounded-lg shadow-md"
              >
                <h2 className="text-2xl font-bold">{project.name}</h2>
                <p className="text-gray-700">{project.description}</p>
                <a
                  href={project.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  View Project
                </a>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Projects;
