import React, { FC } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Analytics from "./pages/Analytics";

const App: FC = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate replace to="/analytics" />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
