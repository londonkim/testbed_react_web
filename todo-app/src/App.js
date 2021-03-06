import React, {useState, useRef, useCallback} from 'react';
import logo from './logo.svg';
import './App.css';

import TodoTemplate from './components/TodoTemplate'
import TodoInsert from './components/TodoInsert'
import TodoList from './components/TodoList'


function createBulkTodos() {
  let array = []
  for (let i = 1; i <= 2500; i++) {
    array.push({
      id: i,
      text: `할일 ${i}`,
      checked: false
    })
  }
  return array
}

function App() {

  // const [todos, setTodos] = useState([
  //   {
  //     id: 1,
  //     text: '리액트의 기초 알아보기',
  //     checked: false,
  //   },
  //   {
  //     id: 2,
  //     text: '컴퍼넌트323',
  //     checked: true
  //   },
  //   {
  //     id: 3,
  //     text: '컴퍼넌트 스타일링해 보기',
  //     checked: true
  //   },
  //   {
  //     id: 4,
  //     text: '일정관리 앱 만들기',
  //     checked: false
  //   }
  // ])

  const [todos, setTodos] = useState(createBulkTodos)  // 파라미터를 함수형태로 넣어주면 컴포넌트가 처음 렌더링 될 떄만 createBulkTodos 함수가 호출 createBulkTodos() 작성하면 리렌더링 될 때마다 호출

  const nextId = useRef(todos.length)

  // const onInsert = useCallback(text => {
  //   const todo = {
  //     id: nextId.current,
  //     text,
  //     checked: false
  //   }
  //   setTodos(todos.concat(todo))
  //   nextId.current += 1
  // }, [todos])

  const onInsert = useCallback(text => {
    const todo = {
      id: nextId.current,
      text,
      checked: false
    }
    setTodos(todos => todos.concat(todo))
    nextId.current += 1
  }, [])


  // const onRemove = useCallback(id => {
  //   setTodos(todos.filter(todo => todo.id !== id))
  // }, [todos])

  const onRemove = useCallback(id => {
    setTodos(todos.filter(todo => todo.id !== id))
  }, [])



  return (
    // <div className="App">
    //   todo app
    // </div>
    <TodoTemplate>
      <TodoInsert onInsert={onInsert}></TodoInsert>
      <TodoList todos={todos} onRemove={onRemove}></TodoList>
    </TodoTemplate>
  );
}

export default App;
