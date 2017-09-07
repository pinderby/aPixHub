import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import '../node_modules/auth0-js/build/auth0.js';
import { Route, Link, Redirect } from 'react-router-dom';
import HomeContainer from './containers/HomeContainer.js';
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
    let label;
    if(this.props.nodeTemplate.label) label = this.props.nodeTemplate.label;
    else label = 'movie';

    return (
      <div className="App">
        <ul className="nav nav-tabs">
          <li role="presentation"><Link to="/templates">TemplateRender</Link></li>
          <li role="presentation"><Link to={"/n/"+label+"/add"}>NodePopulator</Link></li>
          <li role="presentation"><Link to={"/n/"+label+"/search"}>NodeSearch</Link></li>
        </ul>
        <div id="App-container">
          <Route exact path="/" render={() => (
            <Redirect from="/" to="/home"/>
          )}/>
          <Route exact path="/home" component={HomeContainer}/>
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