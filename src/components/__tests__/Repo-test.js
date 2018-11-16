import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Repo from '../Repo/Repo';
import test_data from '../../test_data.json';

// Repo.js
describe('Repo Component', () => {
 
  // Initialize wrapper
  const wrapper = mount(
    <Repo repo={test_data.repos[0]} 
          nodeTemplate={test_data.templates[0]} 
          nodeTemplates={test_data.templates} 
          nodes={test_data.nodes}
          settings={test_data.mockSettings}
          match={test_data.mockMatch} />
  )

  // Renders repo-container without crashing
  it('Renders repo-container without error', () => {
    expect(wrapper.find('.repo-container').exists()).toBe(true)
  });

  // Properly renders all templates in test_data
  it('Properly renders all templates in test_data', () => {
    expect(wrapper.find('.template-col .template-item').length).toEqual(test_data.templates.length);
  });

  // Create new template when 'Create Template' button is clicked
  it('Create new template when \'Create Template\' button is clicked', () => {
    wrapper.find('.create-template-btn').at(1).simulate('click');
    expect(wrapper.state().nodeTemplates.length).toEqual(6);
    expect(wrapper.state().nodeTemplates['5']).toEqual({
      "id": 5,
      "label": "",
      "properties": [
        {
          "display_label": "Name", 
          "id": 0, 
          "key": "name", 
          "path": "properties.name", 
          "value_type": "string"
        }
      ],
      "in_relationships": [],
      "out_relationships": []
    });
  });

  /////////////
  /// NODES ///
  /////////////

  // Properly renders no nodes when no template is selected
  it('Properly renders no nodes when no template is selected', () => {
    expect(wrapper.find('.node-col .node-instance-wrapper').length).toEqual(0);
  });
  
  // Properly shows error when trying to add node with no active template
  it('Properly shows error when trying to add node with no active template', () => {
    // Check total nodes and check first node data
    wrapper.find('.node-col .create-node-btn').at(0).simulate('click');
    expect(wrapper.state().sidemenu.open).toBe(false);
    // expect(wrapper.state().sidemenu.open).toBe(false);
  });

  // Properly renders all nodes in 'Movie' in test_data
  it('Properly renders all nodes in \'Movie\' in test_data', () => {
    // Check total nodes and check first node data
    expect(wrapper.find('.node-col .node-instance-wrapper').length).toEqual(5);
  });

  // Opens sidemenu with node populated when node is clicked
  it('Opens sidemenu with node populated when node is clicked', () => {
    // Check sidemenu opening and prepopulated data
  });

  // Editing node name changes name and persists when saved
  it('Editing node name changes name and persists when saved', () => {

  });

  // Add node when 'Create Node' button is clicked
  it('Add node when \'Create Node\' button is clicked', () => {

  });

  // Adding new property to template display when editing node
  it('Adding new property to template display when editing node', () => {

  });

  // Editing new node with new template property properly changes node
  it('Editing new node with new template property properly changes node', () => {
    // Save it
  });

  // Deleting node removes node
  it('Deleting node removes node', () => {
    
  });

  // Search query properly filters nodes
  it('Search query properly filters nodes', () => {
    
  });

  // Search query properly filters nodes on new property
  it('Search query properly filters nodes on new property', () => {
    
  });

});


