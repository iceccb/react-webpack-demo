
import ReactDOM from 'react-dom'
import $ from 'jQuery'

var Comment = React.createClass({
  render() {
    return (
      <div className="list-group-item">
        <div className="row-action-primary">
            <i className="mdi-file-folder"></i>
        </div>
        <div className="row-content">
          <h4 className="list-group-item-heading">{this.props.username}</h4>
          <p className="list-group-item-text">{this.props.comment}</p>
        </div>
      </div>
    );
  }
});

var Pagination = React.createClass({
  getInitialState: function() {
    return {
      curPage: 1
    }
  },
  handlePageChange: function(num,e) {
    e.preventDefault();
    var curPage = this.state.curPage;
    var total = this.props.total;
    if(num=='pre') {
      num = curPage == 1? curPage: curPage - 1;
    }
    else if(num == 'next') {
      num = curPage == total? curPage: curPage + 1;
    }
    this.setState({curPage:num});
    this.props.changePage(num);
  },
  render: function() {
    var total = this.props.total;
    var page = Array.apply(null,{length:total}).map(function(i,index){return index+1});
    var curPage = this.state.curPage;
    var _this =this;
    return(
      <ul className="pagination pagination-sm">
        <li className={curPage==1?"disabled":""}><a href="#" onClick={_this.handlePageChange.bind(null,'pre')}>«</a></li>
      {
        page.map(function(i) {
          //这是的this指向窗口
          return (
            <li className={curPage==i?"active":""} key={i}>
              <a href="#" onClick={_this.handlePageChange.bind(null,i)}>{i}</a>
            </li>
          )
        })
      }
        <li><a href="#" onClick={_this.handlePageChange.bind(null,'next')}>»<div className={curPage==total?"disabled":"ripple-wrapper"}></div></a></li>
      </ul>
    )
  }
});

var CommentList = React.createClass({
  getInitialState: function(){
    return {
      curPage: 1
    };
  },
  getDefaultProps: function() {
    return {
      count: 5
    };
  },
  handlePageChange: function(num) {
    this.setState({curPage: num});
        
  },
  componentDidUpdate: () => $("body,html").animate({scrollTop:0},500),
  render: function() {
    var curPage = this.state.curPage;
    var count = this.props.count;
    var list = this.props.list.slice((curPage - 1) * count, count * curPage);
    var total = Math.ceil(this.props.list.length / count)
    return (
      <div className="list-group">
      {
        list.map(function(item){
          return (
            <div key={item.name}>
              <Comment username={item.name} comment={item.comment} />
              <div className="list-group-separator"></div>
              </div>
          );
        })
      }
      <Pagination total={total} changePage={this.handlePageChange} />
      </div>
    )
  }
});

var CommentForm = React.createClass({
  handleSubmit(e){
    e.preventDefault();
    var username = ReactDOM.findDOMNode(this.refs.username).value.trim();
    var comment = ReactDOM.findDOMNode(this.refs.comment).value.trim();
    if(username == '' || comment == '') return;
    this.props.onCommentSubmit({name:username,comment:comment});
    return;
  },
  render() {
    return (
      <form className="form-horizontal" onSubmit={this.handleSubmit}>
        <fieldset>
          <legend>我要评论</legend>
          <div className="form-group">
            <div className="form-control-wrapper">
              <input className="form-control empty" ref="username" type="text" />
              <div className="floating-label">用户名</div>
            </div>
          </div>
          <div className="form-group">
            <div className="form-control-wrapper">
              <textarea className="form-control empty" rows="3" ref="comment"></textarea>
              <div className="floating-label">评论</div>
            </div>
          </div>
          
          <div className="form-group">
              <div className="col-lg-10 col-lg-offset-2">
                  <button className="btn btn-default">Cancel</button>
                  <button type="submit" className="btn btn-primary" >Submit</button>
              </div>
          </div>
        </fieldset>
      </form>
    )
  }
});

var CommentBox = React.createClass({
  getInitialState: function() {
      return {list:this.props.list};
  },
  updateList: function(data) {
    var list = this.state.list;
    list.unshift(data);
    this.setState({list:list,test:2})
  },
  render: function() {
    return (
      <div>
        <CommentList list={this.state.list} {...this.props}/>
        <CommentForm onCommentSubmit={this.updateList}/>
      </div>
    )
  }
})

module.exports =  CommentBox