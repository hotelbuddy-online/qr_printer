import React from 'react';
import { shallow } from 'enzyme';
import { TemplateDetails } from '../../../src/features/staff';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<TemplateDetails />);
  expect(renderedComponent.find('.staff-template-details').length).toBe(1);
});
