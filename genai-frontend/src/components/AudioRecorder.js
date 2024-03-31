import React, { useEffect, useRef } from 'react';
import { ReactMediaRecorder } from "react-media-recorder";

const AudioRecorder = ({ onRecordComplete, isRecording }) => {
  // Using a ref to keep track of the start and stop functions provided by ReactMediaRecorder
  const controlRef = useRef({ startRecording: () => {}, stopRecording: () => {} });

  useEffect(() => {
    // Destructure to directly access startRecording and stopRecording
    const { startRecording, stopRecording } = controlRef.current;

    if (isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  }, [isRecording]);

  return (
    <div className="audio-recorder">
      <ReactMediaRecorder
        audio
        onStop={(blobUrl) => onRecordComplete(blobUrl)}
        render={({ status, startRecording, stopRecording, mediaBlobUrl }) => {
          // Update ref with the current startRecording and stopRecording functions
          controlRef.current.startRecording = startRecording;
          controlRef.current.stopRecording = stopRecording;

          return (
            <div>
              <p>{status}</p>
              <audio src={mediaBlobUrl} controls />
            </div>
          );
        }}
      />
    </div>
  );
};

export default AudioRecorder;
