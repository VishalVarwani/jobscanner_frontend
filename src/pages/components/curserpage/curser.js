import React, { useState, useEffect } from 'react';
import './curser.css';

const RainbowCursorTrail = () => {
  const [trails, setTrails] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;

      // Add a new trail with position and a unique id
      setTrails((prevTrails) => [
        ...prevTrails,
        { x, y, id: Math.random() },
      ]);
    };

    // Add mousemove event listener
    window.addEventListener('mousemove', handleMouseMove);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Remove the trail after a short delay (to simulate fading out)
  useEffect(() => {
    const interval = setInterval(() => {
      setTrails((prevTrails) => prevTrails.slice(1));
    }, 100); // Adjust delay as needed

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="full-screen-container">
      {trails.map((trail) => (
        <div
          key={trail.id}
          className="trail"
          style={{
            left: `${trail.x}px`,
            top: `${trail.y}px`, // No large offset for top, follows mouse position
          }}
        />
      ))}
    </div>
  );
};

export default RainbowCursorTrail;
