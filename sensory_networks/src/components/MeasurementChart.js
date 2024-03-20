import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

function MeasurementChart({ measurementData, measurementName, chartColor }) {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const data = {
      labels: measurementData.map(entry => new Date(entry.time).toLocaleTimeString()),
      datasets: [
        {
          label: measurementName,
          data: measurementData.map(entry => entry.average_value),
          borderColor: chartColor, 
          backgroundColor: chartColor, 
          
        },
      ],
    };

    setChartData(data);
  }, [measurementData, measurementName, chartColor]);

  return (
    <div style={{ textAlign: 'center' }}>
      <h3>{measurementName}</h3>
      {chartData ? <Line data={chartData} /> : <span>Loading...</span>}
    </div>
  );
}

export default MeasurementChart;