import React, { useState, useEffect } from 'react';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';

const SpeechRecognitionButton = ({ setUserInput, readText }) => {
  const [isListening, setIsListening] = useState(false);
  let recognizer;

  useEffect(() => {
    const subscriptionKey = 'e610c5256e454c409438ad76646353dd';
    const serviceRegion = 'uksouth';
    const speechConfig = sdk.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);
    const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
    recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

    recognizer.recognizing = (s, e) => {
      console.log(`RECOGNIZING: ${e.result.text}`);
      // Handle recognizing events as needed
    };

    recognizer.recognized = (s, e) => {
      if (e.result.reason === sdk.ResultReason.RecognizedSpeech) {
        console.log(`RECOGNIZED: ${e.result.text}`);
        setUserInput(e.result.text);
        readText && readText(e.result.text); // Call readText function if provided
      } else {
        console.log('No speech could be recognized');
      }
    };

    return () => {
      if (recognizer) {
        recognizer.stopContinuousRecognitionAsync(
          () => {
            recognizer.close();
            console.log('Speech recognition stopped successfully.');
          },
          (error) => {
            console.error('Error stopping continuous recognition:', error);
          }
        );
      }
    };
  }, [setUserInput, readText]);

  const handleToggleListening = () => {
    setIsListening((prevIsListening) => {
      if (prevIsListening) {
        recognizer.stopContinuousRecognitionAsync(); // Stop recognition if currently listening
      } else {
        recognizer.startContinuousRecognitionAsync(); // Start recognition if not listening
      }
      return !prevIsListening;
    });
  };

  return (
    <div className="speech-recognition-container">
      <button onMouseDown={handleToggleListening} onMouseUp={handleToggleListening}>
        {isListening ? ' 🎤' : ''} {/* Show microphone emoji if listening */}
      </button>
    </div>
  );
};

export default SpeechRecognitionButton;
