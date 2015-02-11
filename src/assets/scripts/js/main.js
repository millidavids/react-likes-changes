var React = require('react');

var LikesAndChanges = React.createClass({displayName: "LikesAndChanges",
  render: function() {
    return (
      React.createElement("div", {className: "likesAndChanges"}, 
        React.createElement("h1", null, "Likes and Changes"), 
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
      React.createElement("div", {className: "addLikeOrChange"}, 

        React.createElement("textarea", {rows: "3", cols: "30", className: "form-control"}), 
        React.createElement("button", {className: "btn btn-primary"}, "Like!"), 
        React.createElement("button", {className: "btn btn-danger"}, "Change!")
      )
    );
  }
});

var Likes = React.createClass({displayName: "Likes",
  render: function() {
    return (
      React.createElement("div", {className: "likes col-xs-6"}, 
        React.createElement("h3", null, "Likes"), 
        React.createElement("hr", null)
      )
    )
  }
});

var Changes = React.createClass({displayName: "Changes",
  render: function() {
    return (
      React.createElement("div", {className: "changes col-xs-6"}, 
        React.createElement("h3", null, "Changes"), 
        React.createElement("hr", null)
      )
    );
  }
});

React.render(
  React.createElement(LikesAndChanges, null),
  document.body
);
