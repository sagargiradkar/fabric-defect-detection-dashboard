import React from 'react';

const RoboticArmControl = ({ status, onStart, onStop, onReset }) => {
  // Status display color
  const getStatusColor = () => {
    switch (status) {
      case 'running':
        return 'text-green-500';
      case 'idle':
        return 'text-gray-500';
      case 'error':
        return 'text-red-500';
      case 'stopping':
        return 'text-orange-500';
      default:
        return 'text-blue-500';
    }
  };
  
  // Status display icon
  const getStatusIcon = () => {
    switch (status) {
      case 'running':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        );
      case 'idle':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        );
      case 'error':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        );
    }
  };
  
  // Determine if start button should be disabled
  const isStartDisabled = status === 'running' || status === 'error';
  
  // Determine if stop button should be disabled
  const isStopDisabled = status === 'idle' || status === 'stopping';
  
  return (
    <div className="space-y-4">
      {/* Status display */}
      <div className="flex items-center space-x-2">
        <span className="font-medium">Status:</span>
        <div className={`flex items-center ${getStatusColor()}`}>
          {getStatusIcon()}
          <span className="ml-1 capitalize">{status}</span>
        </div>
      </div>
      
      {/* Control buttons */}
      <div className="flex flex-col space-y-2">
        <button
          onClick={onStart}
          disabled={isStartDisabled}
          className={`flex items-center justify-center px-4 py-2 rounded font-medium ${
            isStartDisabled
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-green-500 text-white hover:bg-green-600'
          }`}
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
          </svg>
          Start Arm
        </button>
        
        <button
          onClick={onStop}
          disabled={isStopDisabled}
          className={`flex items-center justify-center px-4 py-2 rounded font-medium ${
            isStopDisabled
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-red-500 text-white hover:bg-red-600'
          }`}
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"></path>
          </svg>
          Stop Arm
        </button>
        
        <button
          onClick={onReset}
          className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded font-medium hover:bg-blue-600"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
          Reset Arm
        </button>
      </div>
    </div>
  );
};

export default RoboticArmControl;