import React from 'react';

// Definiowanie interfejsu Student
interface Student {
  imie: string;
  nazwisko: string;
  rocznik: number;
}

// Przykładowa tablica studentów
const Students: Student[] = [
  { imie: 'Jan', nazwisko: 'Kowalski', rocznik: 2020 },
  { imie: 'Anna', nazwisko: 'Nowak', rocznik: 2019 },
  { imie: 'Piotr', nazwisko: 'Wiśniewski', rocznik: 2021 },
  { imie: 'Katarzyna', nazwisko: 'Wójcik', rocznik: 2022 },
  { imie: 'Michał', nazwisko: 'Kowalczyk', rocznik: 2020 }
];

const Studenci: React.FC = () => {
  return (
    <div>
      <h2>Lista Studentów</h2>
      <table>
        <thead>
          <tr>
            <th>Imię</th>
            <th>Nazwisko</th>
            <th>Rocznik</th>
          </tr>
        </thead>
        <tbody>
          {Students.map((student, index) => (
            <tr key={index}>
              <td>{student.imie}</td>
              <td>{student.nazwisko}</td>
              <td>{student.rocznik}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Studenci;