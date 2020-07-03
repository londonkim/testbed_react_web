import React, { useReducer } from 'react'

function reducer(state, action) {
    return {
        ...state,
        [action.name]: action.value
    }
}

const Info = () => {
    const [state, dispatch] = useReducer(reducer, {
        name: '',
        nickname: '',
    })

    const { name, nickname } = state;

    const onChange = event => {
        dispatch(event.target)
    }

    return (
        <div>
            <div>
                <input name="name" value={name} onChange={onChange}></input>
                <input name="nickname" value={nickname} onChange={onChange}></input>
            </div>

            <div>
                이름: {name} 
            </div>
            <div>
                닉네임: {nickname}
            </div>
        </div>
    )
}

export default Info