import React from "react";

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value }) => (
  <div className="flex justify-start items-center bg-card rounded-md p-5 backdrop-blur-sm gap-5 w-full">
    <span className="p-4 bg-accent rounded-md text-accent-text text-3xl flex-shrink-0">
      {icon}
    </span>
    <div className="flex flex-col justify-center items-start gap-2">
      <h2 className="text-lg font-semibold text-foreground font-heading">
        {title}
      </h2>
      <p className="text-2xl font-bold text-foreground">{value}</p>
    </div>
  </div>
);

export default StatCard;
