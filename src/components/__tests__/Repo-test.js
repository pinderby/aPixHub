import React from 'react';
import { mount } from 'enzyme';
import Repo from '../Repo/Repo';
import test_data from '../../test_data.json';

// Repo.js
describe('Repo Component', () => {
 
  // Initialize wrapper
  const wrapper = mount(
    <Repo repo={test_data.repos[0]} 
          nodeTemplate={test_data.templates[0]} 
          nodeTemplates={test_data.templates} 
          relationshipTemplates={test_data.relationship_templates}
          nodes={test_data.nodes}
          settings={test_data.mockSettings}
          match={test_data.mockMatch} />
  );

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
  
  // Properly shows popover when trying to add node with no active template
  it('Properly shows popover when trying to add node with no active template', () => {
    wrapper.find('.create-node-btn').at(1).simulate('click');
    expect(wrapper.state().sidemenu.open).toBe(false);
    expect(wrapper.find('.select-template-popover').exists()).toBe(true);
  });

  // Properly renders all nodes in 'Movie' in test_data
  it('Properly renders all nodes in \'Movie\' in test_data', () => {
    // Check total nodes and check first node data
    wrapper.find('.template-label-wrapper').at(0).simulate('click');
    expect(wrapper.find('.node-col .node-instance-wrapper').length).toEqual(5);
  });

  // Opens sidemenu with node populated when node is clicked
  it('Opens sidemenu with node populated when node is clicked', () => {
    // Check sidemenu opening and prepopulated data
    wrapper.find('.node-instance-wrapper').at(0).find('.panel-body').at(0).simulate('click');
    expect(wrapper.state().sidemenu.open).toBe(true);
    expect(wrapper.find('.property-populator input').at(0).props().value).toEqual("Black Panther");
  });

  // Editing node name changes name and persists when saved
  it('Editing node name changes name and persists when saved', () => {
    wrapper.find('.property-populator input').at(0).simulate('change', {
      target: { value: 'Black Panther 2' }
    });
    wrapper.find('.save-node-btn').at(0).simulate('click');
    expect(
      wrapper.find('.node-instance-wrapper').at(0)
             .find('.panel-body').at(0)
             .find('.node-prop-value').at(0).text()
    ).toEqual(" Black Panther 2");
  });

  // Add node when 'Create Node' button is clicked
  it('Add node when \'Create Node\' button is clicked', () => {
    wrapper.find('.create-node-btn').at(0).simulate('click');
    wrapper.find('.property-populator input').at(0).simulate('change', {
      target: { value: 'First Man' }
    });
    wrapper.find('.save-node-btn').at(0).simulate('click');
    expect(wrapper.state().allNodes.movie.length).toEqual(6);
  });

  // Adding new property to template display when editing node
  it('Adding new property to template display when editing node', () => {
    wrapper.find('.template-edit-btn').at(0).simulate('click');
    wrapper.find('.template-add-prop-btn.btn-sm').at(0).simulate('click');
    wrapper.find('.template-prop').at(2).find('input[type=\'text\']').at(0).simulate('change', {
      target: { value: 'year' }
    });
    wrapper.find('.template-prop').at(2).find('select').at(0).simulate('change', {
      target: { value: 'Integer' }
    });
    wrapper.find('.template-edit-btn').at(0).simulate('click');
    wrapper.find('.node-instance-wrapper').at(5).find('.panel-body').at(0).simulate('click');
    expect(wrapper.find('.property-populator').at(1).find('label').at(0).text()).toEqual('Year : Integer');
  });

  // Editing new node with new template property properly changes node
  it('Editing new node with new template property properly changes node', () => {
    wrapper.find('.property-populator input').at(1).simulate('change', {
      target: { value: '2018' }
    });
    wrapper.find('.save-node-btn').at(0).simulate('click');
    expect(wrapper.state().allNodes.movie[5]).toEqual({
      "nid": 5, 
      "properties": {
        "name": "First Man", 
        "year": "2018"
      }
    });
  });

  // Deleting node removes node
  it('Deleting node removes node', () => {
    wrapper.find('.node-instance-wrapper').at(4).find('.panel-body').at(0).simulate('click');
    wrapper.find('.delete-node-btn').at(0).simulate('click');
    expect(wrapper.state().allNodes.movie.length).toEqual(5);
  });

  // Search query properly filters nodes
  it('Search query properly filters nodes', () => {
    wrapper.find('.nodes-searchbar input').at(0).simulate('change', {
      target: { value: 'War' }
    });
    expect(wrapper.find('.node-instance-wrapper').length).toEqual(2);
  });

  // Search query properly filters nodes on new property
  it('Search query properly filters nodes on new property', () => {
    wrapper.find('.nodes-searchbar select').at(0).simulate('change', {
      target: { value: 'year' }
    });
    wrapper.find('.nodes-searchbar input').at(0).simulate('change', {
      target: { value: '2018' }
    });
    expect(wrapper.find('.node-instance-wrapper').length).toEqual(1);
  });

  //////////////////////////////
  /// RELATIONSHIP TEMPLATES ///
  //////////////////////////////

  console.log(wrapper.find('.template-col .template-item').length); // TODO --DTM-- Remove

  // Renders repo-container without error for relationships
  it('Renders repo-container without error for relationships', () => {
    // Change to relationship templates
    wrapper.find('button#dropdown-basic').at(0).simulate('click');
    wrapper.find('#dropdown-basic .template-menu-item a').at(0).simulate('click');
    expect(wrapper.find('.repo-container').exists()).toBe(true)
  });

  // Properly renders all templates in test_data for relationships
  it('Properly renders all templates in test_data for relationships', () => {
    expect(wrapper.find('.template-col .template-item').length).toEqual(test_data.relationship_templates.length);
  });

  // Create new relationship template when 'Create Template' button is clicked
  it('Create new relationship template when \'Create Template\' button is clicked', () => {
    wrapper.find('.create-template-btn').at(1).simulate('click');
    expect(wrapper.state().relationshipTemplates.length).toEqual(3);
    expect(wrapper.state().relationshipTemplates[2]).toEqual({
      "id": 2,
      "rel_type": "",
      "to_node_id": "",
      "from_node_id": "",
      "properties": [
        {
          "display_label": "Name", 
          "id": 0, 
          "key": "name", 
          "path": "properties.name", 
          "value_type": "string"
        }
      ]
    });
  });

});


