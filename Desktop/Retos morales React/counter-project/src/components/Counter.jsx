import { useState } from 'react'

const Counter = () => {

    const [ counter, setCounter ] = useState(0)

    // console.log( counter )

    const incrementCounter = () => {
        setCounter( counter + 1 )
    }

    const decrementCounter = () => {
        if ( counter > 0 ) setCounter( counter - 1)
    }

    const resetCounter = () => {
        setCounter(0)
    }

    return (
        <div>
            <h2>Valor Actual: { counter }</h2>
            <button onClick={decrementCounter}>Decremento</button>
            <button onClick={incrementCounter}>Incremento</button>
            <button onClick={resetCounter}>Resetear</button>
        </div>
    )
}

export default Counter