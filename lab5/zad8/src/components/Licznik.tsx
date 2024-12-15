import React, { useState, useEffect } from 'react';

const Licznik: React.FC = () => {
  const [count, setCount] = useState<number>(() => {
    const savedCount = localStorage.getItem('count');
    return savedCount !== null ? JSON.parse(savedCount) : 0;
  });

  const handleIncrement = () => {
    setCount(prevCount => {
      const newCount = prevCount + 1;
      localStorage.setItem('count', JSON.stringify(newCount));
      return newCount;
    });
  };

  useEffect(() => {
    const savedCount = localStorage.getItem('count');
    if (savedCount !== null) {
      setCount(JSON.parse(savedCount));
    }
  }, []);

  return (
    <div>
      <p>Licznik: {count}</p>
      <button onClick={handleIncrement}>Dodaj</button>
    </div>
  );
};

export default Licznik;