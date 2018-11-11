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
    console.log(wrapper.find('.create-template-btn').at(1).debug());
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

});


