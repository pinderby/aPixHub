import React from 'react';
import { shallow, mount, render } from 'enzyme';
import NodeTemplate from '../TemplatesPanel/NodeTemplate';
import test_data from '../../test_data.json';

// NodeTemplate.js
describe('NodeTemplate Component', () => {
 
  // Initialize wrapper
  const wrapper = mount(<NodeTemplate template={test_data.templates[0]} open={true} />);

  // Renders template-container without crashing
  it('Renders template-container without error', () => {
    expect(wrapper.find('.template-container').exists()).toBe(true)
  });

  // Properly renders all template properties (total props + 1 for nid)
  it('Properly renders all template properties', () => {
    expect(wrapper.find('.template-props .template-prop').length)
      .toEqual(test_data.templates[0].properties.length+1);
  });

  // Properly renders both template relationship directions
  it('Properly renders both template relationship directions', () => {
    expect(wrapper.find('.template-rels .template-rel').length).toEqual(2);
  });

  // Initial 'editing' state should be false
  it('Initial \'editing\' state should be false', () => {
    expect(wrapper.state('editing')).toBe(false);
  });

  // Changes state 'editing' when edit button is clicked
  it('Changes \'editing\' state when edit button is clicked', () => {
    wrapper.find('.template-edit-btn').at(0).simulate('click');
    expect(wrapper.state('editing')).toBe(true);
  });

  ///////////////////////////
  /// TEMPLATE PROPERTIES ///
  ///////////////////////////

  // Changes template property keys to inputs when edit button is clicked
  it('Changes template property keys to inputs when edit button is clicked', () => {
    expect(wrapper.state('editing')).toBe(true);
    expect(wrapper.find('.template-props EditableInput[editing=true] input').length).toBeGreaterThanOrEqual(1);
  });

  // Editing template label changes label and persists when editing stops
  it('Editing template label changes label and persists when editing stops', () => {
    wrapper.find('.template-label').at(0).find('input[type=\'text\']').at(0).simulate('change', {
      target: { value: 'Movies' }
    });
    expect(wrapper.state().template.label).toEqual('movies');
    wrapper.find('.template-edit-btn.btn-default').simulate('click');
    expect(wrapper.state().template.label).toEqual('movies');
  });

  // Add template property to template when 'Add Property' button is clicked
  it('Add template property to template when Add Property button is clicked', () => {
    wrapper.find('.template-edit-btn.btn-default').simulate('click');
    wrapper.find('.template-add-prop-btn.btn-sm').at(0).simulate('click');
    expect(wrapper.state().template.properties['1']).toEqual({
      "disabled": false,
      "id": 1,
      "key": "new_property",
      "new_prop": true,
      "value_type": "string"
    });
  });

  // Editing new template property key changes property key
  it('Editing new template property key changes property key', () => {
    wrapper.find('.template-prop').at(2).find('input[type=\'text\']').at(0).simulate('change', {
      target: { value: 'new_prop' }
    });
    expect(wrapper.state().template.properties['1']).toEqual({
      "disabled": false,
      "id": 1,
      "key": "new_prop",
      "new_prop": true,
      "value_type": "string"
    });
  });

  // Editing new template value type changes value type
  it('Editing new template value type changes value type', () => {
    wrapper.find('.template-prop').at(2).find('select').at(0).simulate('change', {
      target: { value: 'Integer' }
    });
    expect(wrapper.state().template.properties['1']).toEqual({
      "disabled": false,
      "id": 1,
      "key": "new_prop",
      "new_prop": true,
      "value_type": "Integer"
    });
  });

  // Editing new template property key is persisted when editing stops
  it('Editing new template property key is persisted when editing stops', () => {
    wrapper.find('.template-prop').at(2).find('input[type=\'text\']').at(0).simulate('change', {
      target: { value: 'year' }
    });
    wrapper.find('.template-prop').at(2).find('select').at(0).simulate('change', {
      target: { value: 'Integer' }
    });
    wrapper.find('.template-edit-btn.btn-default').simulate('click');
    expect(wrapper.state().template.properties['1']).toEqual({
      "disabled": false,
      "id": 1,
      "key": "year",
      "new_prop": true,
      "value_type": "Integer"
    });
  });

  // Deleting new template property key removes property
  it('Deleting new template property key removes property', () => {
    wrapper.find('.template-edit-btn.btn-default').simulate('click');
    wrapper.find('.template-prop').at(2).find('.template-remove-prop-btn.btn-sm').at(0).simulate('click');
    expect(wrapper.state().template.properties.length).toEqual(1);
  });

  // Deleting existing template property key displays modal
  it('Deleting existing template property key displays modal', () => {
    wrapper.find('.template-edit-btn.btn-default').simulate('click');
    wrapper.find('.template-prop').at(1).find('.template-remove-prop-btn.btn-sm').at(0).simulate('click');
    expect(wrapper.find('div[role="dialog"]').length).toBeGreaterThanOrEqual(1);
  });

  // Deleting existing template property key removes property after confirmation
  it('Deleting existing template property key removes property after confirmation', () => {
    wrapper.find('.template-edit-btn.btn-default').simulate('click');
    wrapper.find('.template-prop').at(1).find('.template-remove-prop-btn.btn-sm').at(0).simulate('click');
    wrapper.find('div[role="dialog"]').find('.template-remove-prop-btn').at(0).simulate('click');
    expect(wrapper.state().template.properties.length).toEqual(0);
  });

  ///////////////////////////////
  /// RELATIONSHIP PROPERTIES ///
  ///////////////////////////////

  // Changes relationship property keys to inputs when edit button is clicked
  it('Changes relationship property keys to inputs when edit button is clicked', () => {
    expect(wrapper.state('editing')).toBe(true);
    expect(wrapper.find('.template-rels .template-prop EditableInput[editing=true] input').length).toBeGreaterThanOrEqual(1);
  });

  // Add relationship property to relationship when 'Add Property' button is clicked
  it('Add relationship property to relationship when Add Property button is clicked', () => {
    wrapper.find('.rel-add-prop-btn.btn-sm').at(0).simulate('click');
    expect(wrapper.state().template.in_relationships['0'].properties['1']).toEqual({
      "disabled": false,
      "id": 1,
      "key": "new_property",
      "new_prop": true,
      "value_type": "string"
    });
  });

  // Editing new relationship property key changes property key
  it('Editing new relationship property key changes property key', () => {
    wrapper.find('.template-rels > .template-prop').at(1).find('input[type=\'text\']').at(0).simulate('change', {
      target: { value: 'new_prop' }
    });
    expect(wrapper.state().template.in_relationships['0'].properties['1']).toEqual({
      "disabled": false,
      "id": 1,
      "key": "new_prop",
      "new_prop": true,
      "value_type": "string"
    });
  });

  // Editing new relationship value type changes value type
  it('Editing new relationship value type changes value type', () => {
    wrapper.find('.template-rels > .template-prop').at(1).find('select').at(0).simulate('change', {
      target: { value: 'Integer' }
    });
    expect(wrapper.state().template.in_relationships['0'].properties['1']).toEqual({
      "disabled": false,
      "id": 1,
      "key": "new_prop",
      "new_prop": true,
      "value_type": "Integer"
    });
  });

  // Editing new relationship property key is persisted when editing stops
  it('Editing new relationship property key is persisted when editing stops', () => {
    wrapper.find('.template-rels > .template-prop').at(1).find('input[type=\'text\']').at(0).simulate('change', {
      target: { value: 'year' }
    });
    wrapper.find('.template-rels > .template-prop').at(1).find('select').at(0).simulate('change', {
      target: { value: 'Integer' }
    });
    wrapper.find('.template-edit-btn.btn-default').simulate('click');
    expect(wrapper.state().template.in_relationships['0'].properties['1']).toEqual({
      "disabled": false,
      "id": 1,
      "key": "year",
      "new_prop": true,
      "value_type": "Integer"
    });
  });

  // Deleting new relationship property key removes property
  it('Deleting new relationship property key removes property', () => {
    wrapper.find('.template-rels > .template-prop').at(1).find('.rel-remove-prop-btn.btn-sm').at(0).simulate('click');
    expect(wrapper.state().template.in_relationships['0'].properties.length).toEqual(1);
  });

  // Deleting existing relationship property key displays modal
  it('Deleting existing relationship property key displays modal', () => {
    wrapper.find('.template-rels > .template-prop').at(1).find('.rel-remove-prop-btn.btn-sm').at(0).simulate('click');
    expect(wrapper.find('div[role="dialog"]').length).toBeGreaterThanOrEqual(1);
  });

  // Deleting existing relationship property key removes property after confirmation
  it('Deleting existing relationship property key removes property after confirmation', () => {
    wrapper.find('.template-rels > .template-prop').at(1).find('.rel-remove-prop-btn.btn-sm').at(0).simulate('click');
    wrapper.find('div[role="dialog"]').find('.rel-remove-prop-btn').at(0).simulate('click');
    expect(wrapper.state().template.properties.length).toEqual(0);
  });

  //////////////////////////////
  /// RELATIONSHIP TEMPLATES ///
  //////////////////////////////

  // Initialize wrapper
  const relWrapper = mount(
    <NodeTemplate 
      template={test_data.relationship_templates[0]}
      isRelationship={true} 
      nodeTemplates={test_data.templates}
      templateType={1} // RELATIONSHIP
      open={true} />
  );

  // Renders template-container without crashing for relationships
  it('Renders template-container without error for relationships', () => {
    expect(relWrapper.find('.template-container').exists()).toBe(true)
  });

  // Properly renders all template properties (total props + 1 for nid)
  it('Properly renders all relationship template properties', () => {
    expect(relWrapper.find('.template-props .template-prop').length)
      .toEqual(test_data.relationship_templates[0].properties.length+1);
  });

  // Initial 'editing' state should be false for relationships
  it('Initial \'editing\' state should be false for relationships', () => {
    expect(relWrapper.state('editing')).toBe(false);
  });

  // Changes state 'editing' when edit button is clicked for relationships
  it('Changes \'editing\' state when edit button is clicked for relationships', () => {
    relWrapper.find('.template-edit-btn').at(0).simulate('click');
    expect(relWrapper.state('editing')).toBe(true);
  });

  ////////////////////////////////////////
  /// RELATIONSHIP TEMPLATE PROPERTIES ///
  ////////////////////////////////////////

  // Changes relationship template property keys to inputs when edit button is clicked
  it('Changes relationship template property keys to inputs when edit button is clicked', () => {
    expect(relWrapper.state('editing')).toBe(true);
    expect(relWrapper.find('.template-props EditableInput[editing=true] input').length).toBeGreaterThanOrEqual(1);
  });

  // Editing relationship template label changes label and persists when editing stops
  it('Editing relationship template label changes label and persists when editing stops', () => {
    relWrapper.find('.template-label').at(0).find('input[type=\'text\']').at(0).simulate('change', {
      target: { value: 'DIRECTED_FOR' }
    });
    expect(relWrapper.state().template.rel_type).toEqual('DIRECTED_FOR');
    relWrapper.find('.template-edit-btn.btn-default').simulate('click');
    expect(relWrapper.state().template.rel_type).toEqual('DIRECTED_FOR');
  });

  // Editing to node templates properly updates state
  it('Editing to node templates properly updates state', () => {
    relWrapper.find('.to-template-container input[role="combobox"]').at(0).simulate('focus').simulate('change', {
      target: { value: 'Ge' }
    });
    expect(relWrapper.find('.to-template-container .autocomplete-item').length).toEqual(1);
    relWrapper.find('.to-template-container .autocomplete-item').at(0).simulate('click');
    expect(relWrapper.find('input[role="combobox"]').at(0).props().value).toEqual('Genre');
    expect(relWrapper.state().relatedTemplates.toTemplate).toEqual({
      "id": "3152f3c7-ebc8-4e7a-981c-11951f65beee",
      "label": "genre",
      "created_at": "2017-09-08T16:21:02.116Z",
      "updated_at": "2017-09-08T16:21:02.116Z",
      "properties": [
        {
          "id": "c60b7311-b3d8-4812-a1c1-33669b8c9c2a",
          "key": "name",
          "value_type": "string",
          "node_id": "3152f3c7-ebc8-4e7a-981c-11951f65bebb",
          "created_at": "2017-09-08T16:21:02.026Z",
          "updated_at": "2017-09-08T16:21:02.122Z"
        }
      ],
      "in_relationships": [],
      "out_relationships": []
    });
    expect(relWrapper.state().template.to_node_id).toEqual({
      "id": "3152f3c7-ebc8-4e7a-981c-11951f65beee",
      "label": "genre",
      "created_at": "2017-09-08T16:21:02.116Z",
      "updated_at": "2017-09-08T16:21:02.116Z",
      "properties": [
        {
          "id": "c60b7311-b3d8-4812-a1c1-33669b8c9c2a",
          "key": "name",
          "value_type": "string",
          "node_id": "3152f3c7-ebc8-4e7a-981c-11951f65bebb",
          "created_at": "2017-09-08T16:21:02.026Z",
          "updated_at": "2017-09-08T16:21:02.122Z"
        }
      ],
      "in_relationships": [],
      "out_relationships": []
    });
  });

    // Editing from node templates properly updates state
    it('Editing from node templates properly updates state', () => {
      relWrapper.find('.from-template-container input[role="combobox"]').at(0).simulate('focus').simulate('change', {
        target: { value: 'stu' }
      });
      expect(relWrapper.find('.from-template-container .autocomplete-item').length).toEqual(1);
      relWrapper.find('.from-template-container .autocomplete-item').at(0).simulate('click');
      expect(relWrapper.find('.from-template-container input[role="combobox"]').at(0).props().value).toEqual('Studio');
      expect(relWrapper.state().relatedTemplates.fromTemplate).toEqual({
        "id": "3152f3c7-ebc8-4e7a-981c-11951f65beff",
        "label": "studio",
        "created_at": "2017-09-08T16:21:02.116Z",
        "updated_at": "2017-09-08T16:21:02.116Z",
        "properties": [
          {
            "id": "c60b7311-b3d8-4812-a1c1-33669b8c9c2a",
            "key": "name",
            "value_type": "string",
            "node_id": "3152f3c7-ebc8-4e7a-981c-11951f65bebb",
            "created_at": "2017-09-08T16:21:02.026Z",
            "updated_at": "2017-09-08T16:21:02.122Z"
          },
          {
            "id": "c60b7311-b3d8-4812-a1c1-33669b8c9j9d",
            "key": "founded",
            "value_type": "integer",
            "node_id": "3152f3c7-ebc8-4e7a-981c-11951f65bebb",
            "created_at": "2017-09-08T16:21:02.026Z",
            "updated_at": "2017-09-08T16:21:02.122Z"
          }
        ],
        "in_relationships": [],
        "out_relationships": []
      });
      expect(relWrapper.state().template.from_node_id).toEqual({
        "id": "3152f3c7-ebc8-4e7a-981c-11951f65beff",
        "label": "studio",
        "created_at": "2017-09-08T16:21:02.116Z",
        "updated_at": "2017-09-08T16:21:02.116Z",
        "properties": [
          {
            "id": "c60b7311-b3d8-4812-a1c1-33669b8c9c2a",
            "key": "name",
            "value_type": "string",
            "node_id": "3152f3c7-ebc8-4e7a-981c-11951f65bebb",
            "created_at": "2017-09-08T16:21:02.026Z",
            "updated_at": "2017-09-08T16:21:02.122Z"
          },
          {
            "id": "c60b7311-b3d8-4812-a1c1-33669b8c9j9d",
            "key": "founded",
            "value_type": "integer",
            "node_id": "3152f3c7-ebc8-4e7a-981c-11951f65bebb",
            "created_at": "2017-09-08T16:21:02.026Z",
            "updated_at": "2017-09-08T16:21:02.122Z"
          }
        ],
        "in_relationships": [],
        "out_relationships": []
      });
    });

  // Add relationship template property to relationship template when 'Add Property' button is clicked
  it('Add relationship template property to relationship template when Add Property button is clicked', () => {
    relWrapper.find('.template-edit-btn.btn-default').simulate('click');
    relWrapper.find('.template-add-prop-btn.btn-sm').at(0).simulate('click');
    expect(relWrapper.state().template.properties['1']).toEqual({
      "disabled": false,
      "id": 1,
      "key": "new_property",
      "new_prop": true,
      "value_type": "string"
    });
  });

  // Editing new relationship template property key changes property key
  it('Editing new relationship template property key changes property key', () => {
    relWrapper.find('.template-prop').at(2).find('input[type=\'text\']').at(0).simulate('change', {
      target: { value: 'new_prop' }
    });
    expect(relWrapper.state().template.properties['1']).toEqual({
      "disabled": false,
      "id": 1,
      "key": "new_prop",
      "new_prop": true,
      "value_type": "string"
    });
  });

  // Editing new relationship template value type changes value type
  it('Editing new relationship template value type changes value type', () => {
    relWrapper.find('.template-prop').at(2).find('select').at(0).simulate('change', {
      target: { value: 'Integer' }
    });
    expect(relWrapper.state().template.properties['1']).toEqual({
      "disabled": false,
      "id": 1,
      "key": "new_prop",
      "new_prop": true,
      "value_type": "Integer"
    });
  });

  // Editing new relationship template property key is persisted when editing stops
  it('Editing new relationship template property key is persisted when editing stops', () => {
    relWrapper.find('.template-prop').at(2).find('input[type=\'text\']').at(0).simulate('change', {
      target: { value: 'year' }
    });
    relWrapper.find('.template-prop').at(2).find('select').at(0).simulate('change', {
      target: { value: 'Integer' }
    });
    relWrapper.find('.template-edit-btn.btn-default').simulate('click');
    expect(relWrapper.state().template.properties['1']).toEqual({
      "disabled": false,
      "id": 1,
      "key": "year",
      "new_prop": true,
      "value_type": "Integer"
    });
  });

  // Deleting new relationship template property key removes property
  it('Deleting new relationship template property key removes property', () => {
    relWrapper.find('.template-edit-btn.btn-default').simulate('click');
    relWrapper.find('.template-prop').at(2).find('.template-remove-prop-btn.btn-sm').at(0).simulate('click');
    expect(relWrapper.state().template.properties.length).toEqual(1);
  });

  // Deleting existing relationship template property key displays modal
  it('Deleting existing relationship template property key displays modal', () => {
    relWrapper.find('.template-edit-btn.btn-default').simulate('click');
    relWrapper.find('.template-prop').at(1).find('.template-remove-prop-btn.btn-sm').at(0).simulate('click');
    expect(relWrapper.find('div[role="dialog"]').length).toBeGreaterThanOrEqual(1);
  });

  // Deleting existing relationship template property key removes property after confirmation
  it('Deleting existing relationship template property key removes property after confirmation', () => {
    relWrapper.find('.template-edit-btn.btn-default').simulate('click');
    relWrapper.find('.template-prop').at(1).find('.template-remove-prop-btn.btn-sm').at(0).simulate('click');
    relWrapper.find('div[role="dialog"]').find('.template-remove-prop-btn').at(0).simulate('click');
    expect(relWrapper.state().template.properties.length).toEqual(0);
  });

});


