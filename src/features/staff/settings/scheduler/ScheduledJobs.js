import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import { Typography, Checkbox, IconButton } from '@material-ui/core';
import { Add as AddIcon, } from '@material-ui/icons';
import { LoadingScreen } from '../../../common';
import { strings } from '../../../../data';

export class ScheduledJobs extends Component {
  static propTypes = {
    staff: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    const { staff, common } = this.props;
    const { venue } = common;
    const { scheduled_jobs } = staff;
    const { scheduler: schedulerLbl } = strings[common.language]
    if (!scheduled_jobs) return <LoadingScreen />

    return (
      <div className="staff-scheduled-jobs flex full-width vertical layout">
        <Typography variant="h2">{schedulerLbl}</Typography>
        {scheduled_jobs.map((job, index) => {
          const { $key: jobId, name, active } = job;
          return <Link className="horizontal layout center"
            to={`/staff/${venue.$key}/scheduler/${jobId}/`}
            key={index}>
            <Checkbox checked={active} />
            <Typography variant="body2">
              {name}
            </Typography>
          </Link>
        })}

        <div className="flex vertical layout end-justified pointerEventsNone">
          <div className="horizontal layout end-justified">
            <Link to={`/staff/${venue.$key}/scheduler/add_job`} className="pointerEventsAll">
              <IconButton>
                <AddIcon className="addIcon" style={{ fontSize: '48px' }} />
              </IconButton>
            </Link>
          </div>
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
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduledJobs);
