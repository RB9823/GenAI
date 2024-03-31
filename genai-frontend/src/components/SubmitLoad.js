import React from 'react';
import { Button } from '@mui/material';
import "react-awesome-button/dist/styles.css";
import {Puff} from "react-loader-spinner";

const SubmitLoad = ({ isLoading, onSubmit }) => {
  return (
    <div>
      {isLoading ? (
        <Puff color="#00BFFF" height={100} width={100} />
      ) : (
        <Button onPress={onSubmit}>Submit Recording</Button>
      )}
    </div>
  );
};

export default SubmitLoad;
