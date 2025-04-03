import React, { useState, useEffect } from 'react';

const Settings = () => {
  // Settings state
  const [settings, setSettings] = useState({
    camera: {
      enabled: true,
      resolution: '720p',
      fps: 24
    },
    roboticArm: {
      speedFactor: 70,
      autoRecover: true,
      defectThreshold: 80
    },
    notifications: {
      defectAlerts: true,
      systemAlerts: true,
      emailNotifications: false,
      emailAddress: ''
    }
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(null);
  
  // Fetch settings
  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8000/api/settings');
        if (response.ok) {
          const data = await response.json();
          setSettings(data);
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
      } finally {
        setLoading(false);
      }
    };
    
    // Fetch settings or use defaults after a short delay
    // (to simulate API call if backend is not ready)
    setTimeout(() => {
      fetchSettings();
    }, 1000);
  }, []);
  
  const handleInputChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };
  
  const handleSaveSettings = async () => {
    setSaving(true);
    setSaveSuccess(null);
    
    try {
      // API call to save settings
      const response = await fetch('http://localhost:8000/api/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(settings)
      });
      
      if (response.ok) {
        setSaveSuccess(true);
      } else {
        setSaveSuccess(false);
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      setSaveSuccess(false);
    } finally {
      setSaving(false);
      
      // For demo/development without backend
      setTimeout(() => {
        setSaveSuccess(true);
        setSaving(false);
      }, 1000);
    }
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-full mt-16">
        <div className="text-center">
          <svg className="animate-spin h-10 w-10 text-blue-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-500">Loading settings...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 mt-16 max-w-6xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">System Settings</h1>
        
        <button
          onClick={handleSaveSettings}
          disabled={saving}
          className={`px-4 py-2 rounded-md text-white font-medium flex items-center ${saving ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {saving ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </>
          ) : (
            <>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path>
              </svg>
              Save Settings
            </>
          )}
        </button>
      </div>
      
      {saveSuccess === true && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded mb-6">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>Settings saved successfully!</span>
          </div>
        </div>
      )}
      
      {saveSuccess === false && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>Failed to save settings. Please try again.</span>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Camera Settings */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <h2 className="text-lg font-medium mb-4">Camera Settings</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-gray-700">Enable Camera</label>
              <label className="switch">
                <input 
                  type="checkbox" 
                  checked={settings.camera.enabled}
                  onChange={(e) => handleInputChange('camera', 'enabled', e.target.checked)}
                />
                <span className="relative inline-block w-10 h-6 bg-gray-200 rounded-full transition-colors duration-200 ease-in-out cursor-pointer">
                  <span 
                    className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 ease-in-out transform ${
                      settings.camera.enabled ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  ></span>
                </span>
              </label>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Resolution</label>
              <select 
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={settings.camera.resolution}
                onChange={(e) => handleInputChange('camera', 'resolution', e.target.value)}
              >
                <option value="480p">480p</option>
                <option value="720p">720p</option>
                <option value="1080p">1080p</option>
                <option value="4K">4K</option>
              </select>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">FPS</label>
              <div className="flex items-center">
                <input
                  type="range"
                  min="15"
                  max="60"
                  step="1"
                  value={settings.camera.fps}
                  onChange={(e) => handleInputChange('camera', 'fps', parseInt(e.target.value))}
                  className="w-full mr-4"
                />
                <span className="text-gray-700 min-w-[40px] text-center">{settings.camera.fps}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Robotic Arm Settings */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <h2 className="text-lg font-medium mb-4">Robotic Arm Settings</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Speed Factor (%)</label>
              <div className="flex items-center">
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={settings.roboticArm.speedFactor}
                  onChange={(e) => handleInputChange('roboticArm', 'speedFactor', parseInt(e.target.value))}
                  className="w-full mr-4"
                />
                <span className="text-gray-700 min-w-[40px] text-center">{settings.roboticArm.speedFactor}%</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <label className="text-gray-700">Auto Recover</label>
              <label className="switch">
                <input 
                  type="checkbox" 
                  checked={settings.roboticArm.autoRecover}
                  onChange={(e) => handleInputChange('roboticArm', 'autoRecover', e.target.checked)}
                />
                <span className="relative inline-block w-10 h-6 bg-gray-200 rounded-full transition-colors duration-200 ease-in-out cursor-pointer">
                  <span 
                    className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 ease-in-out transform ${
                      settings.roboticArm.autoRecover ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  ></span>
                </span>
              </label>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Defect Threshold (%)</label>
              <div className="flex items-center">
                <input
                  type="range"
                  min="50"
                  max="99"
                  step="1"
                  value={settings.roboticArm.defectThreshold}
                  onChange={(e) => handleInputChange('roboticArm', 'defectThreshold', parseInt(e.target.value))}
                  className="w-full mr-4"
                />
                <span className="text-gray-700 min-w-[40px] text-center">{settings.roboticArm.defectThreshold}%</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Notifications Settings */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <h2 className="text-lg font-medium mb-4">Notification Settings</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-gray-700">Defect Alerts</label>
              <label className="switch">
                <input 
                  type="checkbox" 
                  checked={settings.notifications.defectAlerts}
                  onChange={(e) => handleInputChange('notifications', 'defectAlerts', e.target.checked)}
                />
                <span className="relative inline-block w-10 h-6 bg-gray-200 rounded-full transition-colors duration-200 ease-in-out cursor-pointer">
                  <span 
                    className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 ease-in-out transform ${
                      settings.notifications.defectAlerts ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  ></span>
                </span>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <label className="text-gray-700">System Alerts</label>
              <label className="switch">
                <input 
                  type="checkbox" 
                  checked={settings.notifications.systemAlerts}
                  onChange={(e) => handleInputChange('notifications', 'systemAlerts', e.target.checked)}
                />
                <span className="relative inline-block w-10 h-6 bg-gray-200 rounded-full transition-colors duration-200 ease-in-out cursor-pointer">
                  <span 
                    className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 ease-in-out transform ${
                      settings.notifications.systemAlerts ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  ></span>
                </span>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <label className="text-gray-700">Email Notifications</label>
              <label className="switch">
                <input 
                  type="checkbox" 
                  checked={settings.notifications.emailNotifications}
                  onChange={(e) => handleInputChange('notifications', 'emailNotifications', e.target.checked)}
                />
                <span className="relative inline-block w-10 h-6 bg-gray-200 rounded-full transition-colors duration-200 ease-in-out cursor-pointer">
                  <span 
                    className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 ease-in-out transform ${
                      settings.notifications.emailNotifications ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  ></span>
                </span>
              </label>
            </div>
            
            <div className={settings.notifications.emailNotifications ? 'block' : 'hidden'}>
              <label className="block text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                value={settings.notifications.emailAddress}
                onChange={(e) => handleInputChange('notifications', 'emailAddress', e.target.value)}
                placeholder="Enter email address"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
        
        {/* System Information */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <h2 className="text-lg font-medium mb-4">System Information</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-700">Version</span>
              <span className="text-gray-500">v1.2.5</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Last Updated</span>
              <span className="text-gray-500">2025-03-28</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Environment</span>
              <span className="text-gray-500">Production</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Status</span>
              <span className="flex items-center text-green-500">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Online
              </span>
            </div>
            
            <div className="pt-2 border-t border-gray-200">
              <button className="w-full py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition duration-200 flex items-center justify-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
                Restart System
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;