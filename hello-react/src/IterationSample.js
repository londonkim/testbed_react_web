import React, { useState, useEffect } from 'react'

const IterationSample = () => {

    // const names = ['눈 사람', '얼음']
    const [names, setNames] = useState([
        { id: 1, text: 'snow1' },
        { id: 2, text: 'snow2' },
        { id: 3, text: 'snow3' },
        { id: 4, text: 'snow4' },
    ])

    const [inputText, setInputText] = useState('')
    const [nextId, setNextId] = useState(5)

    const onChange = event => setInputText(event.target.value)
    const onClick = () => {
        const nextNames = names.concat({
            id: nextId,
            text: inputText
        })

        setNextId(nextId + 1)
        setNames(nextNames)
        setInputText('')
    }
    const onRemove = id => {
        const nextNames = names.filter(name => name.id !== id)
        setNames(nextNames)
    }

    useEffect(() => {
        console.log('렌더링이 완료되었습니다!')  // componentDidMount, componentDidUpdate 합친형태
    })

    useEffect(() => {
        console.log('마운트될 때만 실행')  // componentDidMount, componentDidUpdate 합친형태
    }, [])

    useEffect(() => {
        console.log('변경되었습니다. ' + inputText)

        return () => {
            console.log('clean up ' + inputText)  // 언마운트 되기 전이나 업데이트 되기 직전에 어떠한 작업을 수행하고 싶으면..
        }
    }, [inputText])



    return <div>
        <ul>
        <input value={inputText} onChange={onChange}></input>
        <button onClick={onClick}> 추가 </button>
        {names.map((name) => <li key={name.id} onDoubleClick={() => onRemove(name.id)}>{name.text}</li>)}
        </ul>
    </div>
}

export default IterationSample