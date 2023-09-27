import React, { useState } from "react";
import "./App.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import useClipboard from "react-use-clipboard";

const App = () => {
  const [textToCopy, setTextToCopy] = useState("");
  const [isCopied, setCopied] = useClipboard(textToCopy, {
    successDuration: 1000,
  });
  const { transcript, browserSupportsSpeechRecognition, listening } =
    useSpeechRecognition();

  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });

  const stopListening = () => {
    SpeechRecognition.stopListening();
    setTextToCopy(transcript);
  };

  const handleButtonClick = () => {
    if (!listening) {
      startListening();
    } else {
      stopListening();
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="error">
        Speech recognition is not supported in this browser.
      </div>
    );
  }

  return (
    <div className="container">
      <h2 className="heading">Speech to Text Converter</h2>
      <p className="description">
        An application leverages the 'react-speech-recognition' hook to
        transcribe microphone speech to text and utilizes the
        'react-use-clipboard' hook for seamless text copying to the clipboard.
      </p>

      <div className="main-content">
        {listening ? (
          <div className="listening">
            Listening... <br />
            {transcript}
          </div>
        ) : (
          <div className="content" onClick={setCopied}>
            {transcript}
          </div>
        )}
      </div>

      <div className="btn-style">
        <button
          className={`action-button ${listening ? "listening-button" : ""}`}
          onClick={handleButtonClick}
        >
          {listening ? "Stop Listening" : "Start Listening"}
        </button>
        <button
          className={`action-button ${isCopied ? "copied-button" : ""}`}
          onClick={() => setCopied(transcript)}
        >
          {isCopied ? "Copied!" : "Copy to clipboard"}
        </button>
      </div>
      <p className="copyright">Developed by Vishes Keshari</p>
    </div>
  );
};

export default App;
