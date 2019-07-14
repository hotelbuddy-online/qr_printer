import React, { Component } from 'react';
import ReactToPrint from 'react-to-print';
import { QrCodes } from '../../';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../guests/redux/actions';
import { FormControl, Select, FilledInput, MenuItem, Typography, Button } from '@material-ui/core';
import printing from '../../../../data/printing';
import { strings } from '../../../../data';

export class QrCodesPrinter extends Component {
  static propTypes = {
    guests: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  state = {
    category: null,  // just_codes | main_code | rooms_or_beds
    option: null,    // reception,restaurant  | keyfobs |
    template: null,    //
    paperSize: null,  // A4 | A5 | Letter | half Letter | Legal | half Legal
    itemSize: null, // full | half | credit card | 50mm x 50mm
  }

  handleChangeSelect = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    this.setState({
      [name]: value
    }, () => {
      if (name === 'category')
        this.makeList()
    })
  }

  makeList = () => {
    const { common } = this.props;
    const { category } = this.state;
    const { venue } = common;
    const { roomTypes } = venue;

    var categoryObj, optionObj
    if (category) {
      categoryObj = printing.filter(item => item.name === category)[0];
    }

    let out = []

    if (!category) return null;
    if (categoryObj.main)
      out.push({
        main: true,
        room: null,
        billingId: null
      })

    if (categoryObj.rooms) {
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

    }
    this.setState({
      list: out
    })
    console.log('list', out)
    // out.map(item => {
    //   domtoimage.toJpeg(document.getElementById(`billingId_${item.billingId}`), { quality: 1 })
    //     .then(dataUrl => this.downloadToComputer(dataUrl, `QR_${item.billingId}`))
    // })
  }
  // }
  render() {
    const { category, option, template, list, paperSize, itemSize } = this.state;
    const { common } = this.props;

    const categoryObj = category ? printing.filter(item => item.name === category)[0] : null;
    const optionObj = option ? categoryObj.options.filter(item => item.name === option)[0] : null;
    const templateObj = template ? optionObj.templates.filter(item => item.name === template)[0] : null;
    return (
      <div className="staff-qr-codes-printer vertical layout center">
        <FormControl variant="filled">
          {/* <InputLabel htmlFor="edit-language">{languageLbl}</InputLabel> */}
          <Select className="selects"
            value={category}
            onChange={this.handleChangeSelect}
            input={<FilledInput name="category" />}
          > {printing.map((cat, index) =>
            <MenuItem value={cat.name} classes={{ root: '' }} key={index}>
              <Typography variant="subtitle1">{strings[common.language][cat.name]}</Typography>
            </MenuItem>
          )}
          </Select>
        </FormControl>

        {category === 'justQrCodes' ?
          []
          : <FormControl variant="filled">
            {/* <InputLabel htmlFor="edit-language">{languageLbl}</InputLabel> */}
            <Select className="selects"
              value={option}
              onChange={this.handleChangeSelect}
              input={<FilledInput name="option" />}
            > {categoryObj && categoryObj.options.map((opt, index) =>
              <MenuItem value={opt.name} classes={{ root: '' }} key={index}>
                <Typography variant="subtitle1">{opt.name}</Typography>
              </MenuItem>
            )}
            </Select>
          </FormControl>
        }

        {optionObj === null ?
          []
          : <FormControl variant="filled">
            {/* <InputLabel htmlFor="edit-language">{languageLbl}</InputLabel> */}
            <Select className="selects"
              value={template}
              onChange={this.handleChangeSelect}
              input={<FilledInput name="template" />}
            > {optionObj && optionObj.templates.map((templ, index) =>
              <MenuItem value={templ.name} classes={{ root: '' }} key={index}>
                <Typography variant="subtitle1">{templ.name}</Typography>
              </MenuItem>
            )}
            </Select>
          </FormControl>
        }

        <ReactToPrint
          trigger={() => <a href="#">Print this out!</a>}
          content={() => this.componentRef}
        />
        <QrCodes ref={el => (this.componentRef = el)}
          list={list}
          category={categoryObj}
          options={optionObj}
          template={templateObj}
        />
      </div>
    );
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
)(QrCodesPrinter);
