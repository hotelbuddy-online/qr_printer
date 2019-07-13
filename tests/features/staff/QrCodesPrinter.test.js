import React from 'react';
import { shallow } from 'enzyme';
import { QrCodesPrinter } from '../../../src/features/staff/QrCodesPrinter';

describe('staff/QrCodesPrinter', () => {
  it('renders node with correct class name', () => {
    const props = {
      staff: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <QrCodesPrinter {...props} />
    );

    expect(
      renderedComponent.find('.staff-qr-codes-printer').length
    ).toBe(1);
  });
});
