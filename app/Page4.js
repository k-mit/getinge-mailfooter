var React = require('react');
var Router = require('react-router');
var { Link } = Router;
var InputField = require('./components/InputField');

var Page4 = React.createClass({
    getInitialState: function(){
        return this.props.initUserObj.contacts;

    },
    handleChange: function(fieldvalues) {
        var change = {};
        change[fieldvalues.name] = fieldvalues;
        this.setState(change, function () {
            this.props.updateCall({contacts: this.state});
        });

    },
    componentDidMount: function() {
    },
    render: function () {
        return (
            <div className="page page4">
                <div className="content">
                    <div className="card">
                        <h3>Contact Information</h3>
                        <InputField name="user_phone" value={this.state.user_phone.value} onChange={this.handleChange} placeholder="Phone" label="Phone"/>
                        <InputField name="user_mobile" value={this.state.user_mobile.value} onChange={this.handleChange} placeholder="Mobile" label="Mobile"/>
                        <InputField name="user_email" value={this.state.user_email.value} onChange={this.handleChange} placeholder="Email Address" label="Email Address" type="email" required/>
                    </div>
                </div>
                <div>
                    <Link className="btn btn-gtng pull-left" to="address">Previous: Adress</Link>
                    <Link className="btn btn-gtng pull-right" to="extras">Next: Extras</Link>
                </div>

            </div>
        );
    }

});

module.exports = Page4;