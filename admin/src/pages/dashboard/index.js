import React from "react";
import StatsCard from "../../components/dashboard/StatsCard";
import DataTable from "../../components/dashboard/DataTable";

const Dashboard = () => {
  const stats = [
    { title: "Total Users", value: "500", icon: "👥" },
    { title: "Active Transfers", value: "120", icon: "💸" },
    { title: "Total Balance", value: "$1.2M", icon: "💰" },
    { title: "Pending Approvals", value: "5", icon: "⏳" },
  ];

  const tableHeaders = ["User", "Account Number", "Balance", "Status"];
  const tableRows = [
    ["John Doe", "1234567890", "$5,000", "Active"],
    ["Jane Smith", "9876543210", "$10,000", "Inactive"],
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>
      <div className="grid grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Recent Accounts</h2>
        <DataTable headers={tableHeaders} rows={tableRows} />
      </div>
    </div>
  );
};

export default Dashboard;
