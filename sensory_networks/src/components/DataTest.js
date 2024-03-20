import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function DataTest() {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState("info...");

  const measurementNames = {
    4097: 'Air Temperature',
    4098: 'Air Humidity',
    4099: 'Light Intensity',
    4101: 'Barometric Pressure',
    4104: 'Wind Direction',
    4105: 'Wind Speed',
    4113: 'Rainfall Hourly',
    4190: 'UV Index'
    
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://sensecap.seeed.cc/openapi/aggregate_chart_points?device_eui=2CF7F1C0443002D2', {
          auth: {
            username: 'LHY5MB7C3C8WTAA5',
            password: '34C99BBDA28A4BCD9C96EE749DAB454A32D60656623C47B583029382F350F555'
          }
        });
        const responseData = response.data;

        
        const formattedData = responseData.data.map(channel => ({
          label: measurementNames[channel.channel] || `Channel ${channel.channel}`, // Use measurement name or default to channel number
          data: channel.lists.map(entry => ({
            x: new Date(entry.time),
            y: entry.average_value
          })),
          borderColor: getRandomColor(), // Custom function to generate random color
          fill: false,
        }));

        setChartData({
          labels: formattedData[0]?.data.map(entry => entry.x.toLocaleTimeString()),
          datasets: formattedData
        });
        setInfo(responseData);
        setLoading(false);
      } catch (error) {
        setInfo(error.message);
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: 20, width: '700px', height: '400px' }}>
      <h2>Charts Component</h2>
      {chartData && !loading ? <Line data={chartData} /> : <span>Loading...</span>}
      <div>{JSON.stringify(info, null, 2)}</div>
    </div>
  );
}

export default DataTest;