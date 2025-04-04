# Fabric Defect Detection Dashboard

## 🚀 Overview
This project is a FastAPI + React-based dashboard for real-time fabric defect detection and robotic arm control. It provides live video streaming, defect metrics visualization, and robotic arm management for automated sorting.

## 🛠 Tech Stack

### Backend (FastAPI)
- Handles API requests, real-time data, and model inference.
- Uses WebSockets for live updates.

### Frontend (React + TailwindCSS/Material-UI)
- Displays live video, defect metrics, and robotic arm status.
- Fetches data from FastAPI.

### Database (PostgreSQL/MySQL)
- Stores logs, defect counts, and system status.

### Messaging (WebSockets / MQTT)
- WebSockets for real-time updates from the backend.
- MQTT (if needed) for robotic arm communication.

## 📂 Folder Structure
```
fabric_defect_dashboard/
│── backend/                 # FastAPI Backend
│   ├── main.py              # API & WebSockets
│   ├── models.py            # Database models
│   ├── routes.py            # API routes
│   ├── websocket.py         # WebSockets for live updates
│   ├── camera.py            # Webcam/IP Camera streaming
│   ├── robotic_arm.py       # Robotic arm control
│── frontend/                # React Frontend
│   ├── src/
│   │   ├── components/      # UI Components
│   │   ├── pages/           # Dashboard Pages
│   │   ├── App.js           # Main React App
│   │   ├── websocket.js     # WebSocket client
│── database/                # Database setup
│── Dockerfile               # Docker config
│── README.md                # Documentation
```

## 🔥 Features to Implement
✅ Live Camera Feed (WebSocket stream from FastAPI to React)
✅ Defect Metrics Dashboard (charts for total defects, defect type, sorting success)
✅ Robotic Arm Control (buttons to start/stop sorting)
✅ Real-time Notifications (e.g., if a defect is detected, trigger a pop-up alert)
✅ Logs & History (Store previous defect records for analysis)

## 🚀 Getting Started
### Backend Setup
1. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
2. Run FastAPI server:
   ```sh
   uvicorn backend.main:app --reload
   ```

### Frontend Setup
1. Navigate to frontend folder:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run React application:
   ```sh
   npm start
   ```

### Running with Docker
```sh
docker-compose up --build
```

## 📜 License
This project is licensed under the MIT License.

