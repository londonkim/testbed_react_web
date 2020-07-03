import React, {useState, useCallback} from 'react'
import { MdAdd } from 'react-icons/md'
import './TodoInsert.scss'

const TodoInsert = ({ onInsert }) => {


    const [value, setValue] = useState('')

    const onChange = useCallback(e => {
        setValue(e.target.value)
    }, [])

    const onSubmit = useCallback(
        e => {
            onInsert(value)
            setValue('')

            // submit 이벤트는 브라우저에서 새로고침을 발생 시킴, 이를 방지하고자 ..
            e.preventDefault()
        }, [onInsert, value]
    )

    return (
        <div>
            <form className="TodoInsert" onSubmit={onSubmit}>
                <input placeholder="insert todo" value={value} onChange={onChange} >
                </input>
                <button type="submit">
                    <MdAdd />
                </button>
            </form>
        </div>
    )
}

export default TodoInsert