import React, { useEffect, useState } from "react";
import "./App.css";
import PixelGrid from "./PixelGrid";
import Toolbar from "./Toolbar";
import ResetButton from "./ResetButton";

const URL = "https://crossly-bony-truck.mimo.dev";

const App = () => {
  const [grid, setGrid] = useState([]);
  const [selectedColor, setSelectedColor] = useState("black");

  useEffect(() => {
    fetch(`${URL}/grid`)
      .then((response) => response.json())
      .then((data) => setGrid(data.grid))
      .catch((error) => console.error("Error fetching grid data:", error));
  }, []);

  const updateColor = async (x, y) => {
  try {
    await fetch(`${URL}/setGridColor`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ x, y, color: selectedColor }),
    });
    const newGrid = grid.map(cell => {
      if (cell.x === x && cell.y === y) {
        cell.color = selectedColor;
      }
      return cell;
    });
    setGrid(newGrid);
  } catch (error) {
    console.error("Error updating grid color:", error);
  }
};

  const resetGrid = async () => {
  try {
    await fetch(`${URL}/resetGrid`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
    });
    const newGrid = grid.map(cell => ({...cell, color: "white"}));
    setGrid(newGrid);
  } catch (error) {
    console.error("Error resetting grid:", error);
  }
};

  return (
    <div className="content-wrapper">
      <h1>Pixel Grid</h1>
      <PixelGrid grid={grid} updateColor={updateColor} />
      <Toolbar selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
      <ResetButton resetGrid={resetGrid} />
    </div>
  );
};

export default App;
