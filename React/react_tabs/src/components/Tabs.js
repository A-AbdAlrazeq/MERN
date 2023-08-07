import React, { useState } from "react";
import "./Tabs.css";

const Tabs = ({ items }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="tabs-container">
      <div className="tabs-header">
        {items.map((item, index) => (
          <div
            key={index}
            className={`tab-header ${index === activeTab ? "active" : ""}`}
            onClick={() => handleTabClick(index)}
          >
            {item.label}
          </div>
        ))}
      </div>
      <div className="tabs-content">
        {items.map((item, index) => (
          <div
            key={index}
            className={`tab-content ${index === activeTab ? "active" : ""}`}
          >
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
