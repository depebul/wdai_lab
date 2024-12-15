import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <h2>Witamy na naszej stronie!</h2>
      <Link to="/blog" className="home-link">Przejdź do bloga</Link>
    </div>
  );
};

export default Home;