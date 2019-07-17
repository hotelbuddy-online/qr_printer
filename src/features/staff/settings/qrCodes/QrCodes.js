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
        const { overlays, viewer, file, width, height } = template;
        //  const { width, height } = template;
        const styleObj = {};
        if (width) styleObj.width = `${width}px`
        if (height) styleObj.height = `${height}px`
        const fileSrc = file ? require(`../../../../images/templates/${file}`) : null
        return <div className="relative" style={styleObj}>
            <div className="absolute">
                {viewer === 'pdf' ?
                    <Document
                        file={fileSrc}
                    //  onLoadSuccess={this.onDocumentLoadSuccess}
                    >
                        <Page pageNumber={1} />
                    </Document>
                    : []}
                {viewer === 'image' ?
                    <img src={fileSrc} alt="" />
                    : []}
            </div>
            {overlays.map(overlay => this.renderOverlay(overlay, item))}
        </div>
    }

    renderOverlay = (overlay, item) => {
        const { common } = this.props;
        const { venue } = common;
        const { left, top, width, height, type } = overlay;
        return (
            <div id={type} className="absolute overlay" style={{ left: left, top: top, width: width, height: height }}>
                {type === 'logo' ?
                    <span>logo</span>
                    : []}
                {type === 'qrCode' ?
                    <QrCode
                        venueId={venue.$key}
                        billingId={item.billingId}
                    />
                    : []}
            </div>)
    }

    render() {
        const { common, list, category, template } = this.props;
        if (!template) return null;

        const { venue } = common;
        if (!list) return <LoadingScreen />
        const { $key: venueId, roomTypes } = venue;
        const { saveToComputer: saveToComputerLbl } = strings[common.language];

        return (
            <div className="staff-qr-codes full-width full-height">

                {category && category.name === 'justQrCodes' ?
                    <Button onClick={this.downloadAllToComputer}
                    // domtoimage.toBlob(document.getElementById('mainQr'))
                    //   .then(function (blob) {
                    //     window.saveAs(blob, 'mainQr.png');
                    //   })
                    >{saveToComputerLbl}</Button>
                    : []}

                <div className="full-height horizontal layout wrap">
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
