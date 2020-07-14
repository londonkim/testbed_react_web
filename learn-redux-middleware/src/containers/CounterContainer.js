import React from 'react'
import { connect } from 'react-redux'
import { increase, decrease, increaseAsync, decreaseAsync } from '../modules/counter'
import Counter  from '../components/Counter'

const CounterContainer = ( {number, increaseAsync, decrease}) => {
    return (
        <Counter number={number} onIncrase={increaseAsync} onDecrease={decrease}></Counter>
    )
}

export default connect(
    state => ({
        number: state.counter
    }),
    {
        increaseAsync,
        decrease,
    }
)(CounterContainer)