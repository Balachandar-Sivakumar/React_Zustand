import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import ClearError from './helper/clearError';
import AppRouts from './routes/appRutes';

function App() {
  return (
    <BrowserRouter>
      <ClearError/>
      <AppRouts/>
    </BrowserRouter>
  );
}

export default App;
