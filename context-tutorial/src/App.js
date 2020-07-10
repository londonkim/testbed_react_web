import React from 'react';
import logo from './logo.svg';
import './App.css';
import ColorBox from './components/ColorBox';
import{ ColorProvider } from './contexts/color'

function App() {
  return (
    <ColorProvider>
      <div className="App">
        <ColorBox></ColorBox>
      </div>
    </ColorProvider>
  );
}

export default App;
