import React from 'react';
import Produkt from './Produkt';

const NowyKoszyk: React.FC = () => {
  const Produkty = ["Jabłko", "Gruszka", "Banana", "Pomarańcza", "Winogrona"];

  return (
    <div>
      <h2>Koszyk</h2>
      {Produkty.map((nazwa, index) => (
        <Produkt key={index} nazwa={nazwa} />
      ))}
    </div>
  );
};

export default NowyKoszyk;