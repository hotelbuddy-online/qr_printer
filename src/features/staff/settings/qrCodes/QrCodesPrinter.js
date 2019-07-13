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
    paperSize: null,  // A4 | A5 | Letter | half Letter | Legal | half Legal
    itemSize: null, // full | half | credit card | 50mm x 50mm
  }

  handleChangeSelect = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    this.setState({
      [name]: value
    })
  }

  render() {
    const { category, option, paperSize, itemSize } = this.state;
    const { common } = this.props;
    var categoryObj, optionObj
    if (category) {
      categoryObj = printing.filter(item => item.name === category)[0];
    }
    if (option)
      optionObj = categoryObj.options.filter(item => item.name === option)[0];
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

        <ReactToPrint
          trigger={() => <a href="#">Print this out!</a>}
          content={() => this.componentRef}
        />
        <QrCodes ref={el => (this.componentRef = el)}
          category={categoryObj}
          optionObj={optionObj}
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
