var React = require('react');

var STATES = [
    'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'HI',
    'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS',
    'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR',
    'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

var Page3 = React.createClass({
    getInitialState: function(){
            return this.props.initUserObj.address;
    },
    componentDidMount: function(){
        this.refs.user_street_input.getDOMNode().setAttribute('minlength',2);
        this.refs.user_city_input.getDOMNode().setAttribute('minlength',2);
        this.refs.user_state_input.getDOMNode().setAttribute('minlength',2);
        this.refs.user_zip_input.getDOMNode().setAttribute('minlength',1);
        this.refs.user_country_input.getDOMNode().setAttribute('minlength',2);
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
            <select className="selectfield" id={id} onChange={this.handleChange.bind(this,'user_state')} ref={id}>
                <option value="" key={lkey++}>Select state</option>
        {options}
            </select>
        )
    },
    handleChange: function (name, event) {
        var change = {};
        change[name] = event.target.value;
        this.setState(change, function () {
            this.props.updateCall({address: this.state});
        });

    },

    render: function () {
        return (
            <div className="page page3">
                <div className="content">
                    <div className="card">
                        <h3>Address</h3>
                        <label>Street Address</label>
                        <input value={this.state.user_street} onChange={this.handleChange.bind(this,'user_street')} className="textfields" ref="user_street_input" required/>
                        <label>City</label>
                        <input value={this.state.user_city} onChange={this.handleChange.bind(this,'user_city')} className="textfields" ref="user_city_input" required/>
                        <label>State/Territory (optional)</label>
                        {this.renderSelect('user_state_input', 'State', STATES,this.state.user_state)}
                        <label>Zip code</label>
                        <input value={this.state.user_zip} onChange={this.handleChange.bind(this,'user_zip')} className="textfields" ref="user_zip_input" required/>
                        <label>Country</label>
                        <input value={this.state.user_country} onChange={this.handleChange.bind(this,'user_country')} className="textfields" ref="user_country_input" required/>
                    </div>
                </div>
            </div>
        );
    }

});

module.exports = Page3;