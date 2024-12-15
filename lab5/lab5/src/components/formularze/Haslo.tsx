import React, { useState } from 'react';

const Haslo: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  const getMessage = () => {
    if (!password && !confirmPassword) {
      return 'Proszę wprowadzić hasło';
    }
    if (password !== confirmPassword) {
      return 'Hasła nie są zgodne';
    }
    return '';
  };

  return (
    <div>
      <div>
        <label>
          Hasło:
          <input type="password" value={password} onChange={handlePasswordChange} />
        </label>
      </div>
      <div>
        <label>
          Powtórz Hasło:
          <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
        </label>
      </div>
      <div>{getMessage()}</div>
    </div>
  );
};

export default Haslo;