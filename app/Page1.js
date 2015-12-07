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
                if(element.state[key].valid === false) validated = false;
            }
            //if (!confirm('Some fields are not filled corretly, do you want to leave this page?')) {
            //    transition.abort();
            //}

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
<<<<<<< HEAD
        console.log(change);
=======
>>>>>>> f7c569b199e8d21722a46abeb675763485ea6803
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
<<<<<<< HEAD
=======
                        <InputField minlength={2} name="user_department" value={this.state.user_department.value} onChange={this.handleChange} placeholder="Department" label="Department" required/>
>>>>>>> f7c569b199e8d21722a46abeb675763485ea6803
                    </form>
                </div>
                <div className="clearfix">
                    <Link className="btn btn-gtng pull-right" to="area">Next: Business Area</Link>
                </div>
            </div>
        );
    }

});

module.exports = Page1;