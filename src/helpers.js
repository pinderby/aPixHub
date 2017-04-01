import React, { Component } from 'react';
import NodeProperty from './components/NodeProperty.js'
import Section from './components/Section.js'

class Helpers {
  static numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }

  static renderSections(sections) {
    if (typeof(sections) != "undefined") {
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
    if (typeof(object) != "undefined") {
      var props = [];
      if (Object.prototype.toString.call( object ) === '[object Object]' ) {
        for (var prop in object) {
          if (object.hasOwnProperty(prop)) {
            switch(typeof(object[prop])) {
              case "string":
                  props.push(<NodeProperty key={prop} propKey={prop} value={object[prop]} type="string" />);
                  break;
              case "number":
                  props.push(<NodeProperty key={prop} propKey={prop} value={object[prop]} type="number" />);
                  break;
              case "object":
                  if (Object.prototype.toString.call( object[prop] ) === '[object Array]' ) {
                    console.log(object[prop]);
                    console.log(object[prop][0]);
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

  static renderObjects(objects) {
    console.log("objects: ", objects);
    var explodedObjects = [];
    if (typeof(objects) != "undefined") {
      objects.forEach(function(object) {
        console.log("object: ", object);
        console.log("Helpers.renderProps(object): ", Helpers.renderProps(object));
        explodedObjects.push(Helpers.renderProps(object));
      });
      console.log("explodedObjects: ", explodedObjects);
      return explodedObjects;
    }
    return;
  }

  static formatPropKey(string) {
    string = string.toLowerCase().split('_');
    for (var i = 0; i < string.length; i++) {
      string[i] = string[i].charAt(0).toUpperCase() + string[i].slice(1); 
    }
    
    return string.join(' ');
  }
}

export default Helpers;