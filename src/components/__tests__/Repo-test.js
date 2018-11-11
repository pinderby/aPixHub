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

});


