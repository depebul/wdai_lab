import React, { useState } from 'react';

const Licznik: React.FC = () => {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>Licznik: {count}</p>
      <button onClick={handleIncrement}>Dodaj</button>
    </div>
  );
};

export default Licznik;