import React from 'react';
import { shallow } from 'enzyme';
import { TextBlock } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<TextBlock />);
  expect(renderedComponent.find('.common-text-block').length).toBe(1);
});
