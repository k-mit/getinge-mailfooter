var React = require('react');
var Router = require('react-router');
var { Link } = Router;

var InputField = React.createClass({
    getInitialState: function () {
        console.log(this.props);
        return {
            value : this.props.value||null,
            name : this.props.name,
            showerror : this.props.showerror || false
        };
    },
    handleChange   : function (event) {
        var change = {value: event.target.value};
        this.setState(change, function () {
            this.props.onChange(this.state);
        });

    },
    validateField : function (message) {
        var v = true;
        if(this.props.required === true && (this.state.value === null || this.state.value === '')) {
            console.log(this.state.value);
            return message === true ? "This field is required" : false;
        }
        if(typeof this.props.minlength !== 'undefined') {
            if(this.state.value === null || this.state.value.length < this.props.minlength) {
                return message === true ? "This field has a minimum length of " + this.props.minlength + " characters" : false;
            };
        }
        if(typeof this.props.maxlength !== 'undefined') {
            if(this.state.value !== null && this.state.value.length > this.props.maxlength) {
                return message === true ? "This field has a maximum length of " + this.props.maxlength + " characters" : false;
            }
        }
        return v;
    },
    componentWillMount : function () {
        console.log(this.state.showerror, this.state.value);
        this.state.showerror = (this.state.value !== null && this.state.showerror === false) ? true : this.state.showerror;
    },
    handleBlur : function () {
        this.setState({showerror: true});
        console.log('blur');
    },
    render         : function () {
        var classname = "form-group form-group-lg";
        var valid = this.validateField();
        console.log('field is validated ', valid);
        if(!valid && this.state.showerror) classname = classname + ' has-error';
        var warning = (valid || !this.state.showerror) ? "" : <div className="alert alert-warning" role="alert">{this.validateField(true)}</div>;
        return (
            <div className={classname}>
                <label className="control-label">{this.props.label}</label>
                <input type="text" value={this.state.value} onBlur={this.handleBlur} onChange={this.handleChange} placeholder={this.props.placeholder} className="form-control" required={this.props.required}/>
                { warning }
            </div>
        );
    }
});

var Page1 = React.createClass({

    getInitialState: function () {
        return this.props.initUserObj.info;
    },

    componentDidMount: function () {
        return null;
    },

    handleChange: function (fieldvalues) {
        var change = {};
        console.log('change');
        change[fieldvalues.name] = fieldvalues.value;
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
                        <InputField minlength={2} name="user_name" value={this.state.user_name} onChange={this.handleChange} placeholder="Name" label="Full Name" required/>
                        <InputField minlength={2} name="user_position" value={this.state.user_position} onChange={this.handleChange} placeholder="Position/Title" label="Position or Title" required/>
                        <InputField minlength={2} name="user_department" value={this.state.user_department} onChange={this.handleChange} placeholder="Department" label="Department" required/>
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