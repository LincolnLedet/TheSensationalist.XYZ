import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/HomePage';


const App: React.FC = () => {
  return (
    <Router>
      <div>
        {/* You can include a header or navigation component here if needed */}
        <Routes>
          {/* Define routes for different pages */}
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;