import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../guests/redux/actions';
import { QrCode } from '../../';
import { Typography, Button } from '@material-ui/core';
import { LoadingScreen, TextBlock } from '../../../common';
import domtoimage from 'dom-to-image';
import { strings, paperSizes } from '../../../../data';
import { Document, Page } from 'react-pdf';

export class QrCodes extends Component {
    static propTypes = {
        guests: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired,
    };

    renderRows = (list) => {
        const { template } = this.props;
        const { itemsPerRow, rowsPerPage } = template;
        // const itemsPerRow = 4
        const numberRows = Math.ceil(list.length / itemsPerRow)
        var out = Array.from(Array(numberRows))
        return out.map((row, index) => {
            const pageBreakAfter = index > 0 && ((index + 1) % rowsPerPage === 0)
            const pageBreak = index > 0 && (index % rowsPerPage === 0)
            return <div className={`horizontal layout ${pageBreakAfter ? 'pageBreakAfter' : ''} ${pageBreak ?
            'pageBreak':''}`}>
                {this.renderRow(index, list, itemsPerRow)}
            </div>
        })
    }

    renderRow = (i, list, itemsPerRow) => {
        const startAt = i * itemsPerRow;
        const arr = list.slice(startAt, startAt + itemsPerRow)
        return arr.map(item => this.renderTemplate(item))
    }

    renderTemplate = (item) => {
        const { template, width, height, size } = this.props;
        // const styleObj = {};
        // if (width) styleObj.width = `${width}`
        // if (height) styleObj.height = `${height}`
        // const { template } = this.props;
        const { overlays, style } = template;
        const paperList = paperSizes.filter(psize => psize.name === size)
        const sizeClass = paperList.length === 1 ? paperList[0].cssClass : '';

        // return <span className="relative" style={styleObj}>
        return <span className={`relative ${sizeClass}`} style={style}>
            {overlays.map(overlay => this.renderOverlay(overlay, item))}
        </span>
    }

    renderOverlay = (overlay, item) => {
        const { common } = this.props;
        const { venue } = common;
        const { logo } = venue;

        const { type, text, style, textStyle, file } = overlay;
        const fileSrc = file ? require(`../../../../images/templates/${file}`) : null

        return (
            <div id={type} key={type} className="absolute overlay" style={style}>

                {type === 'pdf' ?
                    <Document
                        file={fileSrc}
                    //  onLoadSuccess={this.onDocumentLoadSuccess}
                    >
                        <Page pageNumber={1} />
                    </Document>
                    : []}
                {type === 'image' ?
                    <img src={fileSrc} alt="" style={{
                        ...style,
                        width: '100%'
                    }} />
                    : []}
                {type === 'logo' ?
                    logo && logo.url ?
                        <img className="contain" src={logo.url} style={{
                            ...logo.style,
                            width: '100%',
                            height: '100%',
                        }} />
                        : <span>no logo in venue</span>
                    : []}
                {type === 'qrCode' ?
                    <QrCode
                        venueId={venue.$key}
                        billingId={item.billingId}
                    />
                    : []}
                {type === 'text' ?
                    text.map((textLine, index) =>
                        <TextBlock key={index}
                            common={common}
                            text={this.replaceCodes(textLine, item)}
                            style={textStyle}
                        />
                    )
                    : []}
            </div>)
    }

    replaceCodes = (text, item) => {
        const { common } = this.props;
        const { venue } = common;
        console.log('codes', text, item)
        // if (text.includes('{bed}') && !item.billingId) return null
        if (item.dorm)
            return text
                .replace('{room}', item.room)
                .replace('{bed}', item.billingId)
        else return text.includes('{room}') ? item.room : null
    }

    render() {
        const { common, list, category, template } = this.props;
        if (!template && (category && category.name !== 'justQrCodes')) return null;

        const { venue } = common;
        if (!list) return <LoadingScreen />
        const { $key: venueId, roomTypes } = venue;
        const { saveToComputer: saveToComputerLbl } = strings[common.language];

        return (
            <div className="staff-qr-codes full-width full-height">

                {category && category.name === 'justQrCodes' ?
                    <div>
                        <Button onClick={this.downloadAllToComputer}
                        >{saveToComputerLbl}</Button>
                        {list.map(item =>
                            <div className="wrapper vertical layout">
                                <div id={`billingId_${item.billingId}`} className="code">
                                    <QrCode
                                        venueId={venueId}
                                        billingId={item.dorm ? item.billingId : item.room}
                                    />
                                </div>
                                <Typography variant="body2">{item.billingId}</Typography>
                            </div>
                        )}

                    </div>
                    :
                    <div className="full-height">
                        <div>
                            {this.renderRows(list)}
                        </div>
                    </div>
                }

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
