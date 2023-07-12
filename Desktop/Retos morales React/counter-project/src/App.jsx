
import React from 'react';
import "./App.css";
import { useCounter } from 'hooks';
  
const App = () => {
    const { value, increment, decrement, incrementBy, 
        decrementBy, reset } = useCounter(1000);
    return (
        <div>
            <p> Counter</p>
            <p> <span>Current value </span>is {value}</p>
            <button onClick={increment}>
                Increment</button><br /><br />
            <button onClick={decrement}>
                Decrement</button><br /><br />
            <button onClick={() => incrementBy(2)}>
                Increase by 2</button><br /><br />
            <button onClick={() => decrementBy(2)}>
                Decrease by 2</button><br /><br />
            <button onClick={reset}>reset</button>
        </div>
    )
}
  
export default App
