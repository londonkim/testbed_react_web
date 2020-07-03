import React, { useState } from 'react';
// import React from 'react'

// const EventPractice = () => {
//     const [username, setUsername] = useState('')
//     const [message, setMessage] = useState('')
//     const onChangeUsername = e => setUsername(e.target.value)
//     const onChangeMessage = e => setMessage(e.target.value)

//     const onClick = () => {
//         alert(username + ' : ' + message)
//         setUsername('')
//         setMessage('')
//     }

//     const onKeyPress = e => {
//         if (e.key === 'Enter') {
//             onClick()
//         }
//     }

//     return (
//         <div>
//             <h1>이벤트 연습하기</h1>
//             <input type="text" name="username" value={username} onChange={onChangeUsername}></input>
//             <input type="text" name="message" value={message} onChange={onChangeMessage} onKeyPress={onKeyPress}></input>
//             <button onClick={onClick}>확인</button>
//         </div>
//     )
// }

// export default EventPractice


const EventPractice = () => {
    const [form, setForm] = useState({
        username: '',
        message: ''
    })

    const { username, message } = form;

    const onChange = e => {
        const nextForm = {
            ...form,
            [e.target.name]: e.target.value
        }
        setForm(nextForm)
    }

    const onClick = () => {
        alert(username + ' : ' + message)
        setForm({
            username: '',
            message: ''
        })
    }

    const onKeyPress = e => {
        if (e.key === 'Enter') {
            onClick()
        }
    }

    return (
        <div>
            <h1>이벤트 연습하기</h1>
            <input type="text" name="username" value={username} onChange={onChange}></input>
            <input type="text" name="message" value={message} onChange={onChange} onKeyPress={onKeyPress}></input>
            <button onClick={onClick}>확인</button>
        </div>
    )
}

export default EventPractice
