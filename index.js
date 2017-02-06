var React = require('react');
var PropTypes = require('react/lib/ReactPropTypes');
var marked = require('marked');
var _ = require('lodash');

var renderer = new marked.Renderer();
renderer.heading = function (text, level) {
  var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');

  return '<h' + level + ' id="' + escapedText + "'><a name='" +
    escapedText +
    '" class="anchor" href="#' +
    escapedText +
    '"><span class="header-link"></span></a>' +
    text + '</h' + level + '>';
};

// https://gist.github.com/jeremiahlee/1748966
var ReactMarkdownFile = React.createClass({
  displayName: 'ReactMarkdownFile',
  propTypes: {
    fileName: PropTypes.string.isRequired
  },

  getInitialState: function() {
    return {
      md: ''
    };
  },
  componentDidMount: function() {
    $.get(this.props.fileName, _.bind(function(data) {
      this.setState({md: data});
    }, this));
  },
  render: function() {
    var rawMarkup = marked(this.state.md, { renderer: renderer });
    return React.DOM.span({
      dangerouslySetInnerHTML: {__html: rawMarkup}
    });
  }
});

module.exports = ReactMarkdownFile;
