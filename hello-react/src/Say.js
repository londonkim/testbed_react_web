import React, { useState } from 'react'

const Say = () => {
    const [message, setMessage] = useState('')  // 첫번째는 현재 상태이고, 두번째는 원소는 상태를 바꾸어주는 함수(setter)
    const onClickEnter = () => {
        setMessage('hihihi')
        setObject({a:2, b:2})
    }
    const onClickLeave = () => setMessage('bye')

    const [color, setColor] = useState('black')

    const [object, setObject] = useState({a: 1, b: 1})

    return (
        <div>
            <button onClick={onClickEnter}>입장</button>
            <button onClick={onClickLeave}>퇴장</button>
            <h1>{message}</h1>
            <h1>{color}</h1>
            <h1>{object.a}</h1>

            <button style={{color: 'red'}} onClick={() => setColor('red')}>
                RED
            </button>
        </div>
    )
}

export default Say