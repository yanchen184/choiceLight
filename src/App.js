import "./App.css";
import ChoiceLightList from "./components/ChoiceLight/ChoiceLightList";
import Login from "./components/Login/Login";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

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
      v0.3.0
    </div>
  );
};

// Protected route component
const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">載入中...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  // Get the base URL from homepage in package.json
  const basename = process.env.PUBLIC_URL || "";

  return (
    <Router basename={basename}>
      <div className="App">
        <VersionDisplay />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route 
            path="/choice-light" 
            element={
              <ProtectedRoute>
                <ChoiceLightList />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/choice-game" 
            element={
              <ProtectedRoute>
                <ChoiceLightList />
              </ProtectedRoute>
            } 
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
