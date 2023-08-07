import React, { useState } from "react";

const BoxGenerator = ({ onAddBox }) => {
  const [color, setColor] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  const handleWidthChange = (e) => {
    setWidth(e.target.value);
  };

  const handleHeightChange = (e) => {
    setHeight(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (color && width && height) {
      const newBox = {
        color: color,
        width: width + "px",
        height: height + "px",
      };

      onAddBox(newBox);
      setColor("");
      setWidth("");
      setHeight("");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="color">Color:</label>
          <input
            type="text"
            id="color"
            value={color}
            onChange={handleColorChange}
          />
        </div>
        <div>
          <label htmlFor="width">Width (px):</label>
          <input
            type="number"
            id="width"
            value={width}
            onChange={handleWidthChange}
          />
        </div>
        <div>
          <label htmlFor="height">Height (px):</label>
          <input
            type="number"
            id="height"
            value={height}
            onChange={handleHeightChange}
          />
        </div>
        <button type="submit">Add Box</button>
      </form>
    </div>
  );
};

export default BoxGenerator;
