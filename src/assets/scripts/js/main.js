var React = require('react');
var $ = require('jquery-browserify');

var LikesAndChanges = React.createClass({displayName: "LikesAndChanges",
  render: function() {
    return (
      React.createElement("div", {className: "likesAndChanges"}, 
        React.createElement("h2", null, "Likes and Changes"), 
        React.createElement("hr", null), 
        React.createElement(AddLikeOrChange, null), 
        React.createElement(Likes, null), 
        React.createElement(Changes, null)
      )
    );
  }
});

var AddLikeOrChange = React.createClass({displayName: "AddLikeOrChange",
  render: function() {
    return (
      React.createElement("div", {className: "addLikeOrChange"}
      )
    );
  }
});

var Likes = React.createClass({displayName: "Likes",
  render: function() {
    return (
      React.createElement("div", {className: "likes col-xs-6"}, 
        React.createElement("h3", null, "Likes")
      )
    )
  }
});

var Changes = React.createClass({displayName: "Changes",
  render: function() {
    return (
      React.createElement("div", {className: "changes col-xs-6"}, 
        React.createElement("h3", null, "Changes")
      )
    );
  }
});

React.render(
  React.createElement(LikesAndChanges, null),
  document.body
);
