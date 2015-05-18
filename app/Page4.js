var React = require('react');
var Router = require('react-router');
var { Link } = Router;

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
                        <div className="form-group form-group-lg">
                            <label className="control-label">Phone</label>
                            <input type="text" value={this.state.user_phone} onChange={this.handleChange.bind(this,'user_phone')} placeholder="Phone" className="form-control" ref="user_phone_input" required/>
                        </div>
                        <div className="form-group form-group-lg">
                            <label className="control-label">Mobile</label>
                            <input type="text" value={this.state.user_mobile} onChange={this.handleChange.bind(this,'user_mobile')} placeholder="Mobile" className="form-control" ref="user_mobile_input" required/>
                        </div>
                        <div className="form-group form-group-lg">
                            <label className="control-label">Email Address</label>
                            <input type="email" value={this.state.user_email} onChange={this.handleChange.bind(this,'user_email')} placeholder="Email Address" className="form-control" ref="user_email_input" required/>
                        </div>
                    </div>
                </div>
                <div>
                    <Link className="btn btn-primary pull-left" to="address">Previous: Adress</Link>
                    <Link className="btn btn-primary pull-right" to="extras">Next: Extras</Link>
                </div>

            </div>
        );
    }

});

module.exports = Page4;