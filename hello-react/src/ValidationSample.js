import React, { useState } from 'react';
import './ValidationSample.css'

const ValidationSample = () => {

    const input = React.createRef()

    const [form, setForm] = useState({
        password: '',
        clicked: false,
        validated: false
    })

    const {password, clicked, validated} = form

    const handleChange = (event) => {
        const nextForm = {
            ...form,
            password: event.target.value
        }
        console.log(nextForm)
        setForm(nextForm)
    }

    const handleButtonClick = () => {
        const nextForm = {
            ...form,
            clicked: true,
            validated: password === '0000'
        }
        console.log(nextForm)

        setForm(nextForm)
        input.current.focus()
    }

    return (
        <div>
            <div className='success'>ddd</div>
            <input ref={input} type="password" value={password} onChange={handleChange} className={clicked ? (validated ? 'success': 'failure') : ''}></input>
            <button onClick={handleButtonClick}>Verify</button>
        </div>
    )
}

export default ValidationSample