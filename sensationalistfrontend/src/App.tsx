import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/HomePage';
import ArticleList from './components/ArticleList/ArticleList';
import ArticleDetail from './components/ArticleDetail/ArticleDetail';


const App: React.FC = () => {
  return (
    <Router>
      <div>
        {/* You can include a header or navigation component here if needed */}
        <Routes>
          {/* Define routes for different pages */}
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<ArticleList />} />
          <Route path="/articles/:id" element={<ArticleDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;