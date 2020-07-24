import React from 'react';
import logo from './logo.svg';
import './App.css';
import Counter from './components/Counter';
import NameForm from './components/NameForm'
import NameList from './components/NameList'

class App extends React.Component {
  state = {
    names: ['벨로퍼트', '김민준']
  }

  onInsert = (name) => {
    this.setState(({names}) => ({ names: names.concat(name) }));
  }

  render() {
    const { names } = this.state;
    const { onInsert } = this;

    return (
      <div>
        <Counter />
        <hr />
        <h1>이름 목록</h1>
        <NameForm onInsert={onInsert}/>
        <NameList names={names}/>
      </div>
    );
  }
}

export default App;
