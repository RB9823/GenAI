import React from 'react';
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import {Puff} from "react-loader-spinner";

const SubmitLoad = ({ isLoading, onSubmit }) => {
  return (
    <div>
      {isLoading ? (
        <Puff color="#00BFFF" height={100} width={100} />
      ) : (
        <AwesomeButton onPress={onSubmit}>Submit Recording</AwesomeButton>
      )}
    </div>
  );
};

export default SubmitLoad;
