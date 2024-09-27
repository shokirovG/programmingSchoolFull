import React, { useState, useEffect } from "react";

const CheckboxDavomat = ({ handleCheck, checkedValue }) => {
  const [selected, setSelected] = useState(checkedValue);

  useEffect(() => {
    setSelected(checkedValue);
  }, [checkedValue]);

  const handleRadioChange = (value) => {
    setSelected(value);
    handleCheck(value);
  };

  return (
    <div className="flex space-x-4">
      <label className="flex items-center cursor-pointer">
        <input
          type="radio"
          name="customRadio"
          value="trueIcon"
          checked={selected === "trueIcon"}
          onChange={() => handleRadioChange("trueIcon")}
          className="hidden"
        />
        <span
          className={`w-8 h-8 flex items-center justify-center border rounded ${
            selected === "trueIcon" ? "bg-green-500 text-white" : "bg-gray-200"
          }`}
        >
          {selected === "trueIcon" ? "✔" : ""}
        </span>
      </label>

      <label className="flex items-center cursor-pointer">
        <input
          type="radio"
          name="customRadio"
          value="sIcon"
          checked={selected === "sIcon"}
          onChange={() => handleRadioChange("sIcon")}
          className="hidden"
        />
        <span
          className={`w-8 h-8 flex items-center justify-center border rounded ${
            selected === "sIcon" ? "bg-yellow-500 text-white" : "bg-gray-200"
          }`}
        >
          {selected === "sIcon" ? "S" : ""}
        </span>
      </label>

      <label className="flex items-center cursor-pointer">
        <input
          type="radio"
          name="customRadio"
          value="xIcon"
          checked={selected === "xIcon"}
          onChange={() => handleRadioChange("xIcon")}
          className="hidden"
        />
        <span
          className={`w-8 h-8 flex items-center justify-center border rounded ${
            selected === "xIcon" ? "bg-red-500 text-white" : "bg-gray-200"
          }`}
        >
          {selected === "xIcon" ? "X" : ""}
        </span>
      </label>
    </div>
  );
};

export default CheckboxDavomat;
