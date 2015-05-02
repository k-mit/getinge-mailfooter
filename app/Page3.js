var React = require('react');

var Page3 = React.createClass({
    render: function () {
        return (
            <div className="page page3">
                <div className="content">
                    <div className="card">
                        <h3>Address</h3>
                        <label>Street Address</label>
                        <input className="textfields"/>
                        <label>City</label>
                        <input className="textfields"/>
                        <label>State/Territory (optional)</label>
                        <input className="textfields"/>
                        <label>Zip code</label>
                        <input className="textfields"/>
                        <label>Country</label>
                        <input className="textfields"/>
                    </div>
                </div>
            </div>
        );
    }

});

module.exports = Page3;