import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


import { observer, PropTypes } from 'mobx-react';
import _ from 'lodash';

import Profile from './components/Profile';
import Selection from './components/Selection';


const propTypes = {
  store: PropTypes.object
};


@observer
class App extends Component {

  componentWillMount() {
    this.props.store.getUsers();
  }

  renderProfiles() {
    return this.props.store.users.map((user) => (
      <Profile 
        selected={user.id === this.props.store.selectedId}
        key={user.id}
        label={user.name}
        onClick={() => {this.props.store.selectUser(user)}}
      />
    ));
  }

  renderSelection() {
    if (_.isEmpty(this.props.store.selectedUser)) return null;
    return (
      <div className="selection">
        <Selection user={this.props.store.selectedUser} />
        <button onClick={this.props.store.clearSelectedUser}>Close Profile</button>
      </div>
    );
  }

  render() {
    return (
      <div>
        <h3>Employee Directory</h3>
        { this.renderSelection() }
        { this.renderProfiles() }
      </div>
    );
  }


}

App.propTypes = propTypes;


export default App;
