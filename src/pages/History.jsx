import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const History = () => {
  const [historyData, setHistoryData] = useState([]);
  const [timeframe, setTimeframe] = useState('day');
  const [loading, setLoading] = useState(true);
  
  // Fetch history data
  useEffect(() => {
    const fetchHistoryData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8000/api/history?timeframe=${timeframe}`);
        const data = await response.json();
        setHistoryData(data);
      } catch (error) {
        console.error('Error fetching history data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchHistoryData();
  }, [timeframe]);
  
  // Sample data structure for demonstration
  // If API is not ready, use this sample data
  useEffect(() => {
    if (loading && historyData.length === 0) {
      const sampleData = generateSampleData(timeframe);
      setTimeout(() => {
        setHistoryData(sampleData);
        setLoading(false);
      }, 1000);
    }
  }, [timeframe, loading, historyData]);
  
  // Generate sample data based on timeframe
  const generateSampleData = (tf) => {
    let data = [];
    let now = new Date();
    
    switch (tf) {
      case 'day':
        // Generate hourly data for the last 24 hours
        for (let i = 23; i >= 0; i--) {
          let hour = new Date(now);
          hour.setHours(hour.getHours() - i);
          data.push({
            time: hour.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            defects: Math.floor(Math.random() * 10),
            successRate: 85 + Math.random() * 10
          });
        }
        break;
      case 'week':
        // Generate daily data for the last 7 days
        for (let i = 6; i >= 0; i--) {
          let day = new Date(now);
          day.setDate(day.getDate() - i);
          data.push({
            time: day.toLocaleDateString([], { weekday: 'short' }),
            defects: Math.floor(Math.random() * 50 + 20),
            successRate: 85 + Math.random() * 10
          });
        }
        break;
      case 'month':
        // Generate weekly data for the last 4 weeks
        for (let i = 4; i >= 0; i--) {
          let week = new Date(now);
          week.setDate(week.getDate() - (i * 7));
          data.push({
            time: `Week ${4-i}`,
            defects: Math.floor(Math.random() * 200 + 100),
            successRate: 85 + Math.random() * 10
          });
        }
        break;
      default:
        break;
    }
    
    return data;
  };
  
  return (
    <div className="space-y-4 md:space-y-6 pt-16 md:pt-4 px-2 md:px-4"> {/* Added padding-top for navbar space */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">Historical Data</h1>
        
        <div className="flex w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
          <div className="flex space-x-2 min-w-max">
            <TimeframeButton 
              label="Day" 
              active={timeframe === 'day'} 
              onClick={() => setTimeframe('day')} 
            />
            <TimeframeButton 
              label="Week" 
              active={timeframe === 'week'} 
              onClick={() => setTimeframe('week')} 
            />
            <TimeframeButton 
              label="Month" 
              active={timeframe === 'month'} 
              onClick={() => setTimeframe('month')} 
            />
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-3 md:p-4">
        <h2 className="text-lg font-medium mb-4">Defect Trend</h2>
        {loading ? (
          <div className="h-48 md:h-64 flex items-center justify-center">
            <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : (
          <div className="h-48 md:h-64 lg:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historyData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                <YAxis yAxisId="left" width={40} tick={{ fontSize: 12 }} />
                <YAxis yAxisId="right" orientation="right" domain={[0, 100]} width={40} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: '12px', marginTop: '10px' }} />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="defects" 
                  name="Defects" 
                  stroke="#8884d8" 
                  activeDot={{ r: 6 }} 
                  strokeWidth={2}
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="successRate" 
                  name="Success Rate (%)" 
                  stroke="#82ca9d" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-3 md:p-4">
        <h2 className="text-lg font-medium mb-4">Defect History Log</h2>
        {loading ? (
          <div className="h-48 md:h-64 flex items-center justify-center">
            <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : (
          <div className="overflow-x-auto -mx-3 md:mx-0">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  <th className="px-3 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Defects</th>
                  <th className="px-3 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Success Rate</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {historyData.map((entry, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-3 py-2 md:px-6 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-500">{entry.time}</td>
                    <td className="px-3 py-2 md:px-6 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-900">{entry.defects}</td>
                    <td className="px-3 py-2 md:px-6 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-900">{entry.successRate.toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

// Timeframe button component
const TimeframeButton = ({ label, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 md:px-4 md:py-2 text-xs md:text-sm font-medium rounded-md ${
        active 
          ? 'bg-blue-600 text-white' 
          : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
      }`}
    >
      {label}
    </button>
  );
};

export default History;