import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { browserHistory } from 'react-router';
import HomeContainer from './containers/HomeContainer.js';
import RepoContainer from './containers/RepoContainer.js';
import NodeInstanceContainer from './containers/NodeInstanceContainer.js';
import NodeTemplateContainer from './containers/NodeTemplateContainer.js';
import TemplateSearchContainer from './containers/TemplateSearchContainer.js';
import TemplateBuilderContainer from './containers/TemplateBuilderContainer.js';
import RelationshipBuilderContainer from './containers/RelationshipBuilderContainer.js';
import RelationshipTemplateContainer from './containers/RelationshipTemplateContainer.js';
// import RelationshipInstanceContainer from './containers/RelationshipInstanceContainer.js';
import RelationshipPopulatorContainer from './containers/RelationshipPopulatorContainer.js';
import NodePopulatorContainer from './containers/NodePopulatorContainer.js';
import NodeSearchContainer from './containers/NodeSearchContainer.js';
// import IMDbClone from './IMDbClone.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      pageIndex: 1,
    };
  }
  
  setNodeTemplate(nodeTemplate) {
    this.setState({
      nodeTemplate: nodeTemplate
    });
  }

  setApixNode(apixNode) {
    this.setState({
      apixNode: apixNode
    });
  }

  render() {
    return (
      <div id="app-container" className="App">
        <Router history={browserHistory}>
          <div id="App-container">
            <Route exact path="/" render={() => (
              <Redirect from="/" to="/home"/>
            )}/>
            <Route exact path="/home" component={HomeContainer} />
            <Route exact path="/u/:user/:repo" component={RepoContainer} />
            <Route exact path="/templates" component={TemplateSearchContainer}/>
            <Route exact path="/templates/add" component={TemplateBuilderContainer}/>
            <Route exact path="/relationships/add" component={RelationshipBuilderContainer}/>
            <Route exact path="/t/:label" component={NodeTemplateContainer}/>
            <Route exact path="/r/:rel_template_id" component={RelationshipTemplateContainer}/>
            <Route path="/t/:label/edit" component={TemplateBuilderContainer}/>
            <Route exact path="/r/:rel_template_id/edit" component={RelationshipBuilderContainer}/>
            <Route path="/n/:label/add" component={NodePopulatorContainer}/>
            <Route exact path="/r/:rel_template_id/add" component={RelationshipPopulatorContainer}/>
            <Route path="/n/:label/search" component={NodeSearchContainer}/>
            <Route exact path="/n/:label/:id" component={NodeInstanceContainer}/>
            {/*<Route exact path="/r/:rel_template_id/:id" component={RelationshipInstanceContainer}/>*/}
            <Route path="/n/:label/:id/edit" component={NodePopulatorContainer}/>
            {/*<Route exact path="/r/:rel_template_id/:id/edit" component={RelationshipPopulatorContainer}/>*/}
          </div>
        </Router>
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