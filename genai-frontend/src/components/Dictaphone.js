import React, { useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Dictaphone = ({ isRecording }) => {
  const { transcript, resetTranscript, browserSupportsSpeechRecognition, listening, startListening, stopListening } = useSpeechRecognition();

  useEffect(() => {
    if (isRecording && !listening) {
        SpeechRecognition.startListening({ continuous: true });
    } else if (!isRecording && listening) {
        SpeechRecognition.stopListening();
    }
  }, [isRecording, listening, startListening, stopListening]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Your browser does not support speech recognition.</span>;
  }

  return (
    <div>
      <p>Transcription: {transcript}</p>
      <button onClick={resetTranscript}>Reset</button>
    </div>
  );
};

export default Dictaphone;
