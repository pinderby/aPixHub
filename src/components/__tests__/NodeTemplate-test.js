import React from 'react';
import { shallow, mount, render } from 'enzyme';
import NodeTemplate from '../NodeTemplate/NodeTemplate';
import test_data from '../../test_data.json';

// NodeTemplate.js
describe('NodeTemplate Component', () => {
 
  // Renders template-container without crashing
  it('Renders template-container without error', () => {
    expect(shallow(<NodeTemplate />).find('.template-container').exists()).toBe(true)
  });

  // Properly renders all template properties (total props + 1 for nid)
  it('Properly renders all template properties', () => {
    expect(shallow(<NodeTemplate template={test_data.templates[0]}/>)
      .find('.template-props .template-prop').length).toEqual(test_data.templates[0].properties.length+1);
  });

  // Properly renders both template relationship directions
  it('Properly renders both template relationship directions', () => {
    expect(shallow(<NodeTemplate template={test_data.templates[0]}/>)
      .find('.template-rels .template-rel').length).toEqual(2);
  });

  // Initial 'editing' state should be false
  it('Initial \'editing\' state should be false', () => {
    const wrapper = shallow(<NodeTemplate template={test_data.templates[0]}/>);
    expect(wrapper.state('editing')).toBe(false);
  });

  // Changes state 'editing' when edit button is clicked
  it('Changes \'editing\' state when edit button is clicked', () => {
    const wrapper = shallow(<NodeTemplate template={test_data.templates[0]}/>);
    wrapper.find('.template-edit-btn').simulate('click');
    expect(wrapper.state('editing')).toBe(true);
  });

  ///////////////////////////
  /// TEMPLATE PROPERTIES ///
  ///////////////////////////

  // Changes template property keys to inputs when edit button is clicked
  it('Changes template property keys to inputs when edit button is clicked', () => {
    const wrapper = mount(<NodeTemplate template={test_data.templates[0]}/>);
    wrapper.find('.template-edit-btn.btn-default').simulate('click');
    expect(wrapper.state('editing')).toBe(true);
    expect(wrapper.find('.template-props EditableInput[editing=true] input').length).toBeGreaterThanOrEqual(1);
  });

  // Add template property to template when 'Add Property' button is clicked
  it('Add template property to template when Add Property button is clicked', () => {
    const wrapper = mount(<NodeTemplate template={test_data.templates[0]}/>);
    wrapper.find('.template-edit-btn.btn-default').simulate('click');
    wrapper.find('.template-add-prop-btn.btn-sm').simulate('click');
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
    const wrapper = mount(<NodeTemplate template={test_data.templates[0]}/>);
    wrapper.find('.template-edit-btn.btn-default').simulate('click');
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
    const wrapper = mount(<NodeTemplate template={test_data.templates[0]}/>);
    wrapper.find('.template-edit-btn.btn-default').simulate('click');
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
    const wrapper = mount(<NodeTemplate template={test_data.templates[0]}/>);
    wrapper.find('.template-edit-btn.btn-default').simulate('click');
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
    const wrapper = mount(<NodeTemplate template={test_data.templates[0]}/>);
    wrapper.find('.template-edit-btn.btn-default').simulate('click');
    wrapper.find('.template-prop').at(2).find('.template-remove-prop-btn.btn-sm').at(0).simulate('click');
    expect(wrapper.state().template.properties.length).toEqual(1);
  });

  // Deleting existing template property key displays modal
  it('Deleting existing template property key displays modal', () => {
    const wrapper = mount(<NodeTemplate template={test_data.templates[0]}/>);
    wrapper.find('.template-edit-btn.btn-default').simulate('click');
    wrapper.find('.template-prop').at(1).find('.template-remove-prop-btn.btn-sm').at(0).simulate('click');
    expect(wrapper.find('div[role="dialog"]').length).toBeGreaterThanOrEqual(1);
  });

  // Deleting existing template property key removes property after confirmation
  it('Deleting existing template property key removes property after confirmation', () => {
    const wrapper = mount(<NodeTemplate template={test_data.templates[0]}/>);
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
    const wrapper = mount(<NodeTemplate template={test_data.templates[0]}/>);
    wrapper.find('.template-edit-btn.btn-default').simulate('click');
    expect(wrapper.state('editing')).toBe(true);
    expect(wrapper.find('.template-rels .template-prop EditableInput[editing=true] input').length).toBeGreaterThanOrEqual(1);
  });

  // Add relationship property to relationship when 'Add Property' button is clicked
  it('Add relationship property to relationship when Add Property button is clicked', () => {
    const wrapper = mount(<NodeTemplate template={test_data.templates[0]}/>);
    wrapper.find('.template-edit-btn.btn-default').simulate('click');
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
    const wrapper = mount(<NodeTemplate template={test_data.templates[0]}/>);
    wrapper.find('.template-edit-btn.btn-default').simulate('click');
    wrapper.find('.rel-add-prop-btn.btn-sm').at(0).simulate('click');
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
    const wrapper = mount(<NodeTemplate template={test_data.templates[0]}/>);
    wrapper.find('.template-edit-btn.btn-default').simulate('click');
    wrapper.find('.rel-add-prop-btn.btn-sm').at(0).simulate('click');
    wrapper.find('.template-rels > .template-prop').at(1).find('select').at(0).simulate('change', {
      target: { value: 'Integer' }
    });
    expect(wrapper.state().template.in_relationships['0'].properties['1']).toEqual({
      "disabled": false,
      "id": 1,
      "key": "new_property",
      "new_prop": true,
      "value_type": "Integer"
    });
  });

  // Editing new relationship property key is persisted when editing stops
  it('Editing new relationship property key is persisted when editing stops', () => {
    const wrapper = mount(<NodeTemplate template={test_data.templates[0]}/>);
    wrapper.find('.template-edit-btn.btn-default').simulate('click');
    wrapper.find('.rel-add-prop-btn.btn-sm').at(0).simulate('click');
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
    const wrapper = mount(<NodeTemplate template={test_data.templates[0]}/>);
    wrapper.find('.template-edit-btn.btn-default').simulate('click');
    wrapper.find('.rel-add-prop-btn.btn-sm').at(0).simulate('click');
    wrapper.find('.template-rels > .template-prop').at(1).find('.rel-remove-prop-btn.btn-sm').at(0).simulate('click');
    expect(wrapper.state().template.in_relationships['0'].properties.length).toEqual(1);
  });

  // Deleting existing relationship property key displays modal
  it('Deleting existing relationship property key displays modal', () => {
    const wrapper = mount(<NodeTemplate template={test_data.templates[0]}/>);
    wrapper.find('.template-edit-btn.btn-default').simulate('click');
    wrapper.find('.template-rels > .template-prop').at(1).find('.rel-remove-prop-btn.btn-sm').at(0).simulate('click');
    expect(wrapper.find('div[role="dialog"]').length).toBeGreaterThanOrEqual(1);
  });

  // Deleting existing relationship property key removes property after confirmation
  it('Deleting existing relationship property key removes property after confirmation', () => {
    const wrapper = mount(<NodeTemplate template={test_data.templates[0]}/>);
    wrapper.find('.template-edit-btn.btn-default').simulate('click');
    wrapper.find('.template-rels > .template-prop').at(1).find('.rel-remove-prop-btn.btn-sm').at(0).simulate('click');
    wrapper.find('div[role="dialog"]').find('.rel-remove-prop-btn').at(0).simulate('click');
    expect(wrapper.state().template.properties.length).toEqual(0);
  });


});


