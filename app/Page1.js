var React = require('react');

var Page1 = React.createClass({

    getInitialState: function () {
        return this.props.initUserObj.info;
    },

    componentDidMount: function(){
        this.refs.user_name_input.getDOMNode().setAttribute('minlength',2);
        this.refs.user_position_input.getDOMNode().setAttribute('minlength',2);
        this.refs.user_department_input.getDOMNode().setAttribute('minlength',1);
    },

    handleChange: function (name, event) {
        var change = {};
        change[name] = event.target.value;
        this.setState(change, function () {
            this.props.updateCall({info: this.state});
        });

    },
    render: function () {
        return (
            <div className="page page1">
                <div className="content">
                    <div className="card">
                        <h3>Employee Info</h3>
                        <label>Name</label>
                        <input type="text" value={this.state.user_name} onChange={this.handleChange.bind(this,'user_name')} className="textfields" ref="user_name_input" required/>
                        <label>Position/Title</label>
                        <input type="text" value={this.state.user_position} onChange={this.handleChange.bind(this,'user_position')} className="textfields" ref="user_position_input" required/>
                        <label>Department</label>
                        <input type="text" value={this.state.user_department} onChange={this.handleChange.bind(this,'user_department')} className="textfields" ref="user_department_input" required/>
                    </div>
                </div>
            </div>
        );
    }

});

module.exports = Page1;