var React = require('react');

var STATES = [
    'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'HI',
    'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS',
    'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR',
    'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

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
    renderSelect: function(id, label, values, selectedValue) {
        var lkey=1;
        var options = values.map(function(value) {
            if (selectedValue==value) {
                lkey++;
                return <option value={value} key={lkey} selected="selected">{value}</option>
            }else{
                lkey++;
                return <option value={value} key={lkey}>{value}</option>
            }
        })
        return (
            <select className="selectfield" id={id} ref={id} onChange={this.handleChange}>
                <option value="" key={lkey++}>Select state</option>
        {options}
            </select>
        )
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
        }, function(){
            this.props.updateCall(this.state.userObj,3);
        });
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
                        {this.renderSelect('user_state_input', 'State', STATES,this.state.userObj.user_state)}
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