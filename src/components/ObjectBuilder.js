import React, { Component } from 'react';
import moment from 'moment';
import Helpers from '../helpers.js';
import logan from '../logan.json';
import PropertyBuilder from './PropertyBuilder';
import AddPropertyButton from './AddPropertyButton.js';
import './ApixNodeBuilder.css';

class ObjectBuilder extends Component {
  constructor() {
    super();
    var properties = [];
    var object = {};
    object.properties = properties;

    this.state = {
      object: object,
      addProperty: "",
    };
  }
  
  renderObjProperties() {
    const objProps = this.state.object.properties.slice();
    const _this = this;
    var props = [];
    objProps.forEach(function(prop, index, propsArray) {
      if (index === objProps.length-1) {
        props.push(<PropertyBuilder key={index} index={index} prop={prop} 
                        onClick={(prop) => _this.removeObjProperty(prop)} onChange={(prop, i) => _this.setObjProperty(prop, i)}
                        addProperty={() => _this.addObjProperty()}  />); // TODO --DM-- manage keys for iteration
        props.push(<br key={index+1000} />);
      } else if(prop) {
        props.push(<PropertyBuilder key={index} index={index} prop={prop} onClick={(prop) => _this.removeObjProperty(prop)}
                         addProperty={() => _this.addObjProperty()} />); // TODO --DM-- manage keys for iteration
        props.push(<br key={index+1000} />);
      }
      
    });
    return props;
  }

  addObjProperty() { // TODO --DM-- handle multiple properties at one time
    const props = this.state.object.properties.slice();
    var prop = { label:"", display_label:"", type:"string", 
            placeholder:"Enter field name here", disabled:false, index:props.length-1 };
    var object = Object.assign({}, this.state.node);
    object.properties.push(prop);
    console.log(object);
    console.log(object.properties);
    this.setState({
      object: object,
      addProperty: "disabled",
    });
    return;
  }

  setObjProperty(newProp, index) {
    var props = this.state.object.properties.slice();
    props[index] = newProp;
    var object = Object.assign({}, this.state.object);
    object.properties = props;
    this.setState({
      object: object,
      addProperty: "",
    });

    // console.log("setProperty: ", newProp); TODO --DTM-- Remove
    // console.log("props: ", this.state.props[props.length-1]); 
  }

  removeObjProperty(prop) {
    var props = this.state.object.properties.slice();

    var index = Helpers.getIndexInArray(props, prop);
    console.log(props, prop, index);
    props.splice(index, 1);
    var object = Object.assign({}, this.state.object);
    node.properties = props;

    this.setState({
      object: object,
      addProperty: "",
    });
    return;
  }
  
}

export class AddObjectPropertyButton extends React.Component {
  render() {
    return (
      <button type="button" className="btn btn-info" disabled={this.props.disabled} onClick={() => this.props.onClick()}>
        <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
        Property
      </button>
    );
  }
}




export default ObjectBuilder;