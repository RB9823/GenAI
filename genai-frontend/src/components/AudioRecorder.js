import React, { useEffect, useRef } from 'react';
import { ReactMediaRecorder } from "react-media-recorder";

const AudioRecorder = ({ onRecordComplete, isRecording }) => {
  const controlRef = useRef({ startRecording: () => {}, stopRecording: () => {} });

  useEffect(() => {
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
        render={({ startRecording, stopRecording, mediaBlobUrl }) => {
          controlRef.current.startRecording = startRecording;
          controlRef.current.stopRecording = stopRecording;

          return (
            <div>
              <audio src={mediaBlobUrl} controls />
            </div>
          );
        }}
      />
    </div>
  );
};

export default AudioRecorder;
