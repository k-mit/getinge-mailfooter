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
                    <form className="form">
                        <h3>Employee Info</h3>
                        <div className="form-group form-group-lg">
                            <label className="control-label">Full Name</label>
                            <input type="text" value={this.state.user_name} onChange={this.handleChange.bind(this,'user_name')} placeholder="Name" className="form-control" ref="user_name_input" required/>
                        </div>
                        <div className="form-group form-group-lg">
                            <label className="control-label">Position / Title</label>
                            <input type="text" value={this.state.user_position} onChange={this.handleChange.bind(this,'user_position')} placeholder="Position/Title" className="form-control" ref="user_position_input" required/>
                        </div>
                        <div className="form-group form-group-lg">
                            <label className="control-label">Department</label>
                            <input type="text" value={this.state.user_department} onChange={this.handleChange.bind(this,'user_department')} placeholder="Department" className="form-control" ref="user_department_input" required/>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

});

module.exports = Page1;