import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = () => {
  const data = {
    labels: ['BTC', 'ETH', 'BNB'], // Example
    datasets: [
      {
        data: [40, 30, 30], // Replace with API data
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  return <Pie data={data} />;
};

export default PieChart;

