import React from 'react';
import Komentarze from './components/produkty/Komentarze';
import './App.css';

const App: React.FC = () => {
  return (
    <div>
      <h1>Moja Aplikacja</h1>
      <Komentarze />
    </div>
  );
};

export default App;
