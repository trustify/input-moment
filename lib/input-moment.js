'use strict';

var cx = require('classnames');
var blacklist = require('blacklist');
var React = require('react');
var Calendar = require('./calendar');
var Time = require('./time');

module.exports = React.createClass({
  displayName: 'InputMoment',

  getInitialState: function getInitialState() {
    return {
      viewedTimeTab: false,
      tab: 0
    };
  },
  getDefaultProps: function getDefaultProps() {
    return {
      saveText: 'Save',
      upArrowIcon: 'ion-ios-arrow-up',
      downArrowIcon: 'ion-ios-arrow-down',
      prevMonthIcon: 'ion-ios-arrow-left',
      nextMonthIcon: 'ion-ios-arrow-right'
    };
  },
  render: function render() {
    var tab = this.state.tab;
    var m = this.props.moment;
    var props = blacklist(this.props, 'className', 'moment', 'saveText', 'upArrowIcon', 'downArrowIcon', 'prevMonthIcon', 'nextMonthIcon', 'onChange', 'onSave');
    props.className = cx('m-input-moment', this.props.className);

    return React.createElement(
      'div',
      props,
      React.createElement(
        'div',
        { className: 'options' },
        React.createElement(
          'button',
          { type: 'button', className: cx('im-btn', { 'is-active': tab === 0 }), onClick: this.handleClickTab.bind(null, 0) },
          'Date'
        ),
        React.createElement(
          'button',
          { type: 'button', className: cx('im-btn', { 'is-active': tab === 1 }), onClick: this.handleClickTab.bind(null, 1) },
          'Time'
        )
      ),
      React.createElement(Calendar, {
        className: cx('im-tab im-calendar-tab', { 'im-active-tab': tab === 0 }),
        moment: m,
        onChange: this.props.onChange,
        prevMonthIcon: this.props.prevMonthIcon,
        nextMonthIcon: this.props.nextMonthIcon
      }),
      React.createElement(Time, {
        className: cx('im-tab im-time-tab', { 'im-active-tab': tab === 1 }),
        moment: m,
        onChange: this.props.onChange,
        upArrowIcon: this.props.upArrowIcon,
        downArrowIcon: this.props.downArrowIcon
      }),
      this.footerButton()
    );
  },
  handleClickTab: function handleClickTab(newTab, event) {
    event.preventDefault();

    if (newTab !== this.state.tab) {
      this.setState({ tab: newTab, viewedTimeTab: true });
      this.props.onChange(this.props.moment);
    }
  },
  footerButton: function footerButton() {
    if (this.state.viewedTimeTab) {
      return React.createElement(
        'button',
        { type: 'button', className: 'im-btn btn-save', onClick: this.handleSave },
        this.props.saveText
      );
    } else {
      return React.createElement(
        'button',
        { type: 'button', className: 'im-btn btn-save', onClick: this.handleClickTab.bind(null, 1) },
        'Select Time'
      );
    }
  },
  handleSave: function handleSave(event) {
    event.preventDefault();

    if (this.state.viewedTimeTab && this.props.onSave) {
      this.props.onSave();
    }
  }
});