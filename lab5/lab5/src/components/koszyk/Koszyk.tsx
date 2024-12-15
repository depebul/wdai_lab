import React from 'react';
import Produkt from './Produkt';

const Koszyk: React.FC = () => {
  return (
    <div>
      <h2>Koszyk</h2>
      <Produkt nazwa="Jabłko" />
      <Produkt nazwa="Gruszka" />
      <Produkt nazwa="Banana" />
      <Produkt nazwa="Pomarańcza" />
      <Produkt nazwa="Winogrona" />
    </div>
  );
};

export default Koszyk;