import { useState, useEffect } from "react";

const CursorGlowEffect = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hoveredTile, setHoveredTile] = useState(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Get the element under the cursor
      const elementUnderCursor = document.elementFromPoint(
        e.clientX,
        e.clientY
      );

      // Check if the element is a tile (you might need to adjust this selector)
      if (elementUnderCursor && elementUnderCursor.classList.contains("tile")) {
        setHoveredTile(elementUnderCursor);
      } else {
        setHoveredTile(null);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (hoveredTile) {
      hoveredTile.style.backgroundColor = "rgba(255, 255, 255, 0.)";
    }

    return () => {
      if (hoveredTile) {
        hoveredTile.style.backgroundColor = "";
      }
    };
  }, [hoveredTile]);

  return (
    <div
      className="absolute w-12 h-12 rounded-full mix-blend-difference pointer-events-none"
      style={{
        left: position.x - 24,
        top: position.y - 24,
        transition: "transform 0.5Ss ease-out",
        backgroundColor: "white",
        opacity: 0.1,
      }}
    />
  );
};

export default CursorGlowEffect;
