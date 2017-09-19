require('../src/less/input-moment.less');
require('./app.less');

var moment = require('moment-timezone');
var React = require('react');
var ReactDOM = require('react-dom');
var InputMoment = require('../src/input-moment');
var packageJson = require('../package.json');

var App = React.createClass({
  displayName: 'App',

  getInitialState() {
    return {
      m: moment().tz('America/Los_Angeles')
    };
  },

  render() {
    return (
      <div className="app">
        <form>
          <InputMoment
            moment={this.state.m}
            timezone='America/New_York'
            onChange={this.handleChange}
            onSave={this.handleSave}
            minuteIncrement={5}
          />
        </form>

      </div>
    );
  },

  handleChange(m) {
    this.setState({ m });
  },

  handleSave() {
  }
});

ReactDOM.render(<App/>, document.getElementById('app'));
