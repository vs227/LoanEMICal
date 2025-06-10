import React from 'react';
import Navbar from './components/Navbar';
import LoanCalculator from './components/LoanCalculator';

import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <LoanCalculator />
    </div>
  );
}

export default App;