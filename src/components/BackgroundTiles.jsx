import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const BackgroundTiles = () => {
  const [tiles, setTiles] = useState([]);

  useEffect(() => {
    const createTiles = () => {
      const tileCount = 100;
      const tiles = [];

      for (let i = 0; i < tileCount; i++) {
        const tile = {
          id: i,
          initialX: Math.random() * window.innerWidth,
          initialY: Math.random() * window.innerHeight,
          size: Math.random() * 100 + 10,
          color: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${
            Math.random() * 255
          }, 0.1)`,
          speed: Math.random() * 2 + 0.5,
          direction: Math.random() * 2 * Math.PI,
        };
        tiles.push(tile);
      }

      setTiles(tiles);
    };

    createTiles();

    window.addEventListener("resize", createTiles);

    return () => {
      window.removeEventListener("resize", createTiles);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none">
      {tiles.map((tile) => (
        <motion.div
          key={tile.id}
          className="absolute tile"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
            width: tile.size,
            height: tile.size,
            x: [tile.initialX, tile.initialX + Math.cos(tile.direction) * 100],
            y: [tile.initialY, tile.initialY + Math.sin(tile.direction) * 100],
          }}
          transition={{
            opacity: {
              duration: 0.5,
              ease: "easeOut",
              delay: Math.random() * 0.5,
            },
            scale: {
              duration: 0.5,
              ease: "easeOut",
              delay: Math.random() * 0.5,
            },
            width: {
              duration: 0.5,
              ease: "easeOut",
              delay: Math.random() * 0.5,
            },
            height: {
              duration: 0.5,
              ease: "easeOut",
              delay: Math.random() * 0.5,
            },
            x: {
              repeat: Infinity,
              repeatType: "reverse",
              duration: 10 / tile.speed,
              ease: "linear",
            },
            y: {
              repeat: Infinity,
              repeatType: "reverse",
              duration: 10 / tile.speed,
              ease: "linear",
            },
          }}
          style={{
            backgroundColor: tile.color,
          }}
        />
      ))}
    </div>
  );
};

export default BackgroundTiles;
