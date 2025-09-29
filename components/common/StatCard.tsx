import React from "react";

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value }) => (
  <div className="flex justify-start items-center bg-[#202020] rounded-lg p-5 backdrop-blur-sm gap-5 w-full">
    <span className="p-4 bg-neutral-100 rounded-lg text-neutral-800 text-3xl flex-shrink-0">
      {icon}
    </span>
    <div className="flex flex-col justify-center items-start gap-2">
      <h2 className="text-lg font-semibold text-white font-heading">{title}</h2>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  </div>
);

export default StatCard;
