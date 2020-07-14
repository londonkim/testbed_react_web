import { createAction, handleActions } from 'redux-actions'

// Ducks 패턴으로 리덕스 관리
// 액션 타입
const INCREASE = 'counter/INCREASE'
const DECREASE = 'counter/DECREASE'

// redux-actions로 리덕스 관리 편하게 사용
// createAction을 사용하면 액션 함수들을 쉽게 만들 수 있다. 
// handleActions 사용하면 리듀서 함수도 쉽게 만들 수 있다. 

export const increase = createAction(INCREASE)
export const decrease = createAction(DECREASE)

const initialState = {
    number: 0,
}

const counter = handleActions(
    {
        [INCREASE]: (state, action) => ({ number: state.number + 1}),
        [DECREASE]: (state, action) => ({ number: state.number - 1}),
    },
    initialState
)

export default counter;

// // 액션 생성 함수
// export const increase = () => ({type: INCREASE})
// export const decrease = () => ({type: DECREASE})

// // 초가 값
// const initialState = {
//     number: 1
// }


// // 리듀서 
// function counter(state = initialState, action) {
//     switch (action.type) {
//         case INCREASE:
//             return {
//                 number: state.number + 1
//             }
//         case DECREASE:
//             return {
//                 number: state.number - 1
//             }
//         default:
//             return state
//     }
// }

// export default counter
