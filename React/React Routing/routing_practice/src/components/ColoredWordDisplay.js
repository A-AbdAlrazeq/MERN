import React from "react";
import { useParams } from "react-router-dom";
const ColoredWordDisplay = () => {
  const { word, textColor, bgColor } = useParams();
  const styles = {
    color: textColor,
    backgroundColor: bgColor,
  };
  return <h1 style={styles}>{word}</h1>;
};
export default ColoredWordDisplay;
