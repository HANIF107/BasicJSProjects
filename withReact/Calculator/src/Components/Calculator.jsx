import React, { useState } from 'react'
import './Calculator.css';

const Calculator = () => {
    const [input, setInput] = useState('');
    const handleClick = (value) =>{
        setInput((prev) => prev+value);
    }

    const clearInput = () =>{
        setInput('');
    }
    
    const handleEval = () => {
        try{
            setInput(eval(input).toString())
        }catch(error){
            setInput('Error')
        }
    }

    const handleDelete = () =>{
        setInput((prev) => prev.length === '1' ? "0" : prev.slice(0, -1));
    }
  return (
    <div>
        <h2>Calculator</h2>
      <div className="calculator">
        <input type="text" value={input} className='inputBox' readOnly/>

        {/* Buttons */}
        <div className="buttons">
            <button onClick={clearInput} className='clear'>AC</button>
            <button onClick={handleDelete} className='delete'>DEL</button>
            <button onClick={()=> handleClick('%')} className='operator'>%</button>
            <button onClick={()=> handleClick('/')} className='operator'>/</button>
        </div>

        <div className='buttons'>
            <button onClick={()=> handleClick('7')}>7</button>
            <button onClick={()=> handleClick('8')}>8</button>
            <button onClick={()=> handleClick('9')}>9</button>
            <button onClick={()=> handleClick('*')} className='operator'>*</button>
        </div>

         <div className='buttons'>
            <button onClick={()=> handleClick('4')}>4</button>
            <button onClick={()=> handleClick('5')}>5</button>
            <button onClick={()=> handleClick('6')}>6</button>
            <button onClick={()=> handleClick('+')} className='operator'>+</button>
        </div>

        <div className='buttons'>
            <button onClick={()=> handleClick('1')}>1</button>
            <button onClick={()=> handleClick('2')}>2</button>
            <button onClick={()=> handleClick('3')}>3</button>
            <button onClick={()=> handleClick('-')} className='operator'>-</button>
        </div>
        
        <div className='buttons'>
            <button onClick={()=> handleClick('00')}>00</button>
            <button onClick={()=> handleClick('0')}>0</button>
            <button onClick={()=> handleClick('.')}>.</button>
            <button onClick={handleEval} className='equalBtn'>=</button>
        </div>
      </div>
    </div>
  )
}

export default Calculator
