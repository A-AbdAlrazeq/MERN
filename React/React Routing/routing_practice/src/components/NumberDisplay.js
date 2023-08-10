import React from "react";
import { useParams } from "react-router-dom";
const NumberDisplay = () => {
  const { num } = useParams();
  return <h1>{num}</h1>;
};
export default NumberDisplay;
