import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
import './TranslateApp.css';

// Import SpeechRecognitionButton and TextRecognitionButton
import SpeechRecognitionButton from '../speechrecognition/SpeechRecognitionButton';
import TextRecognitionButton from '../speechrecognition/TextRecognitionButton';

const TranslateApp = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [fromLanguage, setFromLanguage] = useState('English');
  const [toLanguage, setToLanguage] = useState('French');
  const [error, setError] = useState(null);

  const API_KEY = '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';

  const readTranslatedText = (text) => {
    const speechConfig = sdk.SpeechConfig.fromSubscription('e610c5256e454c409438ad76646353dd', 'uksouth');
    const audioConfig = sdk.AudioConfig.fromDefaultSpeakerOutput();
    const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

    synthesizer.speakTextAsync(
      text,
      (result) => {
        if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
          console.log('Speech synthesis is complete.');
        }
      },
      (error) => {
        console.error('Error synthesizing speech:', error);
      }
    );
  };

  useEffect(() => {
    const subscriptionKey = 'e610c5256e454c409438ad76646353dd';
    const serviceRegion = 'uksouth';
    const speechConfig = sdk.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);
    const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
    const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

    recognizer.recognizing = (s, e) => {
      console.log(`RECOGNIZING: ${e.result.text}`);
    };

    recognizer.recognized = (s, e) => {
      if (e.result.reason === sdk.ResultReason.RecognizedSpeech) {
        console.log(`RECOGNIZED: ${e.result.text}`);
        setInputText(e.result.text);
      } else {
        console.log('No speech could be recognized');
      }
    };

    recognizer.startContinuousRecognitionAsync();

    return () => {
      recognizer.close();
    };
  }, []);

  const translateText = async () => {
    try {
      setError(null);
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          messages: [
            {
              role: 'user',
              content: `Translate the following ${fromLanguage} text into ${toLanguage}: "${inputText}"`,
            },
            { role: 'assistant', content: 'translate' },
          ],
          max_tokens: 500,
          model: 'gpt-3.5-turbo',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );

      const text = response.data.choices && response.data.choices[0] ? response.data.choices[0].message.content : 'Translation not available';
      setTranslatedText(text);

      text && readTranslatedText(text);
    } catch (error) {
      console.error('Error translating text: ', error.response.data);
      setError('Error translating text. Please try again.');
    }
  };

  const startReading = () => {
    translatedText && readTranslatedText(translatedText);
  };

  const startListening = () => {
    const subscriptionKey = 'e610c5256e454c409438ad76646353dd';
    const serviceRegion = 'uksouth';
    const speechConfig = sdk.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);
    const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
    const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

    recognizer.recognizing = (s, e) => {
      console.log(`LISTENING: ${e.result.text}`);
    };

    recognizer.recognized = (s, e) => {
      if (e.result.reason === sdk.ResultReason.RecognizedSpeech) {
        console.log(`RECOGNIZED: ${e.result.text}`);
        setInputText(e.result.text);
      } else {
        console.log('No speech could be recognized');
      }
    };

    recognizer.startContinuousRecognitionAsync();

    return () => {
      recognizer.close();
    };
  };

  return (
    <div className="translation-container">
      <h1 className="title">Ryan Translate</h1>
      <div className="dropdown-container">
        <select
          value={fromLanguage}
          onChange={(e) => setFromLanguage(e.target.value)}
          className="dropdown"
        >
          <option value="English">English</option>
          <option value="French">French</option>
          <option value="German">German</option>
          <option value="Hindi">Hindi</option>
        </select>
        <select
          value={toLanguage}
          onChange={(e) => setToLanguage(e.target.value)}
          className="dropdown"
        >
          <option value="English">English</option>
          <option value="French">French</option>
          <option value="German">German</option>
          <option value="Hindi">Hindi</option>
        </select>
      </div>
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter text to translate..."
        className="input"
      ></textarea>
      <SpeechRecognitionButton setUserInput={setInputText} readText={readTranslatedText} />
      <TextRecognitionButton inputText={inputText} translatedText={translatedText} />
      <button className="button" onClick={translateText}>
        Translate
      </button>
      <div className="translated-text-container">
        <p className="text">{translatedText}</p>
      </div>
    </div>
  );
};

export default TranslateApp;
