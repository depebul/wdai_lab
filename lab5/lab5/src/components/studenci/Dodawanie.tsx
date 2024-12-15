import React, { useState } from 'react';

interface DodawanieProps {
  onAddStudent: (student: Student) => void;
}

interface Student {
  imie: string;
  nazwisko: string;
  rocznik: number;
}

const Dodawanie: React.FC<DodawanieProps> = ({ onAddStudent }) => {
  const [imie, setImie] = useState('');
  const [nazwisko, setNazwisko] = useState('');
  const [rocznik, setRocznik] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (imie && nazwisko && !isNaN(Number(rocznik))) {
      onAddStudent({ imie, nazwisko, rocznik: Number(rocznik) });
      setImie('');
      setNazwisko('');
      setRocznik('');
    } else {
      alert('Wszystkie pola muszą być wypełnione, a rocznik musi być liczbą.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Imię:
          <input type="text" value={imie} onChange={(e) => setImie(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Nazwisko:
          <input type="text" value={nazwisko} onChange={(e) => setNazwisko(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Rocznik:
          <input type="text" value={rocznik} onChange={(e) => setRocznik(e.target.value)} />
        </label>
      </div>
      <button type="submit">Dodaj</button>
    </form>
  );
};

export default Dodawanie;