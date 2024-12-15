import React, { useState } from 'react';
import Przycisk from './Przycisk';

const NowyLicznik: React.FC = () => {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>Licznik: {count}</p>
      <Przycisk onClick={handleIncrement} />
    </div>
  );
};

export default NowyLicznik;