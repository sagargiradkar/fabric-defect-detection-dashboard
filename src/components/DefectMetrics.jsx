import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DefectMetrics = ({ data }) => {
  const { totalDefects, defectsByType, sortingSuccessRate } = data;
  
  // Format data for charts
  const pieChartData = Object.entries(defectsByType || {}).map(([name, value]) => ({
    name,
    value
  }));
  
  // Colors for chart segments
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  
  // Calculate percentage
  const successPercentage = sortingSuccessRate || 0;
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Total Defects</h3>
        <span className="text-2xl font-bold text-red-600">{totalDefects || 0}</span>
      </div>
      
      {/* Defects by Type Chart */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="text-sm font-medium text-gray-500 mb-2">Defects by Type</h4>
        {pieChartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={60}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[150px] flex items-center justify-center text-gray-400">
            No defect data available
          </div>
        )}
      </div>
      
      {/* Sorting Success Rate */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="text-sm font-medium text-gray-500 mb-2">Sorting Success Rate</h4>
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                {successPercentage.toFixed(1)}%
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
            <div 
              style={{ width: `${successPercentage}%` }} 
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefectMetrics;