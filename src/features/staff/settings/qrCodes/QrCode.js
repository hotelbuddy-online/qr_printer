import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { QRCode } from "react-qr-svg";
// import { Typography } from '@material-ui/core';
// import { BitlyClient } from 'bitly';
// const bitly = new BitlyClient('2f5c43d2e02fc07361a11c56176ee2183aafd9d8', {});

export default class QrCode extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
  };

  state = {
    url: ''
  }

  async makeUrl(params) {
    const site = "http://hotelbuddy.online";
    // const site = "http://localhost:6075";
    const venuePart = `/guests/${params.venueId}/`
    const billingPart = `?billingId=${params.billingId}`
    const value = `${site}${venuePart}${params.billingId ? billingPart : ''}`
    this.setState({
      url: value
    })
    // let result;
    // try {
    //   result = await bitly.shorten(value);
    //   console.log('bitly', result)
    //   this.setState({
    //     url: result.url
    //   })
    // } catch (e) {
    //   throw e;
    // }
    // return result;
  }

  render() {
    const { venueId, billingId } = this.props;
    const { url } = this.state;
    if (url === '') this.makeUrl({
      venueId: venueId,
      billingId: billingId
    })

    return (
      <div className="guests-qr-code">
        {/* <p>{billingId}</p> */}
        <QRCode
          bgColor="#FFFFFF"
          fgColor="#000000"
          level="Q"
          style={{ width: 130 }}
          value={url}
        />
        {/* <p>{url}</p> */}
      </div>
    );
  }
}
