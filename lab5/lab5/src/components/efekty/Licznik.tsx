import React, { useState, useEffect } from 'react';

const Licznik: React.FC = () => {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  // useEffect to log "Hello world" when the component mounts
  useEffect(() => {
    console.log('Hello world');
  }, []);

  // useEffect to log the count whenever it changes
  useEffect(() => {
    console.log(`Licznik zwiększył się do ${count}`);
  }, [count]);

  return (
    <div>
      <p>Licznik: {count}</p>
      <button onClick={handleIncrement}>Dodaj</button>
    </div>
  );
};

export default Licznik;