import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import Settings from './pages/Settings';
import Notifications from './components/Notifications';
import { connectWebSocket } from './websocket';

function App() {
  const [defectData, setDefectData] = useState({
    totalDefects: 0,
    defectsByType: {},
    sortingSuccessRate: 0,
  });
  
  const [roboticArmStatus, setRoboticArmStatus] = useState('idle');
  const [notifications, setNotifications] = useState([]);
  const [cameraFeed, setCameraFeed] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  
  useEffect(() => {
    // Connect to WebSocket
    const ws = connectWebSocket({
      onDefectUpdate: handleDefectUpdate,
      onRoboticArmUpdate: handleRoboticArmUpdate,
      onCameraFeedUpdate: handleCameraFeedUpdate,
      onConnectionChange: setIsConnected
    });
    
    // Fetch initial data
    fetchInitialData();
    
    return () => {
      if (ws) ws.close();
    };
  }, []);
  
  const fetchInitialData = async () => {
    try {
      // Fetch defect metrics
      const metricsResponse = await fetch('http://localhost:8000/api/metrics');
      const metricsData = await metricsResponse.json();
      setDefectData(metricsData);
      
      // Fetch robotic arm status
      const roboticResponse = await fetch('http://localhost:8000/api/robotic-arm/status');
      const roboticData = await roboticResponse.json();
      setRoboticArmStatus(roboticData.status);
    } catch (error) {
      console.error('Error fetching initial data:', error);
      addNotification('Error', 'Failed to fetch initial data', 'error');
    }
  };
  
  const handleDefectUpdate = (data) => {
    setDefectData(prev => ({
      ...prev,
      ...data
    }));
    
    // Create notification for new defect
    if (data.newDefect) {
      addNotification('New Defect Detected', `Defect type: ${data.newDefect.type}`, 'warning');
    }
  };
  
  const handleRoboticArmUpdate = (status) => {
    setRoboticArmStatus(status);
    
    // Notify on status changes
    if (status === 'error') {
      addNotification('Robotic Arm Error', 'The robotic arm has encountered an issue', 'error');
    }
  };
  
  const handleCameraFeedUpdate = (imageData) => {
    setCameraFeed(imageData);
  };
  
  const addNotification = (title, message, type = 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, title, message, type }]);
    
    // Auto-remove notification after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(notification => notification.id !== id));
    }, 5000);
  };
  
  const controlRoboticArm = async (action) => {
    try {
      const response = await fetch(`http://localhost:8000/api/robotic-arm/${action}`, {
        method: 'POST'
      });
      
      if (!response.ok) {
        throw new Error(`Failed to ${action} robotic arm`);
      }
      
      const data = await response.json();
      setRoboticArmStatus(data.status);
      addNotification('Robotic Arm', `Successfully ${action}ed the robotic arm`, 'success');
    } catch (error) {
      console.error(`Error controlling robotic arm:`, error);
      addNotification('Error', `Failed to ${action} robotic arm`, 'error');
    }
  };
  
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        <Sidebar isConnected={isConnected} />
        
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4">
            <Routes>
              <Route 
                path="/" 
                element={
                  <Dashboard 
                    defectData={defectData}
                    roboticArmStatus={roboticArmStatus}
                    cameraFeed={cameraFeed}
                    controlRoboticArm={controlRoboticArm}
                  />
                } 
              />
              <Route path="/history" element={<History />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </div>
        
        <Notifications notifications={notifications} />
      </div>
    </Router>
  );
}

export default App;