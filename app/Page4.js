var React = require('react');

var Page4 = React.createClass({
    getInitialState: function(){
        return this.props.initUserObj.contacts;

    },
    handleChange: function (name, event) {
        var change = {};
        change[name] = event.target.value;
        this.setState(change, function () {
            this.props.updateCall({contacts: this.state});
        });

    },
    componentDidMount: function() {
        this.refs.user_phone_input.getDOMNode().setAttribute('minlength',2);
        this.refs.user_mobile_input.getDOMNode().setAttribute('minlength',2);
        this.refs.user_email_input.getDOMNode().setAttribute('minlength',2);
    },
    render: function () {
        return (
            <div className="page page4">
                <div className="content">
                    <div className="card">
                        <h3>Contact Information</h3>
                        <label>Phone</label>
                        <input value={this.state.user_phone} onChange={this.handleChange.bind(this,'user_phone')} className="textfields" ref="user_phone_input" />
                        <label>Mobile</label>
                        <input value={this.state.user_mobile} onChange={this.handleChange.bind(this,'user_mobile')} className="textfields" ref="user_mobile_input" />
                        <label>Email Address</label>
                        <input type="email" value={this.state.user_email} onChange={this.handleChange.bind(this,'user_email')} className="textfields" ref="user_email_input" />
                    </div>
                </div>
            </div>
        );
    }

});

module.exports = Page4;