var React = require('react');

var Page2 = React.createClass({
    getInitialState: function(){
        return {
            imageSelected: -1
        };
    },
    render: function () {
        var selectImage = function(imageClicked){
            this.setState({ imageSelected: imageClicked });
        };
        return (
            <div className="page page2">
                <div className="content">
                    <div className="card">
                        <h3>Business Area</h3>
                        Select your business area logo. {this.state.imageSelected}
                        <img src="./images/getinge_group.png" className="selectImages" onclick="this.selectImage(1)"/>
                        <img src="./images/maquet_getinge_group.png" className="selectImages"  onclick="this.selectImage(2)"/>
                        <img src="./images/getinge_getinge_group.png" className="selectImages"  onclick="this.selectImage(3)"/>
                        <img src="./images/arjo_huntleigh_getinge_group.png" className="selectImages"  onclick="this.selectImage(4)"/>
                        <label>Company Name/Business Area</label>
                        <input className="textfields"/>
                    </div>
                </div>
            </div>
        );
    }

});

module.exports = Page2;