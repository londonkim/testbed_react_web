console.log('hello')


const divToggle = document.querySelector('.toggle')
const counter = document.querySelector('h1')
const btnIncrease = document.querySelector('#increase')
const btnDecrease = document.querySelector('#decrease')

// 액션 타입 (1)
const TOGGLE_SWITCH = 'TOGGLE_SWITCH'
const INCREASE = 'INCREASE'
const DECREASE = 'DECREASE'

// 액션 생성 함수 (2)
const toggleSwitch = () => ({ type: TOGGLE_SWITCH })
const increase = difference => ({ type: INCREASE, difference })
const decrease = () => ({ type: DECREASE })

// 초기 상태 값 (3)
const initialState = {
    toggle: false,
    counter: 0
}

// 리듀서 정의 (4)
function reducer(state = initialState, action) {
    switch(action.type) {
        case TOGGLE_SWITCH:
            return {
                ...state,
                toggle: !state.toggle
            }
        case INCREASE:
            return {
                ...state,
                counter: state.counter + action.difference 
            }
        case DECREASE:
            return {
                ...state,
                counter: state.counter - 1
            }
        default:
            return state

    }
}

// 스토어 생성 (5)
import { createStore } from 'redux'

const store = createStore(reducer)

const render = () => {
    const state = store.getState()  // 현재 상태를 불러온다.

    if (state.toggle) {
        divToggle.classList.add('active')
    } else {
        divToggle.classList.remove('active')
    }

    counter.innerHTML = state.counter
}


render()
// 구독하기 (6)
store.subscribe(render)  // 상태가 바뀔 때마다 render 함수 호출

divToggle.onclick = () => {
    store.dispatch(toggleSwitch())
}

btnIncrease.onclick = () => {
    store.dispatch(increase(1))
}

btnDecrease.onclick = () => {
    store.dispatch(decrease())
}