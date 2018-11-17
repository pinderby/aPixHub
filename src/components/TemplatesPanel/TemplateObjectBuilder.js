import React, { Component } from 'react';
import Helpers from '../../helpers.js';
import PropertyBuilder from './PropertyBuilder';
import { AddPropertyButton } from './TemplateBuilder.js';
import { updateNodeTemplate } from '../../actions/templates';

class TemplateObjectBuilder extends Component {
  constructor(props) {
    super(props);

    // Bind callbacks
    this.updateNodeTemplate = this.updateNodeTemplate.bind(this);
    this.addProperty = this.addProperty.bind(this);
    this.setProperty = this.setProperty.bind(this);
    this.removeProperty = this.removeProperty.bind(this);

    console.log('props: ', props);

    this.state = {
      template: props.nodeTemplate.template,
      object: Helpers.getObjProp(props.nodeTemplate.template, props.path),
      rootPath: props.path+'.properties',
      newPropIndex: 0,
      rerender: true
    };
  }

  componentDidMount() {
    // If object doesn't have 'properties', add it with initial values
    const object = Helpers.getObjProp(this.props.nodeTemplate.template, this.props.path);
    if (!object.hasOwnProperty('properties')) this.addProperty();
  }

  // Decide whether or not to rerender
  shouldComponentUpdate(nextProps, nextState) {
    return nextState.rerender;
  }

  updateNodeTemplate(nodeTemplate) {
    // Dispatch new node to store
    this.props.dispatch(updateNodeTemplate(nodeTemplate));
  }

  addProperty() { // TODO --DM-- handle multiple properties at one time
    // Get index for new property
    let i = this.state.newPropIndex;

    // Merge template from props (redux store) and state
    let template = Object.assign(this.props.nodeTemplate.template, this.state.template);
    
    // Initialize new property
    var prop = Helpers.getNewProp(i, this.props.path);

    // Update template with new property
    template = Helpers.setObjProp(template, prop.path, prop);

    console.log('addProperty() template:', template); // TODO --DM-- Remove

    // Increment new property index
    i++;

    // Set state for updated node and new property index and rerender
    this.setState({
      template: template,
      newPropIndex: i,
      rerender: true,
    });

    // Dispatch new property to store
    this.updateNodeTemplate(template);

    return;
  }

  setProperty(changeType, oldPath, newPath, newProp) {
    // Merge template from props (redux store) and state
    let template = Object.assign(this.props.nodeTemplate.template, this.state.template);

    // Update template with new property value
    template = Helpers.setObjProp(template, newPath, newProp);

    // If oldPath exists, remove old property
    if (oldPath) template = Helpers.removeObjProp(template, oldPath);

    // Rerender if type changed, not if label changed
    var rerender = true;
    if (changeType === 'label') rerender = false;

    // Set state for updated node and rerender if type changed
    this.setState({
      template: template,
      rerender: rerender,
    });

    return;
  }

  removeProperty(path) {
    // Merge template from props (redux store) and state
    let template = Object.assign(this.props.nodeTemplate.template, this.state.template);

    // Dispatch path to store to remove property
    template = Helpers.removeObjProp(template, path);

    // Dispatch updated node to store
    this.props.dispatch(updateNodeTemplate(template));

    // Set state for updated node and rerender
    this.setState({
      template: template,
      rerender: true,
    });

    return;
  }

  renderProperties() {
    // Initialize variables
    var object = Helpers.getObjProp(this.props.nodeTemplate.template, this.props.path);
    var props = [];
    let i = 0;

    // Parse object to assign properties
    object = Helpers.parseObjectProp(object);

    // Iterate through node properties
    for (var key in object.properties) {
      // Initialize prop
      var prop = object.properties[key];

      // Push property input for each prop
      props.push(<PropertyBuilder key={key} index={i} prop={prop} nested={true}
                        onClick={(path) => this.removeProperty(path)}
                        addProperty={() => this.addProperty()} 
                        onChange={(changeType, oldPath, newPath, prop) => this.setProperty(changeType, oldPath, newPath, prop)} />); // TODO --DM-- manage keys for iteration
      props.push(<br key={key.toString()+'1000'} />)

      // Increment index
      i++;
    }

    return props;
  }
  
  render() {
    console.log('this.state', this.state); // TODO --DM-- Remove
    console.log('this.props', this.props); // TODO --DM-- Remove

    return (
      <div className="node-object-builder-container">
        <div className="node-object-builder">
          <h3>{this.state.object.key.toUpperCase()}</h3>
          {this.renderProperties()}
          <AddPropertyButton disabled={this.state.addProperty} onClick={() => this.addProperty()}/>
        </div>
      </div>
    );
  }
}

export default TemplateObjectBuilder;