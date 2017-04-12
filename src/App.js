import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import NodeSearch from './components/NodeSearch.js';
import ApixNode from './components/ApixNode.js';
import ApixTemplate from './components/ApixTemplate.js';
// import ApixNodeBuilder from './components/ApixNodeBuilder.js';
import NodeBuilderContainer from './containers/NodeBuilderContainer.js';
import NodePopulatorContainer from './containers/NodePopulatorContainer.js';
import IMDbClone from './IMDbClone.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      styleIndex: 1,
      pageIndex: 2,
    };
  }

  render() {
    var partial;
    if (this.state.styleIndex === 0) {
      partial = <IMDbClone />;
    } else {
      partial = <AppBoilerplate pageIndex={this.state.pageIndex} />;
    }
    
    return (
      <div className="App">
        {/*<Navbar pageIndex={this.state.pageIndex} />*/}
        {partial}
      </div>
    );
  }
}

/*class Navbar extends Component {
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
}*/

class AppBoilerplate extends Component {
  render() {
    var partial;
    console.log('App.js pageIndex: ', this.props.pageIndex);
    if (this.props.pageIndex === 0) {
      partial = <ApixNode />;
    } else if (this.props.pageIndex === 1) {
      partial = <ApixTemplate />;
    } else if (this.props.pageIndex === 2) {
      partial = <NodeBuilderContainer />;
    } else if (this.props.pageIndex === 3) {
      partial = <NodePopulatorContainer />;
    } else {
      partial = <NodeSearch />;
    }

    return (
        <div id="App-container">
          {partial}
        </div>
    );
  }
}

              /*<div>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React!</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>*/

export default App;
