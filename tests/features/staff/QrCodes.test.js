import React from 'react';
import { shallow } from 'enzyme';
import { QrCodes } from '../../../src/features/staff';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<QrCodes />);
  expect(renderedComponent.find('.staff-qr-codes').length).toBe(1);
});
