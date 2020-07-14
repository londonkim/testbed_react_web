import React from 'react'

const Counter = ({ onIncrase, onDecrease, number}) => {
    return (
        <div>
            <h1>{number}</h1>
            <button onClick={onIncrase}> +1 </button>
            <button onClick={onDecrease} > -1 </button>
        </div>
    )
}

export default Counter
