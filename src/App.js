import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { Route, Link, Redirect } from 'react-router-dom';
import ReduxThunk from 'redux-thunk';
import NodeInstanceContainer from './containers/NodeInstanceContainer.js';
import NodeTemplateContainer from './containers/NodeTemplateContainer.js';
import TemplateSearchContainer from './containers/TemplateSearchContainer.js';
import TemplateBuilderContainer from './containers/TemplateBuilderContainer.js';
import NodePopulatorContainer from './containers/NodePopulatorContainer.js';
import NodeSearchContainer from './containers/NodeSearchContainer.js';
import IMDbClone from './IMDbClone.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      styleIndex: 1,
      pageIndex: 4,
    };
  }

  render() {
    let label;
    if(this.props.nodeTemplate.label) label = this.props.nodeTemplate.label;
    else label = 'movie';

    return (
      <div className="App">
        <ul className="nav nav-tabs">
          <li role="presentation"><Link to="/templates">TemplateRender</Link></li>
          {/*<li role="presentation"><Link to="/movie/edit">TemplateBuilder</Link></li>*/}
          <li role="presentation"><Link to={"/n/"+label+"/add"}>NodePopulator</Link></li>
          <li role="presentation"><Link to={"/n/"+label+"/search"}>NodeSearch</Link></li>
          {/*<li role="presentation"><Link to={"/"+label+"/0"}>NodeRender</Link></li>*/}
        </ul>
        <div id="App-container">
          <Route exact path="/" render={() => (
            <Redirect from="/" to="/templates"/>
          )}/>
          <Route exact path="/templates" component={TemplateSearchContainer}/>
          <Route exact path="/templates/add" component={TemplateBuilderContainer}/>
          <Route exact path="/t/:label" component={NodeTemplateContainer}/>
          <Route path="/t/:label/edit" component={TemplateBuilderContainer}/>
          <Route path="/n/:label/add" component={NodePopulatorContainer}/>
          <Route path="/n/:label/search" component={NodeSearchContainer}/>
          <Route exact path="/n/:label/:id" component={NodeInstanceContainer}/>
        </div>
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


export default App;
