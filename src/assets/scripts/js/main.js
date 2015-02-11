var React = require('react');

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
      React.createElement("div", {className: "likesAndChanges"}, 
        React.createElement("h1", null, "Likes and Changes"), 
        React.createElement(AddLikeOrChange, {onAddLikeOrChangeSubmit: this.handleLikeOrChangeClick}), 
        React.createElement(Likes, null), 
        React.createElement(Changes, null)
      )
    );
  }
});

var AddLikeOrChange = React.createClass({displayName: "AddLikeOrChange",
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
      React.createElement("form", {className: "addLikeOrChange form-group", onSubmit: this.handleSubmit}, 
        React.createElement("textarea", {className: "form-control", cols: "40", rows: "5", placeholder: "Say something...", ref: "text"}), 
        React.createElement("input", {name: "like", type: "submit", className: "btn btn-primary", value: "Like"}), 
        React.createElement("input", {name: "change", type: "submit", className: "btn btn-danger", value: "Change"})
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
  React.createElement(LikesAndChanges, {url: "likes_and_changes.json"}),
  document.body
);
