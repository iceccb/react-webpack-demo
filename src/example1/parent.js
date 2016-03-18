// var React = require('react');
var ParentComponent = React.createClass({
  render: function() {
    return (
      <ul>
      {
        this.props.children
      }
      </ul>
    )
  }
});

module.exports = ParentComponent;