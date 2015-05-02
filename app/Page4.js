var React = require('react');

var Page4 = React.createClass({
    render: function () {
        return (
            <div className="page page4">
                <div className="content">
                    <div className="card">
                        <h3>Contact Information</h3>
                        <label>Phone</label>
                        <input className="textfields"/>
                        <label>Mobile</label>
                        <input className="textfields"/>
                        <label>Email Address</label>
                        <input className="textfields"/>
                    </div>
                </div>
            </div>
        );
    }

});

module.exports = Page4;