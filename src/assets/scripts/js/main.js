var React = require('react');
var kramed = require('kramed');

var LikesAndChanges = React.createClass({displayName: "LikesAndChanges",
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
  handleLikeOrChangeClick: function(lorc) {
    var likes_and_changes = this.state.data;
    likes_and_changes.push(lorc);
    this.setState({data: likes_and_changes}, function() {
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        type: 'POST',
        data: lorc,
        success: function(data) {
          this.loadLikesAndChangesFromServer;
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadLikesAndChangesFromServer();
  },
  getLikes: function() {
    var likes = [];
    for (object in this.state.data) {
      if (object.type === 'like'){
        likes.push(object);
      }
    }
    return likes;
  },
  getChanges: function() {
    var changes = [];
    for (object in this.state.data) {
      if (object.type === 'change'){
        changes.push(object);
      }
    }
    return changes;
  },
  render: function() {
    var likes = this.state.data.filter(function(like) {
      if (like.type === 'Like') {
        return like.text;
      }
    });
    var changes = this.state.data.filter(function(change) {
      if (change.type === 'Change') {
        return change.text;
      }
    });
    return (
      React.createElement("div", {className: "likesAndChanges"}, 
        React.createElement(AddLikeOrChange, {onAddLikeOrChangeSubmit: this.handleLikeOrChangeClick}), 
        React.createElement(Likes, {data: likes}), 
        React.createElement(Changes, {data: changes})
      )
    );
  }
});

var AddLikeOrChange = React.createClass({displayName: "AddLikeOrChange",
  handleSubmit: function(e) {
    e.preventDefault(e);
    var type = $(document.activeElement)[0].value
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
      React.createElement("form", {className: "addLikeOrChange form-group", onSubmit: this.handleSubmit}, 
        React.createElement("div", {className: "row"}, 
          React.createElement("textarea", {className: "form-control", cols: "40", rows: "2", placeholder: "Say something...", ref: "text"})
        ), 
        React.createElement("div", {className: "row"}, 
          React.createElement("div", {className: "col-xs-6"}, 
            React.createElement("input", {type: "submit", className: "btn btn-lg btn-primary", value: "Like"})
          ), 
          React.createElement("div", {className: "col-xs-6"}, 
            React.createElement("input", {type: "submit", className: "btn btn-lg btn-danger", value: "Change"})
          )
        )
      )
    );
  }
});

var Likes = React.createClass({displayName: "Likes",
  render: function() {
    var likeNodes = this.props.data.map(function(like, index) {
    var rawMarkup = kramed(like.text);
      return (
        React.createElement("li", {key: index}, 
          React.createElement("i", {className: " fa-li fa fa-thumbs-o-up"}), 
          React.createElement("span", {dangerouslySetInnerHTML: {__html: rawMarkup}})
        )
      );
    });
    return (
      React.createElement("div", {className: "likes col-xs-6"}, 
        React.createElement("hr", null), 
        React.createElement("ul", {className: "fa-ul"}, 
          likeNodes
        )
      )
    )
  }
});

var Changes = React.createClass({displayName: "Changes",
  render: function() {
    var changeNodes = this.props.data.map(function(change, index) {
    var rawMarkup = kramed(change.text);
      return (
        React.createElement("li", {key: index}, 
          React.createElement("i", {className: "fa-li"}, String.fromCharCode(916)), 
          React.createElement("span", {dangerouslySetInnerHTML: {__html: rawMarkup}})
        )
      );
    });
    return (
      React.createElement("div", {className: "changes col-xs-6"}, 
        React.createElement("hr", null), 
        React.createElement("ul", {className: "fa-ul"}, 
          changeNodes
        )
      )
    );
  }
});

React.render(
  React.createElement(LikesAndChanges, {url: "likes_and_changes.json"}),
  document.body
);
