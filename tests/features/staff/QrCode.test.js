import React from 'react';
import { shallow } from 'enzyme';
import { QrCode } from '../../../src/features/staff';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<QrCode />);
  expect(renderedComponent.find('.staff-qr-code').length).toBe(1);
});
