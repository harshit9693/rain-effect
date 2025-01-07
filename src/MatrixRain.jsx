import React, { useState, useEffect } from "react";
import "./MatrixRain.css";

// Utility functions
const getRandColor = () =>
  `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
    Math.random() * 256
  )}, ${Math.floor(Math.random() * 256)})`;

const createGrid = (rows, cols) =>
  Array.from({ length: rows }, () => Array.from({ length: cols }, () => null));

const MatrixRain = ({ rows = 15, cols = 20 }) => {
  const [grid, setGrid] = useState(createGrid(rows, cols));
  const [drops, setDrops] = useState(
    Array.from({ length: cols }, () => ({
      position: Math.floor(Math.random() * rows),
      color: getRandColor(),
    }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setDrops((prevDrops) =>
        prevDrops.map((drop) => {
          const newPosition = (drop.position + 1) % rows;
          return {
            position: newPosition,
            color: newPosition === 0 ? getRandColor() : drop.color,
          };
        })
      );

      setGrid((prevGrid) => {
        const newGrid = createGrid(rows, cols);
        drops.forEach((drop, col) => {
          newGrid[drop.position][col] = drop.color;
        });
        return newGrid;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [rows, cols, drops]);

  return (
    <div className="matrix-container">
      <header className="game-header">
        <h1>Matrix Rain Game</h1>
        <p>Enjoy the dynamic rain effect!</p>
      </header>
      <div
        className="matrix-grid"
        style={{
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
        }}
      >
        {grid.flat().map((cell, index) => (
          <div
            key={index}
            className="matrix-cell"
            style={{
              backgroundColor: cell || "transparent",
            }}
          ></div>
        ))}
      </div>
      <footer className="game-footer">
        <p>&copy; 2025 Rain Effect Game | Created with ❤️</p>
      </footer>
    </div>
  );
};

export default MatrixRain;
