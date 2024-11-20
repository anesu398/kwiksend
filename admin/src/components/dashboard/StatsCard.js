import React from "react";

const StatsCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white shadow-md p-4 rounded-lg flex items-center space-x-4">
      <div className="text-2xl">{icon}</div>
      <div>
        <div className="text-lg font-bold">{value}</div>
        <div className="text-gray-600">{title}</div>
      </div>
    </div>
  );
};

export default StatsCard;
