var React = require('react');

var Page5 = React.createClass({
    render: function () {
        return (
            <div className="page page5">
                <div className="content">
                    <div className="card">
                        <h3>Promotional Banner (optional)</h3>
                        <label>Link</label>
                        <input className="textfields"/>
                        <button>Upload Image</button><div className="buttonText">File formats accepted are JPG and PNG only.
                        Dimensions must be 606x141 pixels.</div>
                        <label>Image preview</label>
                        <img src="images/banner_placeholder.png" />
                    </div>
                </div>
            </div>
        );
    }

});

module.exports = Page5;