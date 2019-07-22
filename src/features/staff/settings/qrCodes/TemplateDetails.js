import React, { Component } from 'react';
import { CloudinaryUpload } from '../../../common';

export default class TemplateDetails extends Component {
  static propTypes = {

  };

  render() {
    return (
      <div className="staff-settings-qr-codes-template-details">
        Component content: staff/settings/qrCodes/TemplateDetails
        <CloudinaryUpload />
      </div>
    );
  }
}
