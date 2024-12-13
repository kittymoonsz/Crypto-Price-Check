import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = () => {
  const data = {
    labels: ['1h', '2h', '3h', '4h', '5h'], // Example labels
    datasets: [
      {
        label: 'Daily Variation',
        data: [100, 120, 150, 130, 170], // Replace with API data
        borderColor: '#42A5F5',
        backgroundColor: 'rgba(66, 165, 245, 0.5)',
      },
    ],
  };

  return <Line data={data} />;
};

export default LineChart;

