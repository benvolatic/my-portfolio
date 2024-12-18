import React from "react";
import ReactDOM from "react-dom/client"; // Updated import for createRoot
import App from "./App";
import "./index.css"; // If you have global styles

// Create the root and render the app
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
