import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import MeasurementChart from './MeasurementChart';
import { Container, Row, Col } from 'react-bootstrap';
import Chart from 'chart.js/auto';

function Charts() {
  const [measurements, setMeasurements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deviceEui, setDeviceEui] = useState('2CF7F1C0443002D2'); // Domyślna wartość device_eui
  const [newDeviceEui, setNewDeviceEui] = useState('2CF7F1C0443002D2'); // Stan dla nowej wartości device_eui

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://sensecap.seeed.cc/openapi/aggregate_chart_points?device_eui=${deviceEui}`, { // Użyj aktualnej wartości device_eui
          auth: {
            username: 'LHY5MB7C3C8WTAA5',
            password: '34C99BBDA28A4BCD9C96EE749DAB454A32D60656623C47B583029382F350F555'
          }
        });
        setMeasurements(response.data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [deviceEui]); // Dodaj deviceEui do zależności useEffect

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

  // Tablica kolorów
  const chartColors = [
    'rgb(75, 192, 192)',
    'rgb(255, 99, 132)',
    'rgb(54, 162, 235)',
    'rgb(255, 205, 86)',
    'rgb(153, 102, 255)',
    'rgb(255, 159, 64)',
    'rgb(22, 159, 64)',
    'rgb(50, 100, 200)',
  ];

  const handleDeviceEuiChange = (event) => {
    setNewDeviceEui(event.target.value); // Aktualizuj nową wartość device_eui
  };

  const handleSetDeviceEui = () => {
    setDeviceEui(newDeviceEui); // Ustaw nową wartość device_eui po naciśnięciu przycisku
  };

  return (
    <div className="charts-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <h2 style={{textAlign: 'center'}}>Charts Component</h2>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          value={newDeviceEui}
          onChange={handleDeviceEuiChange}
          defaultValue="2CF7F1C0443002D2"
          style={{ marginRight: '10px' }}
        />
        <button onClick={handleSetDeviceEui}>Set device_eui</button> {/* Wywołaj funkcję handleSetDeviceEui po kliknięciu przycisku */}
      </div>
      {loading && <span>Loading...</span>}
      {error && <span>Error: {error}</span>}
      {measurements === undefined? (
        <div>No measurements available.</div>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', width: '100%',marginLeft: "5%" }}>
          {measurements.map((measurement, index) => (
            <div key={measurement.channel} style={{ width: '20%', minWidth: '200px', margin: '0 5% 5px 0' }}>
              <MeasurementChart
                measurementData={measurement.lists}
                measurementName={measurementNames[measurement.lists[0].measurement_id] || `Measurement ID ${measurement.lists[0].measurement_id}`}
                chartColor={chartColors[index % chartColors.length]} // Ustawianie koloru na podstawie indeksu
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Charts;
