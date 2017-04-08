import React, { Component } from 'react';
import moment from 'moment';
import Helpers from '../helpers.js';
import logan from '../logan.json';
import PropertyInput from './PropertyInput';
import './ApixNodeBuilder.css';

class ApixNodeBuilder extends Component {
  constructor({ node }) {
    super({ node });
    // var properties = [];
    // var name_property = { label:"name", 
    //                       display_label:"Name", 
    //                       type:"string", 
    //                       placeholder:"Name", 
    //                       disabled:true };
    // properties = Helpers.pushIfMissingInArray(properties, name_property, 'label');
    // var profile_image_property = { label:"profile_image", 
    //                                display_label:"Profile Picture", 
    //                                type:"string", 
    //                                placeholder:"Link to Profile Picture", 
    //                                disabled:true };
    // properties =  Helpers.pushIfMissingInArray(properties, profile_image_property, 'label');
    // var cover_image_property = { label:"cover_image", 
    //                              display_label:"Cover Image", 
    //                              type:"string", 
    //                              placeholder:"Link to Cover Image", 
    //                              disabled:true };
    // properties = Helpers.pushIfMissingInArray(properties, cover_image_property, 'label');
    // var node = {};
    // node.properties = properties;

    this.state = {
      node: node,
      addProperty: "",
    };
    console.log('ApixNodeBuilder.state: ', this.state);
  }
  
  renderProperties() {
    const nodeProps = this.state.node.properties;
    const _this = this;
    var props = [];
    for (var key in nodeProps) {
      // console.log(key, nodeProps[key]); //TODO --DM-- Remove
      var prop = nodeProps[key];
      props.push(<PropertyInput key={key} index={1} prop={prop} onClick={(prop) => _this.removeProperty(prop)}
                         addProperty={() => _this.addProperty()} />); // TODO --DM-- manage keys for iteration
      props.push(<br key={key.toString()+'1000'} />)
    }
    /*nodeProps.forEach(function(prop, index, propsArray) {
      if (index === nodeProps.length-1) {
        props.push(<PropertyInput key={index} index={index} prop={prop} 
                        onClick={(prop) => _this.removeProperty(prop)} onChange={(prop, i) => _this.setProperty(prop, i)}
                        addProperty={() => _this.addProperty()}  />); // TODO --DM-- manage keys for iteration
        props.push(<br key={index+1000} />);
      } else if(prop) {
        props.push(<PropertyInput key={index} index={index} prop={prop} onClick={(prop) => _this.removeProperty(prop)}
                         addProperty={() => _this.addProperty()} />); // TODO --DM-- manage keys for iteration
        props.push(<br key={index+1000} />);
      }
      
    });*/
    return props;
  }

  addProperty() { // TODO --DM-- handle multiple properties at one time
    const props = this.state.node.properties.slice();
    var prop = { label:"", display_label:"", type:"string", 
            placeholder:"Enter field name here", disabled:false, index:props.length-1 };
    var node = Object.assign({}, this.state.node);
    node.properties.push(prop);
    this.setState({
      node: node,
      addProperty: "disabled",
    });
    return;
  }

  setProperty(newProp, index) {
    var props = this.state.node.properties.slice();
    props[index] = newProp;
    var node = Object.assign({}, this.state.node);
    node.properties = props;
    this.setState({
      node: node,
      addProperty: "",
    });

    // console.log("setProperty: ", newProp); TODO --DTM-- Remove
    // console.log("props: ", this.state.props[props.length-1]); 
  }

  removeProperty(prop) {
    var props = this.state.node.properties.slice();

    var index = Helpers.getIndexInArray(props, prop);
    console.log(props, prop, index);
    props.splice(index, 1);
    var node = Object.assign({}, this.state.node);
    node.properties = props;

    this.setState({
      node: node,
      addProperty: "",
    });
    return;
  }
  
  render() {
    var node = logan;

    return (
      <div id="apix-node-builder-container">
        <div id="apix-node-builder">
          <form className="form-inline">
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