import React from 'react';
import { shallow } from 'enzyme';
import { LoadingScreen } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<LoadingScreen />);
  expect(renderedComponent.find('.common-loading-screen').length).toBe(1);
});
