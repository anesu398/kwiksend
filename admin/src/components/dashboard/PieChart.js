import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const PieChart = ({ data }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        data: data.values,
        backgroundColor: ["#4caf50", "#ff9800", "#f44336", "#2196f3"],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="w-full h-80 bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Account Statistics</h3>
      <Pie data={chartData} />
    </div>
  );
};

export default PieChart;
