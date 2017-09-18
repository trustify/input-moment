var cx = require('classnames');
var blacklist = require('blacklist');
var React = require('react');
var Calendar = require('./calendar');
var Time = require('./time');

module.exports = React.createClass({
    displayName: 'InputMoment',

    getInitialState() {
        return {
            viewedTimeTab: false,
            tab: 0
        };
    },

    getDefaultProps() {
        return {
            saveText: 'Save',
            upArrowIcon: 'ion-ios-arrow-up',
            downArrowIcon: 'ion-ios-arrow-down',
            prevMonthIcon: 'ion-ios-arrow-left',
            nextMonthIcon: 'ion-ios-arrow-right',
            minuteIncrement: 15
        };
    },

    handleClickTab(newTab, event) {
        event.preventDefault();

        if(newTab !== this.state.tab) {
            this.setState({ tab: newTab, viewedTimeTab: true });
            this.props.onChange(this.props.moment, this.props.timezone);
        }
    },

    footerButton() {
        if(this.state.viewedTimeTab) {
            return (
                <button type="button" className="im-btn btn-save" onClick={this.handleSave}>
                    {this.props.saveText}
                </button>
            );
        } else {
            return (
                <button type="button" className="im-btn btn-save" onClick={this.handleClickTab.bind(null, 1)}>
                    Select Time
                </button>
            );
        }
    },

    handleSave(event) {
        event.preventDefault();

        if(this.state.viewedTimeTab && this.props.onSave) {
            this.props.onSave();
        }
    },

    render() {
        var tab = this.state.tab;
        var timezone = this.props.timezone;
        var m = this.props.moment;

        if(timezone) {
            m = m.tz(timezone);
        }

        var props = blacklist(this.props, 'className', 'moment', 'saveText', 'timezone', 'upArrowIcon', 'downArrowIcon', 'prevMonthIcon', 'nextMonthIcon', 'onChange', 'onSave');
        props.className = cx('m-input-moment', this.props.className);

        return (
            <div {...props}>
                <div className="options">
                    <button type="button" className={cx('im-btn', {'is-active': tab === 0})} onClick={this.handleClickTab.bind(null, 0)}>
                        Date
                    </button>
                    <button type="button" className={cx('im-btn', {'is-active': tab === 1})} onClick={this.handleClickTab.bind(null, 1)}>
                        Time
                    </button>
                </div>

                <Calendar
                    className={cx('im-tab im-calendar-tab', {'im-active-tab': tab === 0})}
                    timezone={this.props.timezone}
                    moment={m}
                    onChange={this.props.onChange}
                    prevMonthIcon={this.props.prevMonthIcon}
                    nextMonthIcon={this.props.nextMonthIcon}
                />

                <Time
                    className={cx('im-tab im-time-tab', {'im-active-tab': tab === 1})}
                    timezone={this.props.timezone}
                    moment={m}
                    onChange={this.props.onChange}
                    upArrowIcon={this.props.upArrowIcon}
                    downArrowIcon={this.props.downArrowIcon}
                    minuteIncrement={this.props.minuteIncrement}
                />

                {this.footerButton()}
            </div>
        );
    }
});
