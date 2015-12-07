var React = require('react');

var Header = React.createClass({
    getInitialState: function () {
        return {
        };
    },
    closeWindow : function () {
        window.close();
    },
    render         : function () {
        var closeButton = window.name != "" ? (<a href="#" onClick={this.closeWindow}className="close-button">Close</a>) : null;
        return (<div id="Header"><h1 className="header-logo">Getinge Group</h1>{closeButton}</div>)
    }
});

module.exports = Header;