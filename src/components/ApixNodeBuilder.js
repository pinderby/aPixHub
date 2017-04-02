import React, { Component } from 'react';
import moment from 'moment';
import Helpers from '../helpers.js';
import logan from '../logan.json';
import PropertyInput from './PropertyInput';
import './ApixNodeBuilder.css';

class ApixNodeBuilder extends Component {
  constructor() {
    super();
    this.state = {
      props: Array(),
      addProperty: "",
    };
  }
  
  renderProperties() {
    const stateProps = this.state.props.slice();
    const _this = this;
    var props = [];
    stateProps.forEach(function(prop, index, propsArray) {
      if (index === stateProps.length-1) {
        props.push(<PropertyInput key={index} index={index} prop={prop} onClick={(prop) => _this.removeProperty(prop)} onChange={(prop, i) => _this.setProperty(prop, i)}  />); // TODO --DM-- manage keys for iteration
        props.push(<br key={index+1000} />);
      } else if(prop) {
        props.push(<PropertyInput key={index} index={index} prop={prop} onClick={(prop) => _this.removeProperty(prop)} />); // TODO --DM-- manage keys for iteration
        props.push(<br key={index+1000} />);
      }
      
    });
    return props;
  }

  addProperty() { // TODO --DM-- handle multiple properties at one time
    const props = this.state.props.slice();
    var prop = { label:"", display_label:"", type:"string", 
            placeholder:"Enter field name here", disabled:false, index:props.length-1 };
    props.push(prop);
    this.setState({
      props: props,
      addProperty: "disabled",
    });
    return;
  }

  setProperty(newProp, index) {
    var props = this.state.props.slice();
    props[index] = newProp;
    this.setState({
      props: props,
      addProperty: "",
    });
    // console.log("setProperty: ", newProp); TODO --DTM-- Remove
    // console.log("props: ", this.state.props[props.length-1]); 
  }

  removeProperty(prop) {
    var props = this.state.props.slice();

    var index = Helpers.getIndexInArray(props, prop);
    console.log(props, prop, index);
    props.splice(index, 1);

    this.setState({
      props: props,
      addProperty: "",
    });
    return;
  }
  
  render() {
    var node = logan;
    var properties = [];
    var name_property = { label:"name", 
                          display_label:"Name", 
                          type:"string", 
                          placeholder:"Name", 
                          disabled:true }
    var profile_image_property = { label:"profile_image", 
                                   display_label:"Profile Picture", 
                                   type:"string", 
                                   placeholder:"Link to Profile Picture", 
                                   disabled:true }
    var cover_image_property = { label:"cover_image", 
                                 display_label:"Cover Image", 
                                 type:"string", 
                                 placeholder:"Link to Cover Image", 
                                 disabled:true }

    return (
      <div id="apix-node-builder-container">
        <div id="apix-node-builder">
          <form className="form-inline">
            <PropertyInput prop={name_property} /><br/>
            <PropertyInput prop={profile_image_property} /><br/>
            <PropertyInput prop={cover_image_property} /><br/>
            {this.renderProperties()}
            <AddPropertyButton disabled={this.state.addProperty} onClick={() => this.addProperty()}/>
          </form>
        </div>
      </div>
    );
  }
}

class AddPropertyButton extends React.Component {
  render() {
    return (
        <button type="button" className="btn btn-info" disabled={this.props.disabled} onClick={() => this.props.onClick()}>
          <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
          Property
        </button>
    );
  }
}




export default ApixNodeBuilder;