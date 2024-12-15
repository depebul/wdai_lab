import React, { useState } from 'react';
import Dodawanie from './Dodawanie';

interface Student {
  imie: string;
  nazwisko: string;
  rocznik: number;
}

const StudentManager: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([
    { imie: 'Jan', nazwisko: 'Kowalski', rocznik: 2020 },
    { imie: 'Anna', nazwisko: 'Nowak', rocznik: 2019 },
    { imie: 'Piotr', nazwisko: 'Wiśniewski', rocznik: 2021 },
    { imie: 'Katarzyna', nazwisko: 'Wójcik', rocznik: 2022 },
    { imie: 'Michał', nazwisko: 'Kowalczyk', rocznik: 2020 }
  ]);

  const addStudent = (student: Student) => {
    setStudents([...students, student]);
  };

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
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student.imie}</td>
              <td>{student.nazwisko}</td>
              <td>{student.rocznik}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Dodawanie onAddStudent={addStudent} />
    </div>
  );
};

export default StudentManager;