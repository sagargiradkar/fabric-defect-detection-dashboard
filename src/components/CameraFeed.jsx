import React from 'react';

const CameraFeed = ({ imageData }) => {
  if (!imageData) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg border border-gray-200">
        <div className="text-gray-500">
          <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
          </svg>
          <p>Waiting for camera feed...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <img 
        src={`data:image/jpeg;base64,${imageData}`} 
        alt="Camera Feed" 
        className="w-full rounded-lg"
      />
      
      {/* Overlay for defect highlights */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Defect highlights would be inserted here by the backend */}
      </div>
    </div>
  );
};

export default CameraFeed;