import React, { useState, useCallback } from 'react';
import axios from 'axios';
import './styles/App.css';
import AudioRecorder from './components/AudioRecorder';
import Chart from './components/Chart';
import SubmitLoad from './components/SubmitLoad'; //implement the loading state during submission
import Dictaphone from './components/Dictaphone';
import { Card, Grid, Button, Typography } from '@mui/material';
import { Mic, Send, Stop } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#556cd6' },
    secondary: { main: '#19857b' },
  },
  typography: {
    h5: {
      fontWeight: 500,
      color: '#fff',
    },
    button: {
      textTransform: 'none',
    },
  },
});

function App() {
  const [tone, setTone] = useState('');
  const [percentage, setPercentage] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [transcript, setTranscript] = useState('');

  const handleStart = () => { setIsRecording(true); };
  const handleStop = () => { setIsRecording(false); };

  const handleSubmit = () => {
    console.log('Submit clicked');
    setSubmitted(true);

    axios.get('http://localhost:5000/genai', {
      params: {
        sentence: transcript
      }
    })
    .then(response => {
      console.log('Response from Flask backend:', response.data);
      setTone(response.data.tone);
      setPercentage(response.data.percentage);
    })
    .catch(error => {
      console.error('There was an error making the request', error);
    });
  };

  const onRecordComplete = useCallback((mediaBlobUrl) => {
    console.log("Recording complete! Media Blob URL:", mediaBlobUrl);
  }, []);

  const handleTranscriptChange = useCallback((newTranscript) => {
    setTranscript(newTranscript);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Grid container justifyContent="center" alignItems="center" className="main-container">
          <Card
            sx={{
              background: 'rgba(31, 41, 55, 0.8)',
              backdropFilter: 'blur(5px)',
              padding: '30px',
              borderRadius: '20px',
              boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
              width: '500px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="h2"
              align="center"
              gutterBottom
              sx={{
                fontSize: '2.5rem',
                fontWeight: 700,
                background: 'linear-gradient(45deg, #a855f7, #3b82f6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '20px',
              }}
            >
              Sentiment Analysis
            </Typography>
            <div className="controls">
              {isRecording ? (
                <Button
                  variant="contained"
                  startIcon={<Stop />}
                  onClick={handleStop}
                  fullWidth
                  sx={{
                    marginBottom: '15px',
                    padding: '15px 20px',
                    borderRadius: '20px',
                    background: 'rgba(0, 0, 0, 0.5)',
                    backdropFilter: 'blur(10px)',
                    color: 'white',
                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                    boxShadow: 'none',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
                    },
                  }}
                >
                  Stop Recording
                </Button>
              ) : (
                <Button
                  variant="contained"
                  startIcon={<Mic />}
                  onClick={handleStart}
                  fullWidth
                  sx={{
                    marginBottom: '15px',
                    padding: '15px 20px',
                    borderRadius: '20px',
                    background: 'rgba(0, 0, 0, 0.5)',
                    backdropFilter: 'blur(10px)',
                    color: 'white',
                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                    boxShadow: 'none',
                    '&:hover': {
                      transform: 'perspective(200px) translateZ(2px)',
                      boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
                    },
                    '&:disabled': {
                      background: 'rgba(0, 0, 0, 0.3)',
                    },
                  }}
                >
                  Start Recording
                </Button>
              )}
              <Button
                variant="contained"
                startIcon={<Send />}
                onClick={handleSubmit}
                fullWidth
                sx={{
                  marginBottom: '15px',
                  padding: '15px 20px',
                  borderRadius: '20px',
                  background: 'rgba(0, 0, 0, 0.5)',
                  backdropFilter: 'blur(10px)',
                  color: 'white',
                  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                  boxShadow: 'none',
                  '&:hover': {
                    transform: 'perspective(200px) translateZ(2px)',
                    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
                  },
                  '&:disabled': {
                    background: 'rgba(0, 0, 0, 0.3)',
                  },
                }}
              >
                Submit
              </Button>
              <AudioRecorder isRecording={isRecording} onRecordComplete={onRecordComplete} />
              <Dictaphone isRecording={isRecording} onTranscriptChange={handleTranscriptChange} />
            </div>
            {submitted && (
              <Chart tone={tone} percentage={percentage} />
            )}
          </Card>
        </Grid>
      </div>
    </ThemeProvider>
  );
}

export default App;
