import React from 'react';
import { shallow } from 'enzyme';
import { StyleBuilder } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<StyleBuilder />);
  expect(renderedComponent.find('.common-style-builder').length).toBe(1);
});
