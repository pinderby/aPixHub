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

  // Changes template property keys to inputs when edit button is clicked
  it('Changes template property keys to inputs when edit button is clicked', () => {
    const wrapper = mount(<NodeTemplate template={test_data.templates[0]}/>);
    wrapper.find('.template-edit-btn.btn-default').simulate('click');
    expect(wrapper.state('editing')).toBe(true);
    expect(wrapper.find('.template-props input[type=\'text\']').length).toBeGreaterThanOrEqual(1);
  });

  // Edits to template only affect state, not props


});


