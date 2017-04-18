import React from 'react';
import NodeProperty from './components/NodeProperty.js'
import Section from './components/Section.js'
import _ from 'lodash';

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

  static renderSections(sections) {
    if (typeof(sections) !== "undefined") {
      var sectionComponents = [];
      sections.forEach(function(section) {
        sectionComponents.push(<Section key={section.title} section={section} />);
      });
      return sectionComponents;
    } else {
      return;
    }
  }

  static renderProps(object) {
    // console.log('renderProps: ', object); // TODO --DM-- Remove
    if (typeof(object) !== "undefined") {
      var props = [];
      // console.log(object); // TODO --DM-- Remove
      if (Object.prototype.toString.call( object ) === '[object Object]' ) {
        for (var prop in object) {
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
      // console.log('props: ', props); // TODO --DM-- Remove
      // if (!props) return;
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
                          <NodeProperty key={'rel-rel_type'+rel['id']} propKey={'rel_type'} value={rel['rel_type']} type="string" />
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
  static formatPropKey(string) {
    string = string.toLowerCase().split('_');
    for (var i = 0; i < string.length; i++) {
      string[i] = string[i].charAt(0).toUpperCase() + string[i].slice(1); 
    }
    
    return string.join(' ');
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
    path ? path = path+"." : path = "";

    return { label:"", display_label:"", type:"string", 
            placeholder:"Enter field name here", disabled:false, path:path+"properties.newProp"+i };
  }

  // TODO --DM-- Remove
//   static pushIfMissingInArray(array, element, key) {
//     var found = false;
//     for(var i = array.length - 1; i >= 0; i--) {
//       if(array[i] === element || array[i][key] === element[key]) {
//        found = true;
//       }
//     }
//     if(!found) {;
//       var a = [];
//       a = array.slice();
//       a.push(element);
//     }
//     return a;
//   }

}

export default Helpers;