import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import CheckboxDavomat from "../../components/teacher/CheckboxDavomat";

const malumotlar = [
  { name: "Assijon", id: 1 },
  { name: "Elbek", id: 2 }
];

const LessonsTable = ({ data }) => {
  const [chec, setChec] = useState({});

  const handleCheck = (studentId, dateIndex, value) => {
    setChec((prev) => ({
      ...prev,
      [studentId]: {
        ...(prev[studentId] || {}),
        [dateIndex]: value
      }
    }));
  };

  const getCheckedValue = (studentId, dateIndex) => {
    return chec[studentId]?.[dateIndex] || null;
  };

  const logData = () => {
    const attendance = malumotlar.map((student) => ({
      id: student.id,
      name: student.name,
      attendance: data.map((date, index) => ({
        date,
        present: chec[student.id]?.[index] || false
      }))
    }));
    console.log("Qo'shilgan ma'lumotlar:", attendance);
  };

  return (
    <>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Ism</th>
            {data.map((el, index) => (
              <th className="text-center" key={index}>
                {el} 
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {malumotlar.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              {data.map((el, index) => (
                <td className="text-center" key={index}>
                  <CheckboxDavomat
                    handleCheck={(value) => handleCheck(student.id, index, value)}
                    checkedValue={getCheckedValue(student.id, index)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="flex justify-end">
        <button
          className="px-[20px] py-[10px] bg-green-500 rounded text-white cursor-pointer mx-10"
          onClick={logData}
        >
          Qo'shish
        </button>
      </div>
    </>
  );
};

export default LessonsTable;
