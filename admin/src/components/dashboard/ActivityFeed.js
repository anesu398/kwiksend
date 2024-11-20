import React from "react";

const ActivityFeed = ({ activities }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
      <ul>
        {activities.map((activity, index) => (
          <li key={index} className="border-b py-2">
            <span className="font-semibold">{activity.user}</span> -{" "}
            {activity.action}{" "}
            <span className="text-sm text-gray-500">({activity.time})</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityFeed;
