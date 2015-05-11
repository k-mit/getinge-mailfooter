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
                        <div className="form-group form-group-lg">
                            <label className="control-label">Street Address</label>
                            <input type="text" value={this.state.user_street} onChange={this.handleChange.bind(this,'user_street')} placeholder="Street Address" className="form-control" ref="user_street_input" required/>
                        </div>
                        <div className="form-group form-group-lg">
                            <label className="control-label">City</label>
                            <input type="text" value={this.state.user_city} onChange={this.handleChange.bind(this,'user_city')} placeholder="City" className="form-control" ref="user_city_input" required/>
                        </div>
                        <div className="form-group form-group-lg">
                            <label className="control-label">Company Name/Business Area</label>
                            <input type="text" value={this.state.user_state} onChange={this.handleChange.bind(this,'user_state')} placeholder="State" className="form-control" ref="user_state_input" required/>
                        </div>
                        <div className="form-group form-group-lg">
                            <label className="control-label">Zip code</label>
                            <input type="text" value={this.state.user_zip} onChange={this.handleChange.bind(this,'user_zip')} placeholder="Zip code" className="form-control" ref="user_zip_input" required/>
                        </div>
                        <div className="form-group form-group-lg">
                            <label className="control-label">Country</label>
                            <input type="text" value={this.state.user_country} onChange={this.handleChange.bind(this,'user_country')} placeholder="Country" className="form-control" ref="user_country_input" required/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

});

module.exports = Page3;