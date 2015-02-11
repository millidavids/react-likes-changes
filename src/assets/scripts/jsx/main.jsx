var React = require('react');

var LikesAndChanges = React.createClass({
  loadLikesAndChangesFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleLikeOrChangeClick: function(data) {
    var likes_and_changes = this.state.data;
    likes_and_changes.push(data);
    this.setState({data: likes_and_changes}, function() {
      console.log(likes_and_changes);
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        type: 'POST',
        data: likes_and_changes,
        success: function(data) {
          this.loadLikesAndChangesFromServer;
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    });
    this.loadLikesAndChangesFromServer();
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadLikesAndChangesFromServer();
  },
  render: function() {
    return (
      <div className='likesAndChanges'>
        <h1>Likes and Changes</h1>
        <AddLikeOrChange onAddLikeOrChangeSubmit={this.handleLikeOrChangeClick}/>
        <Likes />
        <Changes />
      </div>
    );
  }
});

var AddLikeOrChange = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault(e);
    var type = $(document.activeElement)[0].name
    var text = this.refs.text.getDOMNode().value.trim();
    if (!text) {
      return;
    }
    this.props.onAddLikeOrChangeSubmit({type: type, text: text});
    this.refs.text.getDOMNode().value = '';
    return;
  },
  render: function() {
    return (
      <form className='addLikeOrChange form-group' onSubmit={this.handleSubmit}>
        <textarea className='form-control' cols='40' rows='5' placeholder='Say something...' ref='text' />
        <input name='like' type="submit" className='btn btn-primary' value='Like' />
        <input name='change' type="submit" className='btn btn-danger' value='Change' />
      </form>
    );
  }
});

var Likes = React.createClass({
  render: function() {
    return (
      <div className='likes col-xs-6'>
        <h3>Likes</h3>
        <hr/>
      </div>
    )
  }
});

var Changes = React.createClass({
  render: function() {
    return (
      <div className='changes col-xs-6'>
        <h3>Changes</h3>
        <hr/>
      </div>
    );
  }
});

React.render(
  <LikesAndChanges url='likes_and_changes.json' />,
  document.body
);
