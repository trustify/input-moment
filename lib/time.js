'use strict';

var cx = require('classnames');
var moment = require('moment-timezone');
var React = require('react');

module.exports = React.createClass({
    displayName: 'Time',
    displayableHour: function displayableHour() {
        var hour = this.props.moment.hour();

        if (hour > 12) {
            hour = hour - 12;
        }

        if (hour === 0) {
            hour = 12;
        }

        return hour;
    },
    displayableMinutes: function displayableMinutes() {
        var minutes = this.props.moment.minute();
        var addLeadingZero = minutes < 10;

        if (addLeadingZero) {
            return '0' + minutes;
        } else {
            return minutes;
        }
    },
    morningTime: function morningTime() {
        return this.props.moment.hour() < 12;
    },
    increaseHour: function increaseHour() {
        this.changeHour(1);
    },
    decreaseHour: function decreaseHour() {
        this.changeHour(-1);
    },
    changeHour: function changeHour(delta) {
        var m = this.props.moment;
        var newHour = m.hour() + delta;

        if (newHour > 23) {
            newHour = 0;
        }

        if (newHour < 0) {
            newHour = 23;
        }

        m.hours(newHour);

        this.props.onChange(m, this.props.timezone);
    },
    increaseMinutes: function increaseMinutes() {
        var newMinute = this.props.minuteIncrements[0];

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = this.props.minuteIncrements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var increment = _step.value;

                if (this.props.moment.minute() < increment) {
                    newMinute = increment;
                    break;
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        this.changeMinute(newMinute);
    },
    decreaseMinutes: function decreaseMinutes() {
        var newMinute = this.props.minuteIncrements[this.props.minuteIncrements.length - 1];

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = this.props.minuteIncrements[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var increment = _step2.value;

                if (this.props.moment.minute() > increment) {
                    newMinute = increment;
                }
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }

        this.changeMinute(newMinute);
    },
    changeMinute: function changeMinute(newMinute) {
        this.props.moment.minutes(newMinute);
        this.props.onChange(this.props.moment, this.props.timezone);
    },
    changeTimezone: function changeTimezone(event) {
        var newTimezone = event.target.value;

        // change 3:30pm EST into "3:30pm PST" (instead of actually converting, and saying 12:30pm PST)
        var dateFormat = 'YYYY-MM-DDTHH:mm:ss';
        var timeWithoutTimezone = this.props.moment.format(dateFormat);
        var newMoment = moment.tz(timeWithoutTimezone, dateFormat, newTimezone);

        this.props.onChange(newMoment, newTimezone);
    },
    toggleMeridiem: function toggleMeridiem() {
        if (this.morningTime()) {
            this.changeHour(12);
        } else {
            this.changeHour(-12);
        }
    },
    meridiemPicker: function meridiemPicker() {
        var anteClass = 'im-meridiem';
        var postClass = 'im-meridiem im-selected';

        if (this.morningTime()) {
            anteClass = 'im-meridiem im-selected';
            postClass = 'im-meridiem';
        }

        return React.createElement(
            'div',
            { className: 'im-meridiem-selection', onClick: this.toggleMeridiem },
            React.createElement(
                'div',
                { className: anteClass },
                'AM'
            ),
            React.createElement(
                'div',
                { className: postClass },
                'PM'
            )
        );
    },
    timezonePicker: function timezonePicker() {
        if (this.props.timezone) {
            return React.createElement(
                'div',
                { id: 'im-timezone-container' },
                React.createElement(
                    'div',
                    { id: 'im-timezone-header' },
                    'Time Zone'
                ),
                React.createElement(
                    'select',
                    { id: 'timezone', value: this.props.timezone, onChange: this.changeTimezone },
                    React.createElement(
                        'option',
                        { value: 'America/Anchorage' },
                        'Alaska'
                    ),
                    React.createElement(
                        'option',
                        { value: 'America/Chicago' },
                        'Central'
                    ),
                    React.createElement(
                        'option',
                        { value: 'America/New_York' },
                        'Eastern'
                    ),
                    React.createElement(
                        'option',
                        { value: 'Pacific/Honolulu' },
                        'Hawaii-Aleutian'
                    ),
                    React.createElement(
                        'option',
                        { value: 'America/Adak' },
                        'Hawaii-Aleutian (Alaska)'
                    ),
                    React.createElement(
                        'option',
                        { value: 'America/Denver' },
                        'Mountain'
                    ),
                    React.createElement(
                        'option',
                        { value: 'America/Phoenix' },
                        'Mountain (Arizona)'
                    ),
                    React.createElement(
                        'option',
                        { value: 'America/Los_Angeles' },
                        'Pacific'
                    )
                )
            );
        } else {
            return null;
        }
    },
    render: function render() {
        return React.createElement(
            'div',
            { className: cx('m-time', this.props.className) },
            React.createElement(
                'div',
                { className: 'im-time-container' },
                React.createElement(
                    'a',
                    { className: 'im-arrow', onClick: this.increaseHour },
                    React.createElement('i', { className: this.props.upArrowIcon })
                ),
                React.createElement(
                    'div',
                    { className: 'im-time' },
                    this.displayableHour()
                ),
                React.createElement(
                    'a',
                    { className: 'im-arrow', onClick: this.decreaseHour },
                    React.createElement('i', { className: this.props.downArrowIcon })
                )
            ),
            React.createElement(
                'div',
                { className: 'im-separator' },
                ':'
            ),
            React.createElement(
                'div',
                { className: 'im-time-container' },
                React.createElement(
                    'a',
                    { className: 'im-arrow', onClick: this.increaseMinutes },
                    React.createElement('i', { className: this.props.upArrowIcon })
                ),
                React.createElement(
                    'div',
                    { className: 'im-time' },
                    this.displayableMinutes()
                ),
                React.createElement(
                    'a',
                    { className: 'im-arrow', onClick: this.decreaseMinutes },
                    React.createElement('i', { className: this.props.downArrowIcon })
                )
            ),
            this.meridiemPicker(),
            this.timezonePicker()
        );
    }
});