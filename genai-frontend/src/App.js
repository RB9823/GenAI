import React, { useState, useCallback } from 'react';
import './App.css';
import AudioRecorder from './components/AudioRecorder';
import Chart from './components/Chart';
import SubmitLoad from './components/SubmitLoad';
import Dictaphone from './components/Dictaphone';
import Card from './components/Card';
import Grid from '@mui/material/Grid';
import { Button, CircularProgress } from '@mui/material';
import { PlayArrow, Stop, Mic } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function App() {
  const XS = 6;
  const MD = 8;
  const CONTAINER_SPACING = 3;
  const [tone, setTone] = useState('');
  const [percentage, setPercentage] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const theme = createTheme({
    palette: {
      primary: {
        main: '#556cd6',
      },
      secondary: {
        main: '#19857b',
      },
    },
  });

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
    <ThemeProvider theme={theme}>
    <div className="App">
      <Grid container spacing={CONTAINER_SPACING}>
        <Grid item xs={12} md={6}>
          <Card sx={{ padding: 2, margin: 2, boxShadow: 3 }}>
            <AudioRecorder isRecording={isRecording} onRecordComplete={onRecordComplete} />
            <SubmitLoad isLoading={false} onSubmit={handleSubmit} />
            <div style={{ marginTop: '1rem', textAlign: 'center' }}>
              <Button onClick={handleStart} disabled={isRecording} startIcon={<Mic />}>Start Recording</Button>
              <Button onClick={handleStop} disabled={!isRecording} startIcon={<Stop />}>Stop Recording</Button>
            </div>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <Dictaphone isRecording={isRecording} />
          </Card>
        </Grid>
        <Grid item xs={12} md={12}>
          <Card>
            <Chart tone={tone} percentage={percentage} />
          </Card>
        </Grid>
      </Grid>
    </div>
    </ThemeProvider>
  );
}

export default App;
