import React, { useState, useCallback } from 'react';
import './App.css';
import AudioRecorder from './components/AudioRecorder';
import Chart from './components/Chart';
import SubmitLoad from './components/SubmitLoad';
import Dictaphone from './components/Dictaphone';
import Card from './components/Card';
import Grid from '@mui/material/Grid';
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";

function App() {
  const [tone, setTone] = useState('');
  const [percentage, setPercentage] = useState(0);
  const [isRecording, setIsRecording] = useState(false); // New state to control recording and transcription

  const handleStart = () => {
    setIsRecording(true);
  };

  const handleStop = () => {
    setIsRecording(false);
  };

  const handleSubmit = () => {
    console.log('Submit clicked');
  };

  const onRecordComplete = useCallback((mediaBlobUrl) => {
    console.log("Recording complete! Media Blob URL:", mediaBlobUrl);
    // Handle the mediaBlobUrl as needed
  }, []);

  return (
    <div className="App">
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={5}> 
          <Card>
            <AudioRecorder isRecording={isRecording} onRecordComplete={onRecordComplete} />
          </Card>
        </Grid>
        <Grid item xs={12} md={5}>
          <Card>
            <Dictaphone isRecording={isRecording} />
          </Card>
        </Grid>
        <AwesomeButton onPress={handleStart} disabled={isRecording}>Start</AwesomeButton>
        <AwesomeButton onPress={handleStop} disabled={!isRecording}>Stop</AwesomeButton>
        <Grid item xs={12} md={6}>
          <Card>
            <SubmitLoad isLoading={false} onSubmit={handleSubmit} />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <Chart tone={tone} percentage={percentage} />
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
