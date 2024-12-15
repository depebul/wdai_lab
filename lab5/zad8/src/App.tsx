import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import Blog from './components/Blog';
import Article from './components/Article';
import AddArticle from './components/AddArticle';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <h1>Moja Aplikacja</h1>
        <nav>
          <ul className="nav-list">
            <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
            <li className="nav-item"><Link to="/blog" className="nav-link">Blog</Link></li>
            <li className="nav-item"><Link to="/dodaj" className="nav-link">Dodaj Artykuł</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/article/:id" element={<Article />} />
          <Route path="/dodaj" element={<AddArticle />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
