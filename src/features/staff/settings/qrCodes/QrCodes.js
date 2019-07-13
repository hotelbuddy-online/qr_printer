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

// const layouts = [
//   {
//     name: 'key fobs',
//     width: 120,
//   },
//   {
//     name: 'room leaflets',
//     width: 200,
//   },
// ]

export class QrCodes extends Component {
  static propTypes = {
    guests: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    const { common, category, optionObj } = this.props;
    const { venue } = common;
    if (!venue) return <LoadingScreen />
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

        {
          category && category.main ?
            <div id="mainQr" className="code">
              <QrCode
                venueId={venueId}
              />
            </div>
            : []
        }

        {
          category && category.rooms ?
            <div className="vertical layout">
              {roomTypes.map((roomType, index) =>
                <div key={index}>
                  <Typography variant="h4">{roomType.name}</Typography>
                  <div className="horizontal layout wrap center-justified">
                    {roomType.dorms ?
                      //rooms with numbers assigned
                      roomType.dorms.map(dorm => {
                        let out = []
                        for (let billingId = dorm.bedNumberStart; billingId < (dorm.bedNumberStart + roomType.beds); billingId++) {
                          out.push(billingId)
                        }
                        return (out.map(outId =>
                          <div id={`billingId_${outId}`} className="code">
                            <QrCode
                              venueId={venueId}
                              billingId={outId}
                            />
                          </div>
                        ))
                      })
                      :
                      // rooms with names
                      roomType.names.map(billingId =>
                        <div id={`billingId_${billingId}`} className="code">
                          <QrCode key={billingId}
                            venueId={venueId}
                            billingId={billingId}
                          />
                        </div>
                      )}
                  </div>
                </div>
              )}
            </div>
            : []
        }
      </div >
    );
  }


  downloadAllToComputer = () => {
    const { category, common } = this.props;
    const { venue } = common;
    const { roomTypes } = venue;

    if (category.main)
      domtoimage.toJpeg(document.getElementById('mainQr'), { quality: 1 })
        .then(dataUrl => this.downloadToComputer(dataUrl, 'QR_main'))
    if (category.rooms) {
      let out = []
      roomTypes.map(roomType => {
        roomType.dorms ?
          //rooms with numbers assigned
          roomType.dorms.map(dorm => {
            for (let billingId = dorm.bedNumberStart; billingId < (dorm.bedNumberStart + roomType.beds); billingId++) {
              out.push({
                room: dorm.name,
                billingId: billingId
              })
            }
          })
          :
          // rooms with names
          roomType.names.map(billingId =>
            out.push({
              billingId: billingId
            })
          )
      })
      out.map(item => {
        domtoimage.toJpeg(document.getElementById(`billingId_${item.billingId}`), { quality: 1 })
          .then(dataUrl => this.downloadToComputer(dataUrl, `QR_${item.billingId}`))
      })
    }
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
