import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import ApplicationViews from './components/ApplicationViews';
import { GiftProvider } from './providers/GiftProvider';
import { PledgeDriveProvider } from './providers/PledgeDriveProvider';
import { FrequencyProvider } from './providers/FrequencyProvider';

function App() {
  return (
    <Router>
      <FrequencyProvider>
        <PledgeDriveProvider>
          <GiftProvider>
            <ApplicationViews />
          </GiftProvider>
        </PledgeDriveProvider>
      </FrequencyProvider>
    </Router>
  );
}

export default App;
