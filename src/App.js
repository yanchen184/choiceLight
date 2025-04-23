import "./App.css";
import BingoGame from "./components/BingoGame/BingoGame";
import ChoiceLightList from "./components/ChoiceLight/ChoiceLightList";
import Login from "./components/Login/Login";
import ChoiceGame from "./components/ChoiceGame";
import BikeGame from "./components/BikeGame";
import CardManagement from "./components/BikeGame/CardManagement";

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

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
      v0.1.0
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
          <Route path="/bingo-game" element={<BingoGame />} />
          <Route path="/" element={<Login />} />
          <Route path="/choice-game" element={<ChoiceGame />} />
          <Route path="/choice-light" element={<ChoiceLightList />} />
          <Route path="/bike-game" element={<BikeGame />} />
          <Route
            path="/card-management/practice"
            element={<CardManagement />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
