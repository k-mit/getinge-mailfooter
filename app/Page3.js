var React = require('react');
var Router = require('react-router');
var { Link } = Router;
var InputField = require('./components/InputField');
var addressformatsarray = ['USA', 'UK', 'Europe'];


var COUNTRIES = ["Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua And Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia, Plurinational State Of", "Bonaire, Sint Eustatius And Saba", "Bosnia And Herzegovina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (keeling) Islands", "Colombia", "Comoros", "Congo", "Congo, The Democratic Republic Of The", "Cook Islands", "Costa Rica", "Côte D'ivoire", "Croatia", "Cuba", "Curaçao", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea-bissau", "Guyana", "Haiti", "Heard Island And Mcdonald Islands", "Holy See (vatican City State)", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran, Islamic Republic Of", "Iraq", "Ireland", "Isle Of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, Democratic People's Republic Of", "Korea, Republic Of", "Kuwait", "Kyrgyzstan", "Lao People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macao", "Macedonia, The Former Yugoslav Republic Of", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States Of", "Moldova, Republic Of", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Palestine, State Of", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Réunion", "Romania", "Russian Federation", "Rwanda", "Saint Barthélemy", "Saint Helena, Ascension And Tristan Da Cunha", "Saint Kitts And Nevis", "Saint Lucia", "Saint Martin (french Part)", "Saint Pierre And Miquelon", "Saint Vincent And The Grenadines", "Samoa", "San Marino", "Sao Tome And Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Sint Maarten (dutch Part)", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia And The South Sandwich Islands", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Svalbard And Jan Mayen", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan, Province Of China", "Tajikistan", "Tanzania, United Republic Of", "Thailand", "Timor-leste", "Togo", "Tokelau", "Tonga", "Trinidad And Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks And Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela, Bolivarian Republic Of", "Viet Nam", "Virgin Islands, British", "Virgin Islands, U.s.", "Wallis And Futuna", "Western Sahara", "Yemen", "Zambia", "Zimbabwe", "Åland"];
var Page3 = React.createClass({
    getInitialState: function () {
        return this.props.initUserObj.address;
    },
    componentDidMount: function () {
        /*$.ajax({
         url: '//freegeoip.net/json/',
         type: 'POST',
         dataType: 'jsonp',
         success: function (location) {

         var change = {};
         change['user_city'] = location.city;
         change['user_zip'] = location.zipcode;
         change['user_country'] = location.country_name;
         change['user_state'] = location.region_name;

         this.setState(change, function () {
         this.props.updateCall({address: this.state});
         });
         }});*/

    },
    renderSelect: function (id, label, values, selectedValue, bindname, startoption) {
        var lkey = 1;
        var options = values.map(function (value) {
            lkey++;
            return <option value={value} key={lkey}>{value}</option>
        })

        return (

            <select className="form-control" id={id} onChange={this.handleChangeDrop.bind(this, bindname)} ref={id} value={this.state.address_format}>
                <option value="" key={lkey++}>{startoption}</option>
                    {options}
            </select>
        )
    },
    handleChange: function (fieldvalues) {
        var change = {};
        change[fieldvalues.name] = fieldvalues;
        this.setState(change, function () {
            this.props.updateCall({address: this.state});
        });

    },
    handleChangeDrop: function (name, event) {
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
                        <InputField name="user_street" value={this.state.user_street.value} onChange={this.handleChange} placeholder="Street Address" label="Street Address" required/>
                        <InputField name="user_city" value={this.state.user_city.value} onChange={this.handleChange} placeholder="City" label="City" required/>
                        <InputField name="user_state" value={this.state.user_state.value} onChange={this.handleChange} placeholder="State/Territory" label="State/Territory" />
                        <InputField name="user_zip" value={this.state.user_zip.value} onChange={this.handleChange} placeholder="Postal Code" label="Postal Code" required/>
                        <InputField name="user_country" value={this.state.user_country.value} onChange={this.handleChange} placeholder="Country" label="Country" required/>
                        <div className="form-group form-group-lg">
                            <label className="control-label">Select address format</label>

                {this.renderSelect('addressformatselect', 'Address Format', addressformatsarray, this.state.address_format, 'address_format', 'Select Address Format')}
                        </div>
                    </div>
                </div>
                <div>
                    <Link className="btn btn-primary pull-left" to="area">Previous: Business Area</Link>
                    <Link className="btn btn-primary pull-right" to="contacts">Next: Contact Info</Link>
                </div>

            </div>
        );
    }

});

module.exports = Page3;