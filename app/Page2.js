var React = require('react');

var LogoItem = React.createClass({
    handleClick: function (e) {
        this.props.onClick(this);
    },
    render     : function () {
        var classString = "selectLogo " + this.props.shortname + (this.props.selected ? ' active' : '');

        return (
            <li className={classString} onClick={this.handleClick}>{this.props.title}</li>
        )
    }
});

var LogoSelector = React.createClass({
    getInitialState: function () {
        return {
            imageSelected: this.props.imageSelected,
            logos        : {
                'getingegroup' : {
                    title: 'Getinge Group',
                    url  : 'images/logotypes/getingegroup.png',
                    link : 'http://www.getingegroup.com/',
                    size : {
                        width: 199,
                        height: 19
                    }

                },
                'maquet'       : {
                    title: 'Maquet Getinge Group',
                    url  : 'images/logotypes/maquet_getingegroup.png',
                    link : 'http://www.maquet.com/',
                    size : {
                        width: 199,
                        height: 68
                    }
                },
                'getinge'      : {
                    title: 'Getinge Getinge Group',
                    url  : 'images/logotypes/getinge_getingegroup.png',
                    link : 'http://www.getinge.com/',
                    size : {
                        width: 199,
                        height: 71
                    }
                },
                'arjohuntleigh': {
                    title: 'Arjo Huntleigh Getinge Group',
                    url  : 'images/logotypes/arjohuntleigh_getingegroup.png',
                    link : 'http://www.arjohuntleigh.com/',
                    size : {
                        width: 198,
                        height: 36
                    }
                }
            }
        };
    },
    handleClick    : function (target) {
        this.setState({imageSelected: target.props.shortname},function () {
            this.props.updateCall({'logo': {
                name: this.state.imageSelected,
                properties : this.state.logos[this.state.imageSelected]
            }})

        });
    },
    render         : function () {
        var self = this;
        var logoNodes = Object.keys(this.state.logos).map(function (key) {
            var logoitem = self.state.logos[key];

            var selected = key === self.state.imageSelected;
            return (
                <LogoItem selected={selected} key={key} url={logoitem.url} shortname={key} onClick={self.handleClick}>
                    {logoitem.title}
                </LogoItem>
            );
        });
        return (
            <ul className="logoselector">
                {logoNodes}
            </ul>
        );

    }
});
var Page2 = React.createClass({
    getInitialState: function () {
        return {
            company: this.props.initUserObj.company
        };
    },
    handleChange: function (name, event) {
        var change = {};
        change[name] = event.target.value;
        this.setState(change, function () {
            this.props.updateCall({company: this.state.company});
        });

    },

    render         : function () {
        return (
            <div className="page page2">
                <div className="content">
                    <div className="card">
                        <h3>Business Area</h3>
                {this.props.key}
                        Select your business area logo.
                        <LogoSelector imageSelected={this.props.initUserObj.logo.name} updateCall={this.props.updateCall}/>
                        <div className="form-group form-group-lg">
                            <label className="control-label">Company Name/Business Area</label>
                            <input type="text" value={this.state.company} onChange={this.handleChange.bind(this,'company')} placeholder="Company Name/Business Area" className="form-control" ref="user_name_input" required/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

});

module.exports = Page2;