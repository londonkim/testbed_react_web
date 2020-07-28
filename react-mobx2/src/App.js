import React from 'react';
import logo from './logo.svg';
import './App.css';

import { observer, inject } from "mobx-react";

@inject("yourstore")
@observer
export default class App extends React.Component {
  render() {
    return (
      <div>
        <div>value = {this.props.yourstore.yourStore}</div>
        <div>
          <button onClick={this.props.yourstore.changeToWorld}>
            Change to world
          </button>
        </div>
      </div>
    );
  }
}
