import React from 'react';
import logo from './logo.svg';
import './App.css';
import MyComponent from './MyComponent'
import EventPractice from './EventPractice'
import ValidationSample from './ValidationSample'
import IterationSample from './IterationSample'

import Counter from './Counter'

import Info from './Info'

import Average from './Average'
import SassComponent from './SassComponent';

function App() {
  return (
    <div>
      <h1>dfdf</h1>
      <MyComponent name='aaa' favoriateNumber={3}>호출하는 곳에서 태그사이 내용</MyComponent>
      <EventPractice />
      <ValidationSample></ValidationSample>
      <IterationSample></IterationSample>
      <Counter></Counter>
      <Info></Info>
      <Average></Average>
      <SassComponent></SassComponent>
    </div>
  );

  // return <>
  //   <EventPractice />
  //   </>
}

export default App;
