var React = require('react');

var InputField = React.createClass({
    getInitialState: function () {
        console.log(this.props);
        return {
            value : this.props.value||null,
            name : this.props.name,
            showerror : this.props.showerror || false,
            valid : true
        };
    },
    handleChange   : function (event) {
        var targetValue = typeof event !== "undefined" ? event.target.value : this.state.value;
        var change = {
            value: targetValue,
            valid: this.validateField(false,targetValue),

        };

        this.setState(change, function () {
            this.props.onChange({
                value: this.state.value,
                valid: this.state.valid,
                name : this.state.name
            });
        });

    },
    validateField : function (message, value) {
        value = typeof value === 'undefined' ? this.state.value : value;
        var v = true;
        if(this.props.required === true && (value === null || value === '')) {
            console.log(value);
            return message === true ? "This field is required" : false;
        }
        if(typeof this.props.minlength !== 'undefined') {
            if(value === null || value.length < this.props.minlength) {
                return message === true ? "This field has a minimum length of " + this.props.minlength + " characters" : false;
            };
        }
        if(typeof this.props.maxlength !== 'undefined') {
            if(value !== null && value.length > this.props.maxlength) {
                return message === true ? "This field has a maximum length of " + this.props.maxlength + " characters" : false;
            }
        }
        if (this.props.type==='email'){
            var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            console.log('email test:' , re.test(value));
            if (!re.test(value)){
                return message === true ? 'This is not a valid email format' : false;
            }
        }
        return v;
    },
    componentWillMount : function () {

        this.state.showerror = (this.state.value !== null && this.state.showerror === false) ? true : this.state.showerror;
        this.handleChange();
    },
    handleBlur : function () {
        this.setState({showerror: true});
        console.log('blur');
    },
    render         : function () {
        var classname = "form-group form-group-lg";
        var valid = this.validateField();
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

module.exports = InputField;