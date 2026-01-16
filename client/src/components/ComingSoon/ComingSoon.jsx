import React from "react";
import "./ComingSoon.css";

const ComingSoon = ({ title }) => {
  return (
    <div className="coming-soon-container">
      <h1>{title}</h1>
      <p>This feature is under development 🚧</p>
      <span>Coming Soon...</span>
    </div>
  );
};

export default ComingSoon;
