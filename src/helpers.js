import React from 'react';
import NodeProperty from './components/NodeProperty.js'
import NodePropertyContainer from './containers/NodePropertyContainer.js'
// import Section from './components/Section.js'
// import BaseModel from './constants/BaseModel.js';
import _ from 'lodash';
import { DIRECTION } from './constants/PropertyTypes'

class Helpers {
  static getObjProp(obj, path) {
    var i;
    if (!path) return obj;

    path = path.replace(/\[(\w+)\]/g, '.$1'); //Source: http://stackoverflow.com/questions/6491463/accessing-nested-javascript-objects-with-string-key
    path = path.split('.');
    for (i = 0; i < path.length - 1; i++) {
      if (obj[path[i]]) obj = obj[path[i]];
    } 
        
    return obj[path[i]];
  }
  
  // Source: http://stackoverflow.com/questions/6842795/dynamic-deep-setting-for-a-javascript-object
  static setObjProp(obj, path, value) {
    var i, node = obj;
    if (!path) return obj;

    path = path.replace(/\[(\w+)\]/g, '.$1');
    path = path.split('.');
    for (i = 0; i < path.length - 1; i++) {
      if (!obj[path[i]]) obj[path[i]] = {};
      obj = obj[path[i]];
    } 
        
    obj[path[i]] = value;
    return node;
  }

  static addObjProp(obj, path, value) {
    var i, node = obj;
    if (!path) return obj;
    if (!obj.properties) obj.properties = [];

    path = path.replace(/\[(\w+)\]/g, '.$1');
    path = path.split('.');
    for (i = 0; i < path.length - 2; i++) {
      if (!obj[path[i]]) obj[path[i]] = {};
      obj = obj[path[i]];
    } 
        
    obj[path[i]].push(value);
    return node;
  }

  static removeObjProp(obj, path) {
    var i, node = obj;
    if (!path) return obj;

    path = path.replace(/\[(\w+)\]/g, '.$1');
    path = path.split('.');
    for (i = 0; i < path.length - 1; i++) {
      if (obj[path[i]]) obj = obj[path[i]];
    } 
        
    delete obj[path[i]];
    return node;
  }

  static numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }

  // Render object properties
  static renderProps(object) {
    console.log('renderProps: ', object); // TODO --DM-- Remove
    if (object) {
      var props = [];
      // console.log(object); // TODO --DM-- Remove
      if (Object.prototype.toString.call( object ) === '[object Object]' ) {
        // TODO --DTM-- Remove???
        // // Render 'name' first, if present
        // if (object.name) props.push(<NodeProperty key={'name'} propKey={'name'} value={object.name} type="string" />);

        for (var prop in object) {
          // console.log('renderProps prop: ', object); // TODO --DM-- Remove
          // Skip name, relationships when rendering properties
          // if (prop === 'name') continue;  // TODO --DTM-- Remove???
          if (prop === 'relationships') continue;

          if (object.hasOwnProperty(prop) && object[prop]) {
            switch(typeof(object[prop])) {
              case "string":
                  props.push(<NodeProperty key={prop} propKey={prop} value={object[prop]} type="string" />);
                  break;
              case "number":
                  props.push(<NodeProperty key={prop} propKey={prop} value={object[prop]} type="number" />);
                  break;
              case "object":
                  if (Object.prototype.toString.call( object[prop] ) === '[object Array]' ) {
                    if (Object.prototype.toString.call( object[prop][0] ) === '[object Object]' ) {
                      props.push(Helpers.renderObjects(object[prop]));
                    } else {
                      props.push(<NodeProperty key={prop} propKey={prop} value={object[prop].join(', ')} type="array" />);
                    }
                  } else {
                    props.push(<NodeProperty key={prop} propKey={prop} value={object[prop]} type="object" />);
                  }
                  break;
              default:
                  return;
            }
          }
        }
        return props;
      }
      return object;
    }
    return;
  }

  // Render relationship instances
  static renderRels(relationships, redirectOnClick) {
    // console.log('renderRels(): ', relationships); // TODO --DM-- Remove
    if (!relationships) return;

    var relComps = [];

    // Render 'in' relationships
    if (relationships.in && relationships.in.length) {
      relComps.push(<div key={'div-'+DIRECTION.IN} className="rel-direction-title">
                    <NodeProperty key={'direction'} propKey={'direction'} value={DIRECTION.IN} type="string" />
                  </div>);
      relComps.push(this.renderRelArray(relationships.in));
    }
    
    // Render 'out' relationships
    if (relationships.out && relationships.out.length) {
      relComps.push(<div key={'div-'+DIRECTION.OUT} className="rel-direction-title">
                      <NodeProperty key={'direction'} propKey={'direction'} value={DIRECTION.OUT} type="string" />
                    </div>);
      relComps.push(this.renderRelArray(relationships.out));
    }

    // Generate block component for relationships
    let relBlock = 
      <div className="relationships-container">
        <h3>Relationships</h3>
        {relComps}
      </div>
    
    return relBlock;
  }

  static renderRelArray(relationships) {
    var relComps = [];

    // Iterate through and render relationships
    relationships.forEach((rel) => {
      if (rel.rel_type) {
        relComps.push(<div key={'div-'+rel['rel_type']} className="rel-instance-type">
                        <NodeProperty key={'rel_type'} propKey={'rel_type'} value={rel.rel_type} type="string" />
                      </div>);
      }
      if (rel.nid) relComps.push(<NodeProperty key={'nid'} propKey={'nid'} value={rel.nid} type="string" />);

      // Render relationship properties
      let props = rel.properties;
      for (var prop in props) {
        if (props.hasOwnProperty(prop) && props[prop]) {
          switch(typeof(props[prop])) {
            case "string":
                relComps.push(<NodeProperty key={prop} propKey={prop} value={props[prop]} type="string" />);
                break;
            case "number":
                relComps.push(<NodeProperty key={prop} propKey={prop} value={props[prop]} type="number" />);
                break;
            case "object":
                if (Object.prototype.toString.call( props[prop] ) === '[object Array]' ) {
                  if (Object.prototype.toString.call( props[prop][0] ) === '[object Object]' ) {
                    relComps.push(Helpers.renderObjects(props[prop]));
                  } else {
                    relComps.push(<NodeProperty key={prop} propKey={prop} value={props[prop].join(', ')} type="array" />);
                  }
                } else {
                  relComps.push(<NodeProperty key={prop} propKey={prop} value={props[prop]} type="object" />);
                }
                break;
            default:
                return;
          }
        }

      }
    });

    return relComps;
  }

  // TODO --DTM-- Remove?
  static renderTemplate(object) {
    // console.log('object: ', object); // TODO --DM-- Remove
    if (object) {
      var props = [];
      props.push( <div key={'div-'+object['id']} className="template-prop-key">
                    <NodeProperty key={'label'+object['id']} propKey={'label'} value={object['label']} type="string" />
                  </div>);
      props.push(<NodeProperty key={'id'+object['id']} propKey={'id'} value={object['id']} type="string" />);
      props.push(<NodeProperty key={'created_at'+object['id']} propKey={'created_at'} value={object['created_at']} type="string" />);
      props.push(<NodeProperty key={'updated_at'+object['id']} propKey={'updated_at'} value={object['updated_at']} type="string" />);
      props.push(Helpers.renderTemplateProps(object['properties']));
      props.push(Helpers.renderTemplateRels(object['out_relationships'], 'OUT'));
      props.push(Helpers.renderTemplateRels(object['in_relationships'], 'IN'));

      return props;
    }
    return;
  }

  static renderTemplateProps(props) {
    var propComps = [];
    console.log('props: ', props); // TODO --DM-- Remove
    if (!props) return;
    if (props.length >= 1 && Object.prototype.toString.call( props ) === '[object Array]' ) {
      props.forEach(function(prop) {
        propComps.push(<div key={'div-'+prop['id']} className="template-prop-key">
                          <NodeProperty key={'prop-key'+prop['id']} propKey={'key'} value={prop['key']} type="string" />
                        </div>);
        propComps.push(<NodeProperty key={'prop-value_type'+prop['id']} propKey={'value_type'} value={prop['value_type']} type="string" />);
        propComps.push(<NodeProperty key={'prop-id'+prop['id']} propKey={'id'} value={prop['id']} type="string" />);
        propComps.push(<NodeProperty key={'prop-node_id'+prop['id']} propKey={'node_id'} value={prop['node_id']} type="string" />);
        propComps.push(<NodeProperty key={'prop-created_at'+prop['id']} propKey={'created_at'} value={prop['created_at']} type="string" />);
        propComps.push(<NodeProperty key={'prop-updated_at'+prop['id']} propKey={'updated_at'} value={prop['updated_at']} type="string" />);
      });
      return ( <div key={'div-'+props[0].id} className="template-prop">{propComps}</div> );
    }
    return;
  }

  static renderTemplateRels(rels, direction) {
    // console.log('rels: ', rels); // TODO --DM-- Remove
    var relComps = [];
    var propComps = [];
    if (!rels) return;
    if (rels.length >= 1 && Object.prototype.toString.call( rels ) === '[object Array]' ) {
      rels.forEach(function(rel) {
        relComps.push(<div key={'div-'+rel['id']} className="template-rel-key">
                        <NodePropertyContainer key={'rel-rel_type'+rel['id']} relationshipTemplate={rel} propKey={'rel_type'} value={rel['rel_type']} type="string" />
                      </div>);
        relComps.push(<NodeProperty key={'rel-direction'+rel['id']} propKey={'direction'} value={direction} type="string" />);
        relComps.push(<NodeProperty key={'rel-id'+rel['id']} propKey={'id'} value={rel['id']} type="string" />);
        relComps.push(<NodeProperty key={'rel-from_node_id'+rel['id']} propKey={'from_node_id'} value={rel['from_node_id']} type="string" />);
        relComps.push(<NodeProperty key={'rel-to_node_id'+rel['id']} propKey={'to_node_id'} value={rel['to_node_id']} type="string" />);
        relComps.push(<NodeProperty key={'rel-created_at'+rel['id']} propKey={'created_at'} value={rel['created_at']} type="string" />);
        relComps.push(<NodeProperty key={'rel-updated_at'+rel['id']} propKey={'updated_at'} value={rel['updated_at']} type="string" />);
        propComps = Helpers.renderTemplateProps(rel['properties']);
      });
      return [relComps, propComps];
    } else if (Object.prototype.toString.call( rels ) === '[object Object]' ) {
      console.log('rels: ', rels);
      relComps.push(<div key={'div-'+rels['id']} className="template-rel-key">
                      <NodePropertyContainer key={'rel-rel_type'+rels['id']} relationshipTemplate={rels} propKey={'rel_type'} value={rels['rel_type']} type="string" />
                    </div>);
      relComps.push(<NodeProperty key={'rel-id'+rels['id']} propKey={'id'} value={rels['id']} type="string" />);
      relComps.push(<NodeProperty key={'rel-from_node_id'+rels['id']} propKey={'from_node_id'} value={rels['from_node_id']} type="string" />);
      relComps.push(<NodeProperty key={'rel-to_node_id'+rels['id']} propKey={'to_node_id'} value={rels['to_node_id']} type="string" />);
      relComps.push(<NodeProperty key={'rel-created_at'+rels['id']} propKey={'created_at'} value={rels['created_at']} type="string" />);
      relComps.push(<NodeProperty key={'rel-updated_at'+rels['id']} propKey={'updated_at'} value={rels['updated_at']} type="string" />);
      propComps = Helpers.renderTemplateProps(rels['properties']);
      return [relComps, propComps];
    }
    return;
  }

  static renderObjects(objects) {
    var explodedObjects = [];
    if (typeof(objects) !== "undefined") {
      objects.forEach(function(object) {
        explodedObjects.push(Helpers.renderProps(object));
      });
      return explodedObjects;
    }
  return;
  }

  // Takes snake_case prop key and returns a formatted label string for display
  static formatPropKey(string, withSpaces = true) {
    if (string) {
      string = string.toLowerCase().split('_');
      for (var i = 0; i < string.length; i++) {
        string[i] = string[i].charAt(0).toUpperCase() + string[i].slice(1); 
      }
      
      if (withSpaces) {
        return string.join(' ');
      } else {
        return string.join('');
      }
    } else {
      return "";
    }   
  }

  // Capitalize first letter of string
  static capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // Takes old path string and new object key and returns updated path string
  static parseNewPath(oldPath, newKey) {
    // Split old path by '.'
    oldPath = oldPath.split('.');

    // Replace last segment of path with new key
    oldPath[oldPath.length-1] = newKey.toLowerCase();

    // Join new path and return
    return oldPath.join('.');
  }

  // Gets the index of a given element in an array
  static getIndexInArray(array, element) {
    var index;
    for(var i = array.length - 1; i >= 0; i--) {
      if(array[i] === element) {
       index = i;
      }
    }
    return index;
  }

  // Gets object key from value
  static getKey(obj, value) {
    for( var prop in obj ) {
      if( obj.hasOwnProperty( prop ) ) {
        if( obj[prop] === value ) return prop;
      }
    }
  }

  // Gets new blank property for display
  static getNewProp(i, path) {
    // Add '.' to path prefix if nested property, if not leave blank
    path ? path += "." : path = "";

    return { key:"", display_label:"", value_type:"string", 
            placeholder:"Enter field name here", disabled:false, path:path+"properties."+i };
  }

  // Checks for property in array of properties
  static hasProp(props, key) {
    console.log('hasProp ', props); // TODO --DM-- Remove
    // Default to false
    let hasKey = false;

    // Iterate through each prop and check against key
    props.forEach(function(prop) {
      if (prop.key === key) hasKey = true;
    });

    return hasKey;
  }

  // Parses template property of type object and 
  // assigns object props based from json
  static parseObjectProp(object) {
    console.log('parseObjectProp(): ', object); // TODO --DM-- Remove
    
    // If not an object or value_type is not json, return original variable
    if ((Object.prototype.toString.call( object ) !== '[object Object]') ||  
        (object.value_type[0] !== '{')) { return object; } 

    // If object is JSON string, parse to object
    // Convert string to JSON string
    let objString = object.value_type.replace(/=>/g, ":");

    // Set value_type to 'object', initialize properties
    object.value_type = 'object';
    object.properties = [];

    // Parse string to object
    let props = JSON.parse(objString);
  

    // Iterate over properties and assign each property
    Object.keys(props).forEach(function(key) {
      // If is an array, stringify array into proper format, otherwise assign value
      let value;
      if (Object.prototype.toString.call( props[key] ) === '[object Array]' ) {
        value = JSON.stringify(props[key]);
      } else {
        value = props[key];
      }

      // Assign properties
      object.properties.push({
        key: key,
        value_type: value
      });
    });

    return object;
  }

  // Restructure node relationships property 
  // to match format for POST calls
  static restructureNodeRelationships(node) {

    // If node has no relationships, 
    // return with base relationships object
    if (!node.relationships) {
      node.relationships = { in: [], out: [] };
      return node;
    } 

    // If node relationships is already in proper format, return node
    if (node.relationships.in && 
        Object.prototype.toString.call( node.relationships.in ) === '[object Array]') {
      return node;

    // If node relationships is in format from server, restructure relationships  
    } else {
      // Initialize variables
      let nextNode = Object.assign({}, node);
      let nid = node.nid, nodeRelationships = node.relationships;
      let relationships = { in: [], out: [] };

      // Iterate through relationships and 
      nodeRelationships.forEach((rel) => {
        // If relationships is 'out' relationship, assign to 'out' array
        if (rel.from_nid === nid) {
          
          // Copy relationship
          let tempRel = Object.assign({}, rel);

          // Assign to_nid to nid (the non-self-referencing node id)
          tempRel.nid = rel.to_nid;

          // Delete unused properties
          delete tempRel.from_nid
          delete tempRel.to_nid

          // Push into relationships 'out' array
          relationships.out.push(tempRel);

        // If relationships is 'in' relationship, assign to 'in' array
        } else if (rel.to_nid === nid) {
          
          // Copy relationship
          let tempRel = Object.assign({}, rel);

          // Assign to_nid to nid (the non-self-referencing node id)
          tempRel.nid = rel.from_nid;

          // Delete unused properties
          delete tempRel.from_nid
          delete tempRel.to_nid

          // Push into relationships 'out' array
          relationships.in.push(tempRel);
        } else {
          console.log('restructureNodeRelationships() error, node: ', node);
        }
      });

      // Delete old relationships property and assign new one
      delete nextNode.relationships;
      nextNode.relationships = relationships;

      return nextNode;
    }

  }

    // Takes an array and returns an object with elements keyed by id
    // Requires each element to have 'id' key
    static arrayToObjectById(array) {
      // Instantiate new object to replace array
      let newObject = {};

      // Check if array is of type Array
      if(!Array.isArray(array)) {
        console.log("arrayToObjectById(): Argument is not an array.")
        return;
      }

      // Iterate through array
      array.forEach((element) => {
        // Check to make sure array elements are objects
        if(element === null || typeof(element) !== 'object') {
          console.log("arrayToObjectById(): One or more array elements are not objects.")
          return;
        }

        // Check to make sure array elements have 'id' key
        if(element.hasOwnProperty('id')) {
          // Add each element to new object with key of it's own id
          newObject[element.id] = element;
        } else {
          // If no 'id' key, return with logged error
          console.log("arrayToObjectById(): One or more array elements do not have an 'id' key.")
          return;
        }
      });
  
      // Return new object
      return newObject;
    }

}

export default Helpers;