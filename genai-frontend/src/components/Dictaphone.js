import React, { useEffect, useState, useCallback } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import '../styles/Dictaphone.css';

// Component to be re-written to handle buttons; 
// core logic ported to Flask Backend,
// leveraging the Whisper model for better lang support

const Dictaphone = ({ isRecording, onTranscriptChange }) => {
  const {
    transcript: initialTranscript,
    resetTranscript,
    browserSupportsSpeechRecognition,
    listening,
  } = useSpeechRecognition();

  const [transcript, setTranscript] = useState(initialTranscript);

  useEffect(() => {
    if (isRecording && !listening) {
      SpeechRecognition.startListening({ continuous: true });
    } else if (!isRecording && listening) {
      SpeechRecognition.stopListening();
    }
  }, [isRecording, listening]);

  useEffect(() => {
    setTranscript(initialTranscript);
    onTranscriptChange(initialTranscript);
  }, [initialTranscript, onTranscriptChange]);

  const handleTranscriptChange = useCallback((event) => {
    setTranscript(event.target.value);
    onTranscriptChange(event.target.value);
  }, [onTranscriptChange]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Your browser does not support speech recognition. Please use Chrome.</span>;
  }

  return (
    <div className="dictaphone-container">
      <textarea
        value={transcript}
        onChange={handleTranscriptChange}
        rows={5}
        className="dictaphone-textarea"
        placeholder="Real-time transcription will appear here..."
        autoFocus
      />
      <button onClick={resetTranscript} className="dictaphone-resetButton">Reset</button>
    </div>
  );
};

export default Dictaphone;
