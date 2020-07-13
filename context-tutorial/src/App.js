import React from 'react';
import logo from './logo.svg';
import './App.css';
import ColorBox from './components/ColorBox';
import{ ColorProvider } from './contexts/color'
import SelectColors from './components/SelectColors';

function App() {
  return (
    <ColorProvider>
      <div className="App">
        <SelectColors></SelectColors>
        <ColorBox></ColorBox>
      </div>
    </ColorProvider>
  );
}

export default App;
