import React from 'react';
import { shallow, mount, render } from 'enzyme';
import NodeTemplate from '../NodeTemplate/NodeTemplate';

// NodeTemplate.js
describe('NodeTemplate Component', () => {
 
  // Renders template-container without crashing
  it('should render template-container without error', () => {
    expect(shallow(<NodeTemplate />).find('.template-container').exists()).toBe(true)
  })
 })
