var React = require('react');

var Page4 = React.createClass({
    getInitialState: function(){
        return {
            userObj: {
                user_phone: this.props.initUserObj.user_phone,
                user_mobile: this.props.initUserObj.user_mobile,
                user_email: this.props.initUserObj.user_email
            }
        };
    },
    handleChange: function(event) {
        this.setState({
            userObj : {
                user_phone: this.refs.user_phone_input.getDOMNode().value,
                user_mobile: this.refs.user_mobile_input.getDOMNode().value,
                user_email: this.refs.user_email_input.getDOMNode().value
            }
        }, function(){
            this.refs.user_phone_input.getDOMNode().setAttribute('minlength',2);
            this.refs.user_mobile_input.getDOMNode().setAttribute('minlength',2);
            this.refs.user_email_input.getDOMNode().setAttribute('minlength',2);
            this.props.updateCall(this.state.userObj,4);
        });
    },
    render: function () {
        return (
            <div className="page page4">
                <div className="content">
                    <div className="card">
                        <h3>Contact Information</h3>
                        <label>Phone</label>
                        <input value={this.state.userObj.user_phone} onBlur={this.handleChange} onChange={this.handleChange} className="textfields" ref="user_phone_input" />
                        <label>Mobile</label>
                        <input value={this.state.userObj.user_mobile} onBlur={this.handleChange} onChange={this.handleChange} className="textfields" ref="user_mobile_input" />
                        <label>Email Address</label>
                        <input type="email" value={this.state.userObj.user_email} onBlur={this.handleChange} onChange={this.handleChange} className="textfields" ref="user_email_input" />
                    </div>
                </div>
            </div>
        );
    }

});

module.exports = Page4;