import React, { useState } from 'react';
import CameraFeed from '../components/CameraFeed';
import DefectMetrics from '../components/DefectMetrics';
import RoboticArmControl from '../components/RoboticArmControl';
import StatusBar from '../components/StatusBar';

const Dashboard = ({ defectData, roboticArmStatus, cameraFeed, controlRoboticArm }) => {
  const [activePanel, setActivePanel] = useState('camera');

  // For small mobile screens, allow toggling between panels
  const togglePanel = (panel) => {
    setActivePanel(panel);
  };

  return (
    <div className="flex flex-col h-full gap-4 p-2 sm:p-4 mt-8">
      <StatusBar roboticArmStatus={roboticArmStatus} defectCount={defectData.totalDefects} />
      
      {/* Mobile panel selector - only visible on small screens */}
      <div className="flex md:hidden mb-2">
        <button 
          onClick={() => togglePanel('camera')}
          className={`flex-1 py-2 px-4 rounded-l-lg ${activePanel === 'camera' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Camera
        </button>
        <button 
          onClick={() => togglePanel('metrics')}
          className={`flex-1 py-2 px-4 ${activePanel === 'metrics' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Metrics
        </button>
        <button 
          onClick={() => togglePanel('controls')}
          className={`flex-1 py-2 px-4 rounded-r-lg ${activePanel === 'controls' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Controls
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
        {/* Main camera feed panel */}
        <div className={`md:col-span-2 bg-white rounded-lg shadow-md overflow-hidden 
                       ${activePanel !== 'camera' && 'hidden md:block'}`}>
          <div className="p-3 md:p-4 bg-blue-600 text-white font-semibold flex justify-between items-center">
            <span>Live Camera Feed</span>
            <span className="md:hidden text-xs bg-blue-700 rounded-full px-2 py-1">
              Live
            </span>
          </div>
          <div className="p-2 md:p-4">
            <CameraFeed imageData={cameraFeed} />
          </div>
        </div>

        {/* Side panel with metrics and controls */}
        <div className="flex flex-col gap-4">
          {/* Defect metrics */}
          <div className={`bg-white rounded-lg shadow-md 
                          ${activePanel !== 'metrics' && 'hidden md:block'}`}>
            <div className="p-3 md:p-4 bg-blue-600 text-white font-semibold">
              Defect Metrics
            </div>
            <div className="p-2 md:p-4">
              <DefectMetrics data={defectData} />
            </div>
          </div>

          {/* Robotic arm control */}
          <div className={`bg-white rounded-lg shadow-md 
                          ${activePanel !== 'controls' && 'hidden md:block'}`}>
            <div className="p-3 md:p-4 bg-blue-600 text-white font-semibold">
              Robotic Arm Control
            </div>
            <div className="p-2 md:p-4">
              <RoboticArmControl 
                status={roboticArmStatus} 
                onStart={() => controlRoboticArm('start')} 
                onStop={() => controlRoboticArm('stop')} 
                onReset={() => controlRoboticArm('reset')} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;