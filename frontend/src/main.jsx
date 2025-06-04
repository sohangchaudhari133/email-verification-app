// Entry point for the React application
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'

// Render the main App component inside the root DOM node
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);