import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import * as commonActions from '../../../common/redux/actions';
import { LoadingScreen } from '../../../common';
import { strings } from '../../../../data';
import { Typography, Button, TextField, Icon, IconButton, FormControlLabel, FormControl, Checkbox } from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import { KeyboardTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';


export class ScheduledJob extends Component {
  static propTypes = {
    staff: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  state = {
    job: {
      days: {
        mon: null,
        tue: null,
        wed: null,
        thu: null,
        fri: null,
        sat: null,
        sun: null,
      }
    },
    loaded: false,
  }

  // componentDidUpdate() {
  //   const { match, common, staff } = this.props;
  //   const { jobId } = match.params;
  //   const { scheduled_jobs } = staff;
  //   if (!scheduled_jobs) return null;
  //   const job = jobId === 'add_job' ? {} : scheduled_jobs.filter(job => job.$key === jobId)[0];

  //   if (!this.state.loaded)
  //     this.setState({
  //       job: job,
  //       loaded: true,
  //       editName: false,
  //     })
  // }

  componentWillMount() {
    const { match, common, staff } = this.props;
    const { jobId } = match.params;
    const { scheduled_jobs } = staff;
    if (!scheduled_jobs) return null;
    const job = jobId === 'add_job' ? {} : scheduled_jobs.filter(job => job.$key === jobId)[0];

    if (!this.state.loaded)
      this.setState({
        job: {
          days: {
            mon: true,
            tue: true,
            wed: true,
            thu: true,
            fri: true,
            sat: true,
            sun: true,
          },
          ...job,
        },
        loaded: true,
        editName: false,
      })
    // this.setState({
    //   loaded: false,
    //   editName: false,
    // })
  }

  cancel = e => {
    const { history, common } = this.props;
    history.push(`/staff/${common.venue.$key}/scheduler/`)
  }

  save = e => {
    const { common, commonActions, history } = this.props;
    const { job } = this.state;
    const { venue } = common
    commonActions.editVenueCollection({
      venueId: venue.$key,
      language: 'scheduled_jobs',
      collection: job.$key,
      value: {
        ...job,
        venueId: venue.$key, // need this as scheduler uses collectionGroup,
      },
      add: (!job.$key || job.$key === 'add_job')
    })
    history.push(`/staff/${common.venue.$key}/scheduler/`)
  }

  handleChange = e => {
    const { name, value } = e.currentTarget
    this.setState({
      job: {
        ...this.state.job,
        [name]: value
      }
    })
  }

  handleChangeTime = value => {
    this.setState({
      job: {
        ...this.state.job,
        time: new Date(value).getTime(),
      }
    })
  }

  handleChangeDay = e => {

    const day = e.target.getAttribute('name')
    // const value = e.target.getAttribute('value')
    console.log(day)
    var { days } = this.state.job
    days[day] = !days[day]
    this.setState({
      job: {
        ...this.state.job,
        days: days
      }
    })
  }

  handleMessageCheckbox = e => {
    const name = e.target.getAttribute('name')
    const value = e.target.checked
    this.setState({
      job: {
        ...this.state.job,
        [name]: value
      }
    })
  }

  handleChangeMessage = e => {

    const name = e.target.getAttribute('name')
    const value = e.target.value
    console.log(name)
    this.setState({
      job: {
        ...this.state.job,
        [name]: {
          en: value,
          ...this.state[name]
        }
      }
    })
  }

  render() {
    const { match, common, staff } = this.props;
    const { editName, job } = this.state;
    if (!job.days) return <LoadingScreen />
    const { jobId } = match.params;
    const { scheduled_jobs } = staff;
    if (!scheduled_jobs) return <LoadingScreen />
    const { active, name, time, notification, notificationTitle, notificationBody, msg, message } = this.state.job;
    const notificationTitleVal = notificationTitle && notificationTitle.en ? notificationTitle.en : '';
    const notificationBodyVal = notificationBody && notificationBody.en ? notificationBody.en : '';
    const msgVal = msg ? msg.en : '';
    const { addJob: addJobLbl, enable: enableLbl, disable: disableLbl,
      cancel: cancelLbl, save: saveLbl, jobName: jobNameLbl, at: atLbl, every: everyLbl,
      title: titleLbl, message: msgLbl, notification: notificationLbl, message: messageLbl } = strings[common.language];
    const nameLbl = (jobId === 'add_job' ? addJobLbl : name);
    const buttonLbl = active ? disableLbl : enableLbl
    // const timeVal = `${hour ? hour : '00'}:${minute ? minute : '00'}`;
    // console.log('timeval', timeVal);

    return (
      <div className="staff-scheduled-job flex full-width vertical layout center">
        <div className="horizontal layout center center-justified">
          {editName ?
            <TextField placeholder={jobNameLbl} value={name} name="name"
              onChange={this.handleChange}
              onKeyPress={e => {
                if (e.charCode === 13)
                  this.setState({
                    editName: false
                  })
              }}
            />
            : <Typography variant="h4" className="textAlignCenter" >{nameLbl}</Typography>
          }
          {jobId !== 'add_job' && !editName ?
            <IconButton onClick={e => this.setState({
              editName: true
            })}>
              <Edit />
            </IconButton>
            : []}
        </div>
        {jobId === 'add_job' ?
          <TextField placeholder={jobNameLbl} value={name} name="name" onChange={this.handleChange} />
          : []}
        <div className="horizontal layout center-justified">
          <Button onClick={() => this.setState({
            job: {
              ...job,
              active: !active
            }
          })}>
            {buttonLbl}
          </Button>
        </div>

        <Typography variant="body1">{atLbl}</Typography>

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardTimePicker name="time" value={time} onChange={this.handleChangeTime} mode="24h" />
        </MuiPickersUtilsProvider>

        <Typography variant="body1">{everyLbl}</Typography>

        <div className="vertical layout center" style={{ margin: '20px' }}>
          <div className="horizontal layout wrap">
            {['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].map(day => {
              return (<FormControl variant="filled" key={day}>
                <FormControlLabel
                  control={
                    <Checkbox checked={job.days[day]} name={day}
                      // onChange={() => self.handleChangeDay(index).bind(self)} />
                      onChange={this.handleChangeDay} />
                  }
                  label={day}
                />
              </FormControl>)
            }
            )}
          </div>
        </div>

        <div className="horizontal layout justified">
          <div className="messages vertical layout center">
            <FormControl variant="filled">
              <FormControlLabel
                control={
                  <Checkbox checked={notification} name="notification"
                    // onChange={() => self.handleChangeDay(index).bind(self)} />
                    onChange={this.handleMessageCheckbox} />
                }
                label={notificationLbl}
              />
            </FormControl>

            <FormControl className={notification ? '' : 'disabled'}>
              <TextField
                placeholder={titleLbl}
                value={notificationTitleVal}
                name="notificationTitle"
                onChange={this.handleChangeMessage} />
            </FormControl>

            <FormControl className={`flex overflowYAuto ${notification ? '' : 'disabled'}`}>
              <TextField multiline
                placeholder={msgLbl}
                value={notificationBodyVal}
                name="notificationBody"
                onChange={this.handleChangeMessage} />
            </FormControl>

          </div>

          <div className="messages vertical layout center" >
            <FormControl variant="filled">
              <FormControlLabel
                control={
                  <Checkbox checked={message} name="message"
                    onChange={this.handleMessageCheckbox} />
                }
                label={messageLbl}
              />
            </FormControl>

            <FormControl className={`flex overflowYAuto ${message ? '' : 'disabled'}`}>
              <TextField multiline
                placeholder={msgLbl}
                value={msgVal}
                name="msg"
                onChange={this.handleChangeMessage} />
            </FormControl>

          </div>
        </div>

        {/* <FormControl variant="filled" >
          <FormControlLabel
            control={
              <TextField value={job.date} name="date" type="number"
                onChange={this.handleChangeDates} />
            }
            label={job.date}
          />
        </FormControl> */}

        <div className="flex"></div>
        <div className="full-width horizontal layout center-justified">
          <Button onClick={this.cancel}>{cancelLbl}</Button>
          <Button onClick={this.save}>{saveLbl}</Button>
        </div>
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
    actions: bindActionCreators({ ...actions }, dispatch),
    commonActions: bindActionCreators({ ...commonActions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduledJob);
