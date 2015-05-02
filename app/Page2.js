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
                        <ul className="logoselector">
                            <li className="selectImages getingegroup" onclick="this.selectImage(1)">Getinge Group</li>
                            <li className="selectImages maquet" onclick="this.selectImage(2)">Maquet Getinge Group</li>
                            <li className="selectImages getinge" onclick="this.selectImage(3)">Getinge Getinge Group</li>
                            <li className="selectImages arjohuntleigh" onclick="this.selectImage(4)">Arjo Huntleigh Getinge Group</li>
                        </ul>
                        <label>Company Name/Business Area</label>
                        <input className="textfields"/>
                    </div>
                </div>
            </div>
        );
    }

});

module.exports = Page2;