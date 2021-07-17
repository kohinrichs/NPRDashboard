import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import ApplicationViews from './components/ApplicationViews';
import { GiftProvider } from './providers/GiftProvider';
import { PledgeDriveProvider } from './providers/PledgeDriveProvider';

function App() {
  return (
    <Router>
      <PledgeDriveProvider>
        <GiftProvider>
          <ApplicationViews />
        </GiftProvider>
      </PledgeDriveProvider>
    </Router>
  );
}

export default App;
