import React, { useState, useEffect } from 'react';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';

const TextRecognitionButton = ({ inputText, translatedText }) => {
  const [isReading, setIsReading] = useState(false);
  let speechSynthesizer;

  useEffect(() => {
    const startReading = () => {
      const subscriptionKey = 'e610c5256e454c409438ad76646353dd';
      const serviceRegion = 'uksouth';
      const speechConfig = sdk.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);
      const audioConfig = sdk.AudioConfig.fromDefaultSpeakerOutput();
      speechSynthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

      // Read the input text
      if (inputText) {
        speechSynthesizer.speakTextAsync(
          inputText,
          (result) => {
            if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
              console.log('Speech synthesis for input text is complete.');
            }
          },
          (error) => {
            console.error('Error synthesizing speech for input text:', error);
          }
        );
      }

      // Read the translated text
      if (translatedText) {
        speechSynthesizer.speakTextAsync(
          translatedText,
          (result) => {
            if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
              console.log('Speech synthesis for translated text is complete.');
            }
          },
          (error) => {
            console.error('Error synthesizing speech for translated text:', error);
          }
        );
      }
    };

    const stopReading = () => {
      if (speechSynthesizer) {
        speechSynthesizer.close();
      }
    };

    if (isReading) {
      startReading();
    } else {
      stopReading();
    }

    // Clean up the speechSynthesizer when the component unmounts or when isReading changes
    return () => {
      stopReading();
    };
  }, [isReading, inputText, translatedText]);

  const handleToggleReading = () => {
    setIsReading((prevIsReading) => !prevIsReading);
  };

  return (
    <div className="text-recognition-button-container">
      <button onClick={handleToggleReading}>
        {isReading ? 'Stop Reading' : 'Start Reading'}
      </button>
    </div>
  );
};

export default TextRecognitionButton;
