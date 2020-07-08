import React, {useRef, useCallback, useState} from 'react';
import logo from './logo.svg';
import './App.css';

import produce from 'immer'

function App() {
  const nextId = useRef(1)
  const [form, setForm] = useState({ name: '', username: ''})
  const [data, setData] = useState({
    array: [], uselessValue: null
  })

  const onChange = useCallback(
    event => {
      const { name, value } = event.target
      // setForm({
      //   ...form,
      //   [name]: [value]
      // })

      setForm(
        produce(form, draft => {
          draft[name] = value
        })
      )
    }, [form]
  )

  const onSubmit = useCallback(
    event => {
      event.preventDefault()
      const info = {
        id: nextId.current,
        name: form.name,
        username: form.username
      }

      setData({
        ...data,
        array: data.array.concat(info)
      })

      setForm({
        name: '',
        username: '',
      })
      nextId.current += 1

    }, [data, form.name, form.username]
  )

  const onRemove = useCallback(
    id => {
      setData({
        ...data,
        array: data.array.filter(info => info.id !== id)
      })
    },
    [data]
  )

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input name="username" placeholder="ID" value={form.username} onChange={onChange}>
        </input>
        <input name="name" placeholder="이름" value={form.name} onChange={onChange}>
        </input>
        <button type="submit">Register</button>
      </form>

      <div>
        <ul>
          {data.array.map(
            info => (
            <li key={info.id} onClick={() => onRemove(info.id)}> {info.username} ({info.name}) </li>
            )
          )}
        </ul>
      </div>

      
    </div>
  )

  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
}

export default App;
