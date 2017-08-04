var cx = require('classnames');
var moment = require('moment-timezone');
var React = require('react');

module.exports = React.createClass({
  displayName: 'Time',
  minuteIncrements: [0, 15, 30, 45],

  displayableHour() {
    var hour = this.props.moment.hour();

    if(hour > 12) {
      hour = hour - 12;
    }

    if(hour === 0) {
      hour = 12;
    }

    return hour;
  },

  displayableMinutes() {
    var minutes = this.props.moment.minute();
    var addLeadingZero = minutes < 10;

    if(addLeadingZero) {
      return `0${minutes}`;
    } else {
      return minutes;
    }
  },

  morningTime() {
    return this.props.moment.hour() < 12;
  },

  increaseHour() {
    this.changeHour(1);
  },

  decreaseHour() {
    this.changeHour(-1);
  },

  changeHour(delta) {
    var m = this.props.moment;
    var newHour = m.hour() + delta;

    if(newHour > 23) {
      newHour = 0;
    }

    if(newHour < 0) {
      newHour = 23;
    }

    m.hours(newHour);

    this.props.onChange(m, this.props.timezone);
  },

  increaseMinutes() {
    var newMinute = this.minuteIncrements[0];

    for(var increment of this.minuteIncrements) {
      if(this.props.moment.minute() < increment) {
        newMinute = increment;
        break;
      }
    }

    this.changeMinute(newMinute);
  },

  decreaseMinutes() {
    var newMinute = this.minuteIncrements[this.minuteIncrements.length - 1];

    for(var increment of this.minuteIncrements) {
      if(this.props.moment.minute() > increment) {
        newMinute = increment;
      }
    }

    this.changeMinute(newMinute);
  },

  changeMinute(newMinute) {
    this.props.moment.minutes(newMinute);
    this.props.onChange(this.props.moment, this.props.timezone);
  },

  changeTimezone(event) {
    let newTimezone = event.target.value;

    // change 3:30pm EST into "3:30pm PST" (instead of actually converting, and saying 12:30pm PST)
    let dateFormat = 'YYYY-MM-DDTHH:mm:ss';
    let timeWithoutTimezone = this.props.moment.format(dateFormat);
    let newMoment = moment.tz(timeWithoutTimezone, dateFormat, newTimezone);

    this.props.onChange(newMoment, newTimezone);
  },

  toggleMeridiem() {
    if(this.morningTime()) {
      this.changeHour(12);
    } else {
      this.changeHour(-12);
    }
  },

  meridiemPicker() {
    var anteClass = 'im-meridiem';
    var postClass = 'im-meridiem im-selected';

    if(this.morningTime()) {
      anteClass = 'im-meridiem im-selected';
      postClass = 'im-meridiem';
    }

    return (
      <div className='im-meridiem-selection' onClick={this.toggleMeridiem}>
        <div className={anteClass}>
          AM
        </div>
        <div className={postClass}>
          PM
        </div>
      </div>
    );
  },

  timezonePicker() {
    if(this.props.timezone) {
      return (
        <div id='im-timezone-container'>
          <div id='im-timezone-header'>
            Time Zone
          </div>
          <select id='timezone' value={this.props.timezone} onChange={this.changeTimezone}>
            <option value='America/Anchorage'>Alaska</option>
            <option value='America/Chicago'>Central</option>
            <option value='America/New_York'>Eastern</option>
            <option value='Pacific/Honolulu'>Hawaii-Aleutian</option>
            <option value='America/Adak'>Hawaii-Aleutian (Alaska)</option>
            <option value='America/Denver'>Mountain</option>
            <option value='America/Phoenix'>Mountain (Arizona)</option>
            <option value='America/Los_Angeles'>Pacific</option>
          </select>
        </div>
      );
    } else {
      return null;
    }
  },

  render() {
    return (
      <div className={cx('m-time', this.props.className)}>
        <div className='im-time-container'>
          <a className='im-arrow' onClick={this.increaseHour}>
            <i className={this.props.upArrowIcon} />
          </a>

          <div className='im-time'>
            {this.displayableHour()}
          </div>

          <a className='im-arrow' onClick={this.decreaseHour}>
            <i className={this.props.downArrowIcon} />
          </a>
        </div>

        <div className='im-separator'>
          :
        </div>

        <div className='im-time-container'>
          <a className='im-arrow' onClick={this.increaseMinutes}>
            <i className={this.props.upArrowIcon} />
          </a>

          <div className='im-time'>
            {this.displayableMinutes()}
          </div>

          <a className='im-arrow' onClick={this.decreaseMinutes}>
            <i className={this.props.downArrowIcon} />
          </a>
        </div>

        {this.meridiemPicker()}
        {this.timezonePicker()}
      </div>
    );
  }
});
