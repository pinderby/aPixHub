import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './components';
import IMDbClone from './IMDbClone.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      pageIndex: 1,
    };
  }

  render() {
    var partial;
    if (this.state.pageIndex === 0) {
      partial = <IMDbClone />;
    } else {
      partial = <AppBoilerplate />;
    }
    
    return (
      <div className="App">
        <Navbar />
        {partial}
      </div>
    );
  }
}

class Navbar extends Component {
  handleClick() {
    console.log('handleClick()');
  }
  render() {
    return (
      <ul className="nav nav-pills nav-justified">
        <li role="presentation" className=""><a href="#">Wiki-clone</a></li>
        <li role="presentation" className="active"><a href="#" onClick={() => this.handleClick()}>IMDb-clone</a></li>
        <li role="presentation"><a href="#">Yelp-clone</a></li>
      </ul>
    );
  }
}

class AppBoilerplate extends Component {
  render() {
    return (
      <div>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React!</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div id="App-container">
          
        </div>
      </div>
    );
  }
}

export default App;
