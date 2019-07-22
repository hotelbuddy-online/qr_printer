import React from 'react';
import { shallow } from 'enzyme';
import { CloudinaryUpload } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<CloudinaryUpload />);
  expect(renderedComponent.find('.common-cloudinary-upload').length).toBe(1);
});
