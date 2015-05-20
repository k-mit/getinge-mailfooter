var React = require('react');
var Router = require('react-router');
var { Link } = Router;

var InputField = require('./components/InputField');

var Page1 = React.createClass({
    contextTypes: {
        router: React.PropTypes.func
    },

    statics: {
        willTransitionFrom: function (transition, element) {
            var validated = true;
            for (var key in element.state) {
                console.log(key, element.state[key]);
                if(element.state[key].valid === false) validated = false;
            }
            if (!confirm('Some fields are not filled corretly, do you want to leave this page?')) {
                transition.abort();
            }

        }
    },
    getInitialState: function () {
        return this.props.initUserObj.info;
    },

    componentDidMount: function () {

    },

    handleChange: function (fieldvalues) {
        var change = {};
        change[fieldvalues.name] = fieldvalues;
        this.setState(change, function () {
            this.props.updateCall({info: this.state});
        });

    },


    validateField: function () {

    },
    render       : function () {
        return (
            <div className="page page1">
                <div className="content">
                    <form className="form">
                        <h3>Employee Info</h3>
                        <InputField minlength={2} name="user_name" value={this.state.user_name.value} onChange={this.handleChange} placeholder="Name" label="Full Name" required/>
                        <InputField minlength={2} name="user_position" value={this.state.user_position.value} onChange={this.handleChange} placeholder="Position/Title" label="Position or Title" required/>
                        <InputField minlength={2} name="user_department" value={this.state.user_department.value} onChange={this.handleChange} placeholder="Department" label="Department" required/>
                    </form>
                </div>
                <div>
                    <Link className="btn btn-primary pull-right" to="area">Next: Business Area</Link>
                </div>
            </div>
        );
    }

});

module.exports = Page1;