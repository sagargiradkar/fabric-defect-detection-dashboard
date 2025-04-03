// WebSocket client for real-time updates
export const connectWebSocket = ({ 
    onDefectUpdate, 
    onRoboticArmUpdate, 
    onCameraFeedUpdate,
    onConnectionChange
  }) => {
    const ws = new WebSocket('ws://localhost:8000/ws');
    
    ws.onopen = () => {
      console.log('WebSocket connected');
      onConnectionChange(true);
    };
    
    ws.onclose = () => {
      console.log('WebSocket disconnected');
      onConnectionChange(false);
      
      // Attempt to reconnect after 3 seconds
      setTimeout(() => {
        console.log('Attempting to reconnect...');
        connectWebSocket({
          onDefectUpdate,
          onRoboticArmUpdate,
          onCameraFeedUpdate,
          onConnectionChange
        });
      }, 3000);
    };
    
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      onConnectionChange(false);
    };
    
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        
        // Route messages based on their type
        switch (data.type) {
          case 'defect_update':
            onDefectUpdate(data.payload);
            break;
          case 'robotic_arm_update':
            onRoboticArmUpdate(data.payload.status);
            break;
          case 'camera_feed':
            onCameraFeedUpdate(data.payload.image);
            break;
          default:
            console.log('Unknown message type:', data.type);
        }
      } catch (error) {
        console.error('Error processing WebSocket message:', error);
      }
    };
    
    // Helper function to send messages to the server
    const sendMessage = (type, payload) => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type, payload }));
      } else {
        console.error('WebSocket is not connected');
      }
    };
    
    // Add the send method to the WebSocket object
    ws.sendMessage = sendMessage;
    
    return ws;
  };