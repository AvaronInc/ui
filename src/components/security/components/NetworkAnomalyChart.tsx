
import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from 'recharts';

interface NetworkAnomalyChartProps {
  data: any[];
}

const NetworkAnomalyChart: React.FC<NetworkAnomalyChartProps> = ({ data }) => {
  // If no data is provided, use sample data
  const chartData = data || [
    { time: '00:00', normal: 42, anomaly: 0, threshold: 65 },
    { time: '02:00', normal: 38, anomaly: 0, threshold: 65 },
    { time: '04:00', normal: 35, anomaly: 0, threshold: 65 },
    { time: '06:00', normal: 40, anomaly: 0, threshold: 65 },
    { time: '08:00', normal: 52, anomaly: 0, threshold: 65 },
    { time: '10:00', normal: 58, anomaly: 0, threshold: 65 },
    { time: '12:00', normal: 63, anomaly: 0, threshold: 65 },
    { time: '14:00', normal: 62, anomaly: 0, threshold: 65 },
    { time: '16:00', normal: 0, anomaly: 89, threshold: 65 },
    { time: '18:00', normal: 61, anomaly: 0, threshold: 65 },
    { time: '20:00', normal: 0, anomaly: 77, threshold: 65 },
    { time: '22:00', normal: 45, anomaly: 0, threshold: 65 },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        <ReferenceLine y={65} stroke="#ff9800" strokeDasharray="3 3" label={{ position: 'top', value: 'Threshold', fill: '#ff9800', fontSize: 10 }} />
        <Line type="monotone" dataKey="normal" stroke="#2196f3" activeDot={{ r: 8 }} strokeWidth={2} />
        <Line type="monotone" dataKey="anomaly" stroke="#f44336" activeDot={{ r: 8 }} strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default NetworkAnomalyChart;
