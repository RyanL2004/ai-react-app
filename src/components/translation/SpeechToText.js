import React, { useState, useEffect, useRef } from 'react';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';

const SpeechToText = ({ onSpeechRecognitionResult }) => {
  const [isListening, setIsListening] = useState(false);
  const recognizerRef = useRef(null); // Declare recognizerRef outside the component scope

  useEffect(() => {
    return () => {
      if (recognizerRef.current) {
        recognizerRef.current.stopContinuousRecognitionAsync(() => {
          recognizerRef.current.close();
        });
      }
    };
  }, []);

  const startSpeechRecognition = () => {
    const subscriptionKey = 'e610c5256e454c409438ad76646353dd';
    const region = 'uksouth';
    const speechConfig = sdk.SpeechConfig.fromSubscription(subscriptionKey, region);
    const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
    recognizerRef.current = new sdk.SpeechRecognizer(speechConfig, audioConfig);

    recognizerRef.current.recognizing = (s, e) => {
      // Handle recognizing events if needed
    };

    recognizerRef.current.recognized = (s, e) => {
      if (e.result.reason === sdk.ResultReason.RecognizedSpeech) {
        onSpeechRecognitionResult(e.result.text);
      } else {
        console.log('No speech could be recognized');
      }
    };

    recognizerRef.current.startContinuousRecognitionAsync(() => {
      setIsListening(true);
    });
  };

  const stopSpeechRecognition = () => {
    if (recognizerRef.current) {
      recognizerRef.current.stopContinuousRecognitionAsync(() => {
        setIsListening(false);
      });
    }
  };

  const handleToggleListening = () => {
    if (!isListening) {
      startSpeechRecognition();
    } else {
      stopSpeechRecognition();
    }
  };

  return (
    <div>
      <button onClick={handleToggleListening}>
        {isListening ? 'Stop Listening' : '🎤'}
      </button>
    </div>
  );
};

export default SpeechToText;
