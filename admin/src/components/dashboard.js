import React, { useState, useEffect } from "react";
import PieChart from "./dashboard/PieChart";
import ActivityFeed from "./dashboard/ActivityFeed";
import axios from "axios";

const Dashboard = () => {
  const [activityData, setActivityData] = useState([]);
  const [chartData, setChartData] = useState({
    labels: ["Active Users", "Inactive Users", "New Accounts", "Transfers"],
    values: [40, 30, 20, 10],
  });

  useEffect(() => {
    const fetchActivityData = async () => {
      try {
        const response = await axios.get("/api/activities"); // Modify as per your API
        setActivityData(response.data);
      } catch (error) {
        console.error("Error fetching activity data:", error);
      }
    };
    fetchActivityData();
  }, []);

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-2xl font-semibold">Dashboard Overview</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PieChart data={chartData} />
        <ActivityFeed activities={activityData} />
      </div>
    </div>
  );
};

export default Dashboard;
