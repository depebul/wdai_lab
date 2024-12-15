import React, { useState, useEffect } from 'react';

const Tytul: React.FC = () => {
  const [title, setTitle] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <div>
      <input type="text" value={title} onChange={handleChange} placeholder="Wpisz tytuł strony" />
    </div>
  );
};

export default Tytul;