import "./styles.css";
import React, { useState, useEffect, useRef } from "react";

export default function App() {
  const START_TIME = 15;

  const [text, setText] = useState("");
  const [isTimeRunning, setTimeRunning] = useState(false);
  const [timeRemaining, setTime] = useState(START_TIME);
  const [words, setWordCount] = useState(0);
  const textRef = useRef(null);

  function handleChange(event) {
    const { value } = event.target;
    setText(value);
  }

  function wordCount(text) {
    const wordArr = text.trim().split(" ");
    return wordArr.filter((word) => word !== "").length;
  }

  useEffect(() => {
    if (isTimeRunning && timeRemaining > 0) {
      setTimeout(() => {
        setTime((prevtime) => prevtime - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      end();
    }
  }, [timeRemaining, isTimeRunning]);

  function start() {
    setTimeRunning(true);
    setTime(START_TIME);
    setText("");
    textRef.current.disabled = false;
    textRef.current.focus();
  }

  function end() {
    setTimeRunning(false);
    setWordCount(wordCount(text));
  }

  return (
    <div className="App">
      <h1>How fast do you type? </h1>
      <textarea
        ref={textRef}
        onChange={handleChange}
        value={text}
        disabled={!isTimeRunning}
      />
      <h4>Time remaining:{timeRemaining} </h4>
      <button onClick={start} disabled={isTimeRunning}>
        Start
      </button>
      <h1>Word Count: {words}</h1>
    </div>
  );
}
