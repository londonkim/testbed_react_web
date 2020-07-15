import React from 'react';
import logo from './logo.svg';
import './App.css';
import DemoReactCanvas from './components/DemoReactCanvas'
import DemoReactArt from './components/DemoReactArt'
import DemoReactKonva from './components/DemoReactKonva'
import DemoReactKonvaTransForm from './components/DemoReactKonvaTransForm'

function App() {
  return (
    <div className="App">
      <DemoReactKonvaTransForm></DemoReactKonvaTransForm>
      {/* <DemoReactKonva></DemoReactKonva> */}
    </div>
  );
}

export default App;
