var React = require('react');
var $ = require('jquery-browserify');

var LikesAndChanges = React.createClass({
  render: function() {
    return (
      <div className='likesAndChanges'>
        <h2>Likes and Changes</h2>
        <hr/>
        <AddLikeOrChange />
        <Likes />
        <Changes />
      </div>
    );
  }
});

var AddLikeOrChange = React.createClass({
  render: function() {
    return (
      <div className='addLikeOrChange'>
      </div>
    );
  }
});

var Likes = React.createClass({
  render: function() {
    return (
      <div className='likes col-xs-6'>
        <h3>Likes</h3>
      </div>
    )
  }
});

var Changes = React.createClass({
  render: function() {
    return (
      <div className='changes col-xs-6'>
        <h3>Changes</h3>
      </div>
    );
  }
});

React.render(
  <LikesAndChanges />,
  document.body
);
