var React = require('react');

var Page3 = React.createClass({
    getInitialState: function(){
        return {
            userObj: {
                user_street: this.props.initUserObj.user_street,
                user_city: this.props.initUserObj.user_city,
                user_state: this.props.initUserObj.user_state,
                user_zip: this.props.initUserObj.user_zip,
                user_country: this.props.initUserObj.user_country
            }
        };
    },
    handleChange: function(event) {
        this.setState({
            userObj : {
                user_street: this.refs.user_street_input.getDOMNode().value,
                user_city: this.refs.user_city_input.getDOMNode().value,
                user_state: this.refs.user_state_input.getDOMNode().value,
                user_zip: this.refs.user_zip_input.getDOMNode().value,
                user_country: this.refs.user_country_input.getDOMNode().value
            }
        });
        this.props.updateCall(this.state.userObj,3);
    },

    render: function () {
        return (
            <div className="page page3">
                <div className="content">
                    <div className="card">
                        <h3>Address</h3>
                        <label>Street Address</label>
                        <input value={this.state.userObj.user_street} onBlur={this.handleChange} onChange={this.handleChange} className="textfields" ref="user_street_input" />
                        <label>City</label>
                        <input value={this.state.userObj.user_city} onBlur={this.handleChange} onChange={this.handleChange} className="textfields" ref="user_city_input" />
                        <label>State/Territory (optional)</label>
                        <input value={this.state.userObj.user_state} onBlur={this.handleChange} onChange={this.handleChange} className="textfields" ref="user_state_input" />
                        <label>Zip code</label>
                        <input value={this.state.userObj.user_zip} onBlur={this.handleChange} onChange={this.handleChange} className="textfields" ref="user_zip_input" />
                        <label>Country</label>
                        <input value={this.state.userObj.user_country} onBlur={this.handleChange} onChange={this.handleChange} className="textfields" ref="user_country_input" />
                    </div>
                </div>
            </div>
        );
    }

});

module.exports = Page3;