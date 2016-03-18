import {render} from 'react-dom'
import CommentBox from './commentbox'

var commentList = [
  {name:'user1',comment: 'hello world1'},
  {name:'user2',comment: 'hello world2'},
  {name:'user3',comment: 'hello world3'},
  {name:'user4',comment: 'hello world4'},
  {name:'user5',comment: 'hello world1'},
  {name:'user6',comment: 'hello world2'},
  {name:'user7',comment: 'hello world3'},
  {name:'user8',comment: 'hello world4'},
  {name:'user9',comment: 'hello world1'},
  {name:'user10',comment: 'hello world2'},
  {name:'user11',comment: 'hello world3'},
  {name:'user12',comment: 'hello world4'},
  {name:'user13',comment: 'hello world3'},
  {name:'user14',comment: 'hello world4'},
];

render(
  <CommentBox list={commentList} count={10}/>,
  document.getElementById('commentBox')
)