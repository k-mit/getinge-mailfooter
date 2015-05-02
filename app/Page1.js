var React = require('react');

var Page1 = React.createClass({
    getInitialState: function(){
        return {
            userObj: {
                user_name: this.props.initUserObj.user_name,
                user_position: this.props.initUserObj.user_position,
                user_department: this.props.initUserObj.user_department
            }
        };
    },
    handleChange: function(event) {
        this.setState({
            userObj : {
                user_name: this.refs.user_name_input.getDOMNode().value,
                user_position: this.refs.user_position_input.getDOMNode().value,
                user_department: this.refs.user_department_input.getDOMNode().value
            }
        }, function(){
            this.props.updateCall(this.state.userObj,1);
        });
    },

    render: function () {
        return (
        <div className="page page1">
            <div className="content">
                <div className="card">
                    <h3>Employee Info</h3>
                    <label>Name</label>
                    <input value={this.state.userObj.user_name} onBlur={this.handleChange} onChange={this.handleChange} className="textfields" ref="user_name_input" />
                    <label>Position/Title</label>
                    <input value={this.state.userObj.user_position} onBlur={this.handleChange} onChange={this.handleChange} className="textfields" ref="user_position_input" />
                    <label>Department</label>
                    <input value={this.state.userObj.user_department} onBlur={this.handleChange} onChange={this.handleChange} className="textfields" ref="user_department_input" />
                </div>
            </div>
        </div>
        );
    }

});

module.exports = Page1;