import "./App.css";
import useCounter from "./hooks/useCounter";

const App = () => {

    const [count, handleIncrement, handleDecrement, handleReset] = useCounter()
    const [count2, handlePlus, handleMinus, handleReset2] = useCounter(100, 5)

    return (
        <div className="app">
            <h1>{count}</h1>
            <button onClick={handleDecrement}>-1</button>
            <button onClick={handleReset}>reset</button>
            <button onClick={handleIncrement}>+1</button>
            <h1>{count2}</h1>
            <button onClick={handleMinus}>-5</button>
            <button onClick={handleReset2}>reset</button>
            <button onClick={handlePlus}>+5</button>
        </div>
    )
}
  
export default App
