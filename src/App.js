import "./App.css";
import BingoGame from "./components/BingoGame/BingoGame";
import ChoiceLightList from "./components/ChoiceLight/ChoiceLightList";
import Login from "./components/Login/Login";
import ChoiceGame from "./components/ChoiceGame";
import BikeGame from "./components/BikeGame";
import CardManagement from "./components/BikeGame/CardManagement";

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
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
