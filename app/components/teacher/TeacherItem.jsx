import React from "react";
import Link from "@/node_modules/next/link";
const TeacherItem = ({ id, name, department, groups }) => {
  return (
    <Link
      href={`/davomat/${id}`}
      className="teacher shadow-md rounded min-w-[250px] p-[20px] hover:shadow-lg cursor-pointer no-underline"
    >
      <h3 className="text-center text-black text-[20px]">{name}</h3>
      <h5 className="text-center text-slate-500 text-[15px]">{department}</h5>
      <div className="flex gap-[5px] flex-wrap justify-center">
        {groups.map((group) => (
          <span className="bg-slate-400 text-white rounded-sm p-[4px] rounded text-[10px]">
            {group}
          </span>
        ))}
      </div>
    </Link>
  );
};

export default TeacherItem;
