import React from 'react'

const TodoItem = ({ todo, onToggle, onRemove }) => {
    return (
        <div>
            <input type="checkbox" onClick={()=>onToggle(todo.id)} checked={todo.done} readOnly={true} />
            <span>{todo.text}</span>
            <button onClick={() => onRemove(todo.id)}>Delete</button>
        </div>
    )
}

const Todos = ({
    input,
    todos,
    onChangeInput,
    onInsert,
    onToggle,
    onRemove
}) => {
    const onSubmit = event => {
        console.log('onSubmit')
        event.preventDefault();
        onInsert(input)
        onChangeInput('')
    
    };

    const onChange = event => onChangeInput(event.target.value)

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={input} onChange={onChange}/>
                <button type="submit">등록</button>
            </form>
            <div>
                {todos.map(todo => (
                    <TodoItem todo={todo} key={todo.id} onToggle={onToggle} onRemove={onRemove}>
                    </TodoItem>
                ))}
            </div>
        </div>
    )
}

export default Todos;