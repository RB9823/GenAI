import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Dictaphone = ({ isRecording }) => {
  const { transcript: initialTranscript, resetTranscript, browserSupportsSpeechRecognition, listening, startListening, stopListening } = useSpeechRecognition();
  const [transcript, setTranscript] = useState(initialTranscript);

  useEffect(() => {
    if (isRecording && !listening) {
        SpeechRecognition.startListening({ continuous: true });
    } else if (!isRecording && listening) {
        SpeechRecognition.stopListening();
    }
  }, [isRecording, listening, startListening, stopListening]);

  useEffect(() => {
    setTranscript(initialTranscript);
  }, [initialTranscript]);

  const handleTranscriptChange = (event) => {
    setTranscript(event.target.value);
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Your browser does not support speech recognition.</span>;
  }

  return (
    <div>
      <textarea value={transcript} onChange={handleTranscriptChange} rows={5} style={{ width: '100%' }} />
      <button onClick={resetTranscript}>Reset</button>
    </div>
  );
};

export default Dictaphone;
