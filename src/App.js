import "./App.css";
import ChoiceLightList from "./components/ChoiceLight/ChoiceLightList";
import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

// Version display component
const VersionDisplay = () => {
  return (
    <div style={{ 
      position: 'fixed', 
      top: '10px', 
      right: '10px', 
      background: 'rgba(0,0,0,0.6)', 
      color: 'white', 
      padding: '5px 10px', 
      borderRadius: '4px',
      fontSize: '12px',
      zIndex: 1000
    }}>
      v0.4.0
    </div>
  );
};

function App() {
  // Get the base URL from homepage in package.json
  const basename = process.env.PUBLIC_URL || "";

  return (
    <Router basename={basename}>
      <div className="App">
        <VersionDisplay />
        <Routes>
          <Route path="/choice-light" element={<ChoiceLightList />} />
          <Route path="/choice-game" element={<ChoiceLightList />} />
          <Route path="/" element={<Navigate to="/choice-light" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
