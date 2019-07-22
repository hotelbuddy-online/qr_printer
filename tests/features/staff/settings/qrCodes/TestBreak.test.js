import React from 'react';
import { shallow } from 'enzyme';
import { TestBreak } from '../../../src/features/staff';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<TestBreak />);
  expect(renderedComponent.find('.staff-test-break').length).toBe(1);
});
