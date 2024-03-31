import React from 'react';
import { ReactMediaRecorder } from "react-media-recorder";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";

const AudioRecorder = ({ onRecordComplete }) => {
  return (
    <div className="audio-recorder">
      <ReactMediaRecorder
        audio
        render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
          <div>
            <p>{status}</p>
            <AwesomeButton onClick={startRecording}>Start Recording</AwesomeButton>
            <AwesomeButton onClick={() => { stopRecording(); onRecordComplete(mediaBlobUrl); }}>Stop Recording</AwesomeButton>
            <audio src={mediaBlobUrl} controls />
          </div>
        )}
      />
    </div>
  );
};

export default AudioRecorder;
