import React from "react";
import ReactDOM from "react-dom";

import myImage from "../images/background.png"

const App = () => {
  return (
    <div>
      <h1>Webpack Demo</h1>
      <img src={ myImage } alt="My Image" />
    </div>
  );
};

const root = document.getElementById("root");
ReactDOM.createRoot(root).render(<App />);
