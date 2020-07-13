import React from 'react'
import Counter from '../components/Counter'
import { increase, decrease } from '../modules/counter'

import { connect } from 'react-redux'

// 컴포넌트를 리덕스와 연동할려면 react-redux에서 제공하는 connect 함수를 사용해야한다
// connect(mapStateToProps, mapDispatchToProps)

const CounterContainer = ({number, increase, decrease}) => {
    return <Counter number={number} onIncrease={increase} onDecrease={decrease} />
}


const mapStateToProps = state => ({
    number: state.counter.number
});

const mapDispatchToProps = dispatch => ({
    increase: () => {
        console.log('increase')
        dispatch(increase())
    },
    decrease: () => {
        console.log('decrase')
        dispatch(decrease())
    }
})

// export default CounterContainer
// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(CounterContainer) // 이게 기본

// bindActionCreators 사용 방법 453페이지

export default connect(
    state => ({
        number: state.counter.number
    }),
    {
        increase,
        decrease,
    }
)(CounterContainer)  // 두 번째 파라미터를 아예 객체 형태로 넣어주면 connect함수가 내부적으로 bindActionCreators 작업을 대신해 준다.