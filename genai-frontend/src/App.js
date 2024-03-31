import React, { useState } from 'react';
import './App.css';
import AudioRecorder from './components/AudioRecorder';
import Chart from './components/Chart';
import SubmitLoad from './components/SubmitLoad';
import logo from './logo.svg';

function App() {
  const [tone, setTone] = useState('');
  const [percentage, setPercentage] = useState(0);

  const handleSubmit = () => {
    console.log('Submit clicked');
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Edit <code>src/App.js</code> and save to reload.</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <main>
        <AudioRecorder />
        <SubmitLoad isLoading={false} onSubmit={handleSubmit} />
        <Chart tone={tone} percentage={percentage} /> {/* Updated component name */}
      </main>
    </div>
  );
}

export default App;
