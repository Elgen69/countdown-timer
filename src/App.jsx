import React, { useState, useEffect } from 'react';
import CountdownTimer from './components/CountdownTimer';

function App() {
  return (
    <div className="app-container">
      <h1>Random Meme Alarm!</h1>
      <CountdownTimer />
    </div>
  );
}

export default App;
