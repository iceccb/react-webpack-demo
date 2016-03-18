// require('../../shared/css/ripples.min.css');
var render = require('react-dom').render;
var ParentComponent = require('./parent');
var ChildComponent = require('./child');
render(
  <ParentComponent>
    <ChildComponent />
    <ChildComponent />
  </ParentComponent>,
  document.getElementById('example1')
);