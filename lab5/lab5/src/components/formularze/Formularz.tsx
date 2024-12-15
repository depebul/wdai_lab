import React, { useState } from 'react';

const Formularz: React.FC = () => {
  const [text, setText] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  return (
    <div>
      <input type="text" value={text} onChange={handleChange} />
      <div>{text}</div>
    </div>
  );
};

export default Formularz;