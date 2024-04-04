// Calculator.jsx

import React, { useState, useEffect, useCallback } from 'react';
import { evaluate } from 'mathjs';
import './App.css'; // Import the CSS file for styling

function Calculator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  
  const handleClick = useCallback((value) => {
    if (value === '=') {
      try {
        setResult(evaluate(input));
    
      } catch (error) {
        setResult('Error');
      }
    } else if (value === 'C') {
      setInput((prevInput) => prevInput.slice(0, -1));
    } else if (value === 'AC') {
      setInput('');
      setResult('');
    } else if (value === '%') {
      setInput(input + '*0.01');
    } else {
      setInput((prevInput) => prevInput + value);
    }
  }, [input]);
  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key;
      if ((key >= '0' && key <= '9') || key === '.' || key === '+' || key === '-' || key === '*' || key === '/' || key === '%'  || key === '^'  ) {
        handleClick(key);
      }
      if(key === '='){
        handleClick(key);
      }
      if(key === 'Backspace'){
          setInput((prevInput) => prevInput.slice(0, -1));
      }
      
      if(key === "c" || key === "C"){
          setInput(' ');
          setResult(' ');
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {

      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [input, handleClick]);

  

  return (
    <div className='container'>
        <div className="calculator-container">
        <div className="calculator">
      <input
        type="text"
        value={input}
        placeholder="Enter expression"
        readOnly
        className="input-field" 
      />
      <div className="buttons">
        
        <button onClick={() => handleClick('7')}>7</button>
        <button onClick={() => handleClick('8')}>8</button>
        <button onClick={() => handleClick('9')}>9</button>
        <button onClick={() => handleClick('/')}>/</button>
        <button onClick={() => handleClick('4')}>4</button>
        <button onClick={() => handleClick('5')}>5</button>
        <button onClick={() => handleClick('6')}>6</button>
        <button onClick={() => handleClick('*')}>*</button>
        <button onClick={() => handleClick('1')}>1</button>
        <button onClick={() => handleClick('2')}>2</button>
        <button onClick={() => handleClick('3')}>3</button>
        <button onClick={() => handleClick('-')}>-</button>
        <button onClick={() => handleClick('0')}>0</button>
        <button onClick={() => handleClick('.')}>.</button>
        <button onClick={() => handleClick('=')}>=</button>
        <button onClick={() => handleClick('+')}>+</button>
        <button onClick={() => handleClick('C')}>C</button>
        <button onClick={() => handleClick('AC')}>AC</button>
        <button onClick={() => handleClick('%')}>%</button>
        <button onClick={() => handleClick('^')}>^</button>
      </div>
      <div className="result">Result: {result}</div>
    </div>
    </div>
    </div>
  );
}

export default Calculator;
