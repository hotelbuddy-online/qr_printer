import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../guests/redux/actions';
import { QrCode } from '../../';
import { Typography, Button } from '@material-ui/core';
import { LoadingScreen } from '../../../common';
import domtoimage from 'dom-to-image';
import { strings } from '../../../../data';
import { Document, Page } from 'react-pdf';

export class QrCodes extends Component {
  static propTypes = {
    guests: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  renderTemplate = item => {
     const { template } = this.props;
     const { overlays, viewer, file } = template;

    return <div className="relative">
      <div className="absolute">
        {viewer === 'pdf' ?
          <Document
          file={require(`../../../../images/templates/${file}`)}
        //  onLoadSuccess={this.onDocumentLoadSuccess}
        >
          <Page pageNumber={1} />
        </Document>
          : []}
        {viewer === 'image' ?
          <span>image</span>
          : []}
      </div>
      {overlays.map(overlay => this.renderOverlay(overlay))}
    </div>
  }

  renderOverlay = overlay => {
    const { x1, x2, y1, y2, type } = overlay;
    const width = x2 - x1, height = y2 - y1;
    return (
      <div className="absolute" style={{ left: x1, top: y1, width: width, height: height }}>
        {type === 'logo' ?
          <span>logo</span>
          : []}
        {type === 'qrCode' ?
          <span>qr code</span>
          : []}
      </div>)
  }

  render() {
    const { common, list, category, template } = this.props;
    const { venue } = common;
    if (!list) return <LoadingScreen />
    const { $key: venueId, roomTypes } = venue;
    const { saveToComputer: saveToComputerLbl } = strings[common.language];

    return (
      <div className="staff-qr-codes vertical layout center">

        {category && category.name === 'justQrCodes' ?
          <Button onClick={this.downloadAllToComputer}
          // domtoimage.toBlob(document.getElementById('mainQr'))
          //   .then(function (blob) {
          //     window.saveAs(blob, 'mainQr.png');
          //   })
          >{saveToComputerLbl}</Button>
          : []}

        <div className="horizontal layout wrap">
          {list.map(item =>
            template ?
              this.renderTemplate(item)
              : <div className="wrapper vertical layout">
                <div id={`billingId_${item.billingId}`} className="code">
                  <QrCode
                    venueId={venueId}
                    billingId={item.billingId}
                  />
                </div>
                <Typography variant="body2">{item.billingId}</Typography>
              </div>

          )}
        </div>
      </div>
    );
  }

  downloadAllToComputer = () => {
    const { list, common } = this.props;
    list.map(item => {
      domtoimage.toJpeg(document.getElementById(`billingId_${item.billingId}`), { quality: 1 })
        .then(dataUrl => this.downloadToComputer(dataUrl, item.billingId ? 'QR_main' : `QR_${item.billingId}`))
    })
  }

  downloadToComputer = (dataUrl, fileName) => {
    var link = document.createElement('a');
    link.download = `${fileName}.jpg`;
    link.href = dataUrl;
    link.click();
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    staff: state.staff,
    common: state.common,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QrCodes);
