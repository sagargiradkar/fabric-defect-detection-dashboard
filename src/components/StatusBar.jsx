import React from 'react';

const StatusBar = ({ roboticArmStatus, defectCount }) => {
  // Function to get the status indicator color
  const getStatusColor = (status) => {
    switch (status) {
      case 'running':
        return 'bg-green-500';
      case 'idle':
        return 'bg-gray-500';
      case 'error':
        return 'bg-red-500';
      case 'stopping':
        return 'bg-orange-500';
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
      <div className="flex items-center">
        <h1 className="text-xl font-bold text-gray-800">Fabric Defect Dashboard</h1>
        <span className="ml-4 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
          Live
        </span>
      </div>
      
      <div className="flex items-center space-x-6">
        {/* Robotic Arm Status */}
        <div className="flex items-center text-sm">
          <span className="text-gray-500 mr-2">Arm Status:</span>
          <div className="flex items-center">
            <span className={`w-2 h-2 rounded-full mr-1 ${getStatusColor(roboticArmStatus)}`}></span>
            <span className="font-medium capitalize">{roboticArmStatus}</span>
          </div>
        </div>
        
        {/* Total Defects */}
        <div className="flex items-center text-sm">
          <span className="text-gray-500 mr-2">Total Defects:</span>
          <span className="font-medium text-red-600">{defectCount}</span>
        </div>
        
        {/* Current Time */}
        <div className="text-sm">
          <CurrentTime />
        </div>
      </div>
    </div>
  );
};

// Component to show current time and auto-update it
const CurrentTime = () => {
  const [time, setTime] = React.useState(new Date());
  
  React.useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    
    return () => {
      clearInterval(timer);
    };
  }, []);
  
  return (
    <div className="flex items-center text-gray-500">
      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      {time.toLocaleTimeString()}
    </div>
  );
};

export default StatusBar;