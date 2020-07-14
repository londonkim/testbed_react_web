import React from 'react';
import logo from './logo.svg';
import './App.css';
import CounterContainer from './containers/CounterContainer';
import SampleContainer from './containers/SampleContainer';

function App() {
  return (
    <div className="App">
      <CounterContainer></CounterContainer>
      <br>
      </br>
      <SampleContainer></SampleContainer>
    </div>
  );
}

export default App;
