import React, { useState, useEffect, useRef } from 'react';

const Odliczanie: React.FC = () => {
  const [count, setCount] = useState(15.0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleStartStop = () => {
    if (isRunning) {
      clearInterval(intervalRef.current!);
    } else {
      intervalRef.current = setInterval(() => {
        setCount(prevCount => Math.max(prevCount - 0.1, 0));
      }, 100);
    }
    setIsRunning(!isRunning);
  };

  useEffect(() => {
    if (count === 0) {
      clearInterval(intervalRef.current!);
      setIsRunning(false);
    }
  }, [count]);

  useEffect(() => {
    return () => clearInterval(intervalRef.current!);
  }, []);

  return (
    <div>
      <div>Odliczanie: {count.toFixed(1)} sek</div>
      <button onClick={handleStartStop} disabled={count === 0}>
        {count === 0 ? 'Odliczanie zakończone' : isRunning ? 'STOP' : 'START'}
      </button>
    </div>
  );
};

export default Odliczanie;