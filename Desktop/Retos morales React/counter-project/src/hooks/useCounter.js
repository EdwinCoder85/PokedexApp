import { useState } from "react"

const useCounter = (initialState = 0, changeValue = 1) => {

    const [count, setCount] = useState(initialState)

    const handleIncrement = () => {
        setCount(count + changeValue)
    }

    const handleDecrement = () => {
        setCount(count - changeValue)
    }

    const handleReset = () => {
        setCount(initialState)
    }

    return [count, handleIncrement, handleDecrement, handleReset]

}

export default useCounter