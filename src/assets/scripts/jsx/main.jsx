var React = require('react');

var LikesAndChanges = React.createClass({
  render: function() {
    return (
      <div className='likesAndChanges'>
        <h1>Likes and Changes</h1>
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

        <textarea rows='3' cols='30' className='form-control'></textarea>
        <button className='btn btn-primary'>Like!</button>
        <button className='btn btn-danger'>Change!</button>
      </div>
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
  <LikesAndChanges />,
  document.body
);
