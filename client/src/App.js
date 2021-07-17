import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import ApplicationViews from './components/ApplicationViews';
import { GiftProvider } from './providers/GiftProvider';

function App() {
  return (
    <Router>
      <GiftProvider>
        <ApplicationViews />
      </GiftProvider>
    </Router>
  );
}

export default App;
