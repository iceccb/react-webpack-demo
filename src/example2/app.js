import {render} from 'react-dom'
import ParentComponent from './parent'
import ChildComponent from './child'


render(
  <ParentComponent>
    <ChildComponent />
    <ChildComponent />
  </ParentComponent>,
  document.getElementById('example1')
);