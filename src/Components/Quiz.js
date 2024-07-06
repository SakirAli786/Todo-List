import React, { useRef, useState } from 'react';
import './Quiz/Quiz.css';
import { data } from '../assets/data';

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);

  const option1 = useRef(null);
  const option2 = useRef(null);
  const option3 = useRef(null);
  const option4 = useRef(null);

  const optionArray = [option1, option2, option3, option4];
  const question = data[index];

  const checkAns = (e, ans) => {
    if (!lock) {
      if (question.answer === ans) {
        e.target.classList.add("correct");
        setScore(prev => prev + 1);
      } else {
        e.target.classList.add("wrong");
        optionArray[question.answer].current.classList.add("correct");
      }
      setLock(true);
    }
  };

  const next = () => {
    if (lock) {
      if (index === data.length - 1) {
        setResult(true);
      } else {
        setIndex(prev => prev + 1);
      }
      setLock(false);
      optionArray.forEach(option => {
        option.current.classList.remove("wrong", "correct");
      });
    }
  };

  const reset = () => {
    setIndex(0);
    setScore(0);
    setLock(false);
    setResult(false);
  };

  return (
    <div className='container'>
      <h1>Quiz App</h1>
      <hr />
      {result ? (
        <div>
          <h2>You Scored {score} out of {data.length}</h2>
          <button onClick={reset}>Reset</button>
        </div>
      ) : (
        <div>
          <h2>{index + 1}. {question.question}</h2>
          <ul>
            <li ref={option1} onClick={(e) => { checkAns(e, 0) }}>{question.options[0]}</li>
            <li ref={option2} onClick={(e) => { checkAns(e, 1) }}>{question.options[1]}</li>
            <li ref={option3} onClick={(e) => { checkAns(e, 2) }}>{question.options[2]}</li>
            <li ref={option4} onClick={(e) => { checkAns(e, 3) }}>{question.options[3]}</li>
          </ul>
          <button onClick={next}>Next</button>
          <div className="index">{index + 1} of {data.length} questions</div>
        </div>
      )}
    </div>
  );
}

export default Quiz;
