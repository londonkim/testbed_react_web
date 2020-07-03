import React, { useState, useMemo, useCallback, useRef } from 'react'


const getAverage = numbers => {
    console.log('평균값 계산중')
    if (numbers.length === 0) return 0;
    const sum = numbers.reduce((a, b) => a + b)
    return sum / numbers.length;
}

const Average = () => {
    const [list, setList] = useState([])
    const [number, setNumber] = useState('')
    const inputE1 = useRef(null)

    // const onChange = event => {
    //     setNumber(event.target.value)
    // }

    const onChange = useCallback(event => {
        setNumber(event.target.value)
    }, [])  // 컴퍼넌트가 처음 랜더릴 때만 함수 생성
    
    // const onInsert = e => {
    //     const nextList = list.concat(parseInt(number))
    //     setList(nextList)
    //     setNumber('')
    // }
    
    const onInsert = useCallback ( () => {
        const nextList = list.concat(parseInt(number))
        setList(nextList)
        setNumber('')
        inputE1.current.focus()
    }, [number, list]) // number 혹은 list가 바뀌었을 떄만 함수 생성

    
    const avg = useMemo(() => getAverage(list), [list])

    return (
        <div>
            <input value={number} onChange={onChange} ref={inputE1}></input>
            <button onClick={onInsert}> 등록 </button>

            <ul>
                {list.map((value, index) => (
                    <li key={index}>{value}</li>
                ))}
            </ul>
            <div>
                {/* 평균값 : {getAverage(list)} */}
                평균값 : {avg}
            </div>
        </div>
    )
}


export default Average

