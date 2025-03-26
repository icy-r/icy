import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Home = () => {
  const [userData, setUserData] = useState(null);
  const [userRepos, setUserRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userResponse, reposResponse] = await Promise.all([
          fetch("https://api.github.com/users/icy-r"),
          fetch(
            "https://api.github.com/users/icy-r/repos?sort=updated&per_page=10"
          ),
        ]);

        if (!userResponse.ok || !reposResponse.ok) {
          throw new Error("API rate limit exceeded or data not available");
        }

        const userData = await userResponse.json();
        const reposData = await reposResponse.json();

        if (!userData || !reposData || reposData.length === 0) {
          throw new Error("No data available");
        }

        setUserData(userData);
        setUserRepos(reposData);
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
          <h1 className="text-4xl font-bold text-white text-center  p-12">
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
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-start justify-around p-12 bg-white flex-grow bg-opacity-10 rounded-lg backdrop-filter backdrop-blur-lg shadow-2xl max-w-7xl mx-4"
        >
          <div className="flex flex-col md:flex-row w-full">
            <div className="flex flex-col items-center justify-center md:mr-12 mb-8 md:mb-0">
              <motion.img
                src={userData.avatar_url}
                alt="Profile"
                className="w-48 h-48 rounded-full mb-6 border-4 border-white shadow-lg"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: 0.2,
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                }}
              />
              <motion.h1
                className="text-5xl font-bold mb-3 text-white text-shadow text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {userData.name}
              </motion.h1>
              <motion.p
                className="text-xl mb-4 text-blue-200 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {userData.bio}
              </motion.p>
              <motion.p
                className="text-lg text-blue-100 text-center max-w-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                I&apos;m a software developer with a passion for building web
                applications and creating stunning user experiences.
              </motion.p>
              <motion.div
                className="mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <a
                  href={userData.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  View GitHub Profile
                </a>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex-grow"
            >
              <h2 className="text-3xl font-bold mb-6 text-white">
                Repositories
              </h2>
              <ul className="space-y-6">
                {userRepos.map((repo) => (
                  <motion.li
                    key={repo.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white bg-opacity-20 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-200 hover:text-blue-100 font-semibold text-xl mb-2 block"
                    >
                      {repo.name}
                    </a>
                    <p className="text-blue-100 mt-2">
                      {repo.description || "No description available"}
                    </p>
                    <div className="flex items-center mt-4 text-sm text-blue-300">
                      <span className="mr-4">
                        ⭐ {repo.stargazers_count} stars
                      </span>
                      <span>🍴 {repo.forks_count} forks</span>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Home;
