import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { WorkoutProvider } from "./context/WorkoutContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <WorkoutProvider>
          <App />
        </WorkoutProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
