// src/Callback/Callback.js

import React, { Component } from 'react';
import LoadingOverlay from '../LoadingOverlay';
import Auth from '../../services/Auth.js';
import { Redirect } from 'react-router-dom';

class Callback extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('this.state', this.state); // TODO --DM-- Remove
    console.log('this.props', this.props); // TODO --DM-- Remove

    return (
      <div className="callback-container">
         <Redirect to="/home"/>
      </div>
    );
  }
}

export default Callback;