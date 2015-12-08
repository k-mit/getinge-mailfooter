var React = require('react');
var Router = require('react-router');
var RadioGroup = require('react-radio-group');
var { Link } = Router;
var InputField = require('./components/InputField');
var bareaarray = ['Sales Region','Business Category Unit','Getinge Group Corporate Department'];

var LogoItem = React.createClass({
    handleClick: function (e) {
        this.props.onClick(this);
    },
    render     : function () {
        var classString = "selectLogo " + this.props.shortname + (this.props.selected ? ' active' : '');

        return (
            <li className={classString} onClick={this.handleClick}>{this.props.title}</li>
        )
    }
});


var Page2 = React.createClass({
    getInitialState: function () {
        return this.props.initUserObj.department;
    },
    renderMainSelect: function (id, label, values, selectedValue, bindname, startoption) {
        var lkey = 1;
        var options = values.map(function (value) {
            lkey++;
            return <option value={value} key={lkey} >{value}</option>
        })

        return (

        <select className="form-control" id={id} onChange={this.handleChangeDrop.bind(this, bindname)} ref={id} value={this.state.mainDropValue}>
                <option value="" key={lkey++}>{startoption}</option>
                {options}
            </select>
        )
    },
    handleChangeDrop: function (name, event) {
        var change = {};
        change[name] = event.target.value;
        this.setState(change, function () {
            this.props.updateCall({department: this.state});
        });
    },

    handleChange: function (fieldvalues) {
        var change = {};
        change[fieldvalues.name] = fieldvalues;
        change['bottom_logos'] = ['maquet','arjohuntleigh','getinge'];
        this.setState(change, function () {
            this.props.updateCall({department: this.state});
        });
    },
    handleSalesRegionChange: function(value){
        var change = {};
        change['salesRegion'] = value;
        change['user_department'] = value;
        change['bottom_logos'] = ['maquet','arjohuntleigh','getinge'];
        this.setState(change, function () {
            this.props.updateCall({department: this.state});
        });
    },
    handleBuscatunitChange: function(value){
        var change = {};
        var text_value='';
        switch(value){
            case '1':
                text_value="Acute Care Therapies";
                change['bottom_logos'] = ['maquet'];
                break;
            case '2':
                text_value="Patient & Post Acute Car";
                change['bottom_logos'] = ['arjohuntleigh'];
                break;
            case '3':
                text_value="Surgical Workflows";
                change['bottom_logos'] = ['maquet','getinge'];
                break;
        }
        change['buscatunit'] = value;
        change['user_department'] = text_value;
        this.setState(change, function () {
            this.props.updateCall({department: this.state});
        });
    },
    renderMainResult: function (){
        switch (this.state.mainDropValue){
            case 'Sales Region':
                return (
                    <span>
                <RadioGroup name="salesRegionRadio" selectedValue={this.state.salesRegion} onChange={this.handleSalesRegionChange}>
                    {Radio => (
                        <div>
                            <Radio value="Americas" />&nbsp;&nbsp;Americas<br/>
                            <Radio value="Europe, Middle East & Africa" />&nbsp;&nbsp;Europe, Middle East & Africa<br/>
                            <Radio value="Asia Pacific" />&nbsp;&nbsp;Asia Pacific<br/>
                        </div>
                    )}
                </RadioGroup>
                        </span>
                    );
                break;
            case 'Business Category Unit':
                return(

                <RadioGroup name="buscatunitRadio" selectedValue={this.state.buscatunit} onChange={this.handleBuscatunitChange}>
                    {Radio => (
                        <div>
                            <Radio value="1" />&nbsp;&nbsp;Acute Care Therapies<br/>
                            <Radio value="2" />&nbsp;&nbsp;Patient & Post Acute Care<br/>
                            <Radio value="3" />&nbsp;&nbsp;Surgical Workflows<br/>
                        </div>
                    )}
                </RadioGroup>

                );
                break;
            case 'Getinge Group Corporate Department':
                return(
                    <InputField minlength={2} name="user_department" value={this.state.user_department.value} onChange={this.handleChange} placeholder="Department Name" label="Department Name" required/>
                );
                break;
        }
        return '';
    },
    render         : function () {
        return (
            <div className="page page2">
                <div className="content">
                    <div className="card">
                        <h3>Business Area</h3>
                        Select your sales region,business category unit or department. Your selection will determin the logos used in your signature.<br/><br/>
                        Sales Region / Business Category Unit / Department<br/><br/>
                        {this.renderMainSelect('mainDropValue', 'Sales Region / Business Category Unit / Department', bareaarray, this.state.mainDropValue.value, 'mainDropValue', 'Select one')}<br />
                        {this.renderMainResult()}
                        <br />
                    </div>
                </div>
                <div className="clearfix">
                    <Link className="btn btn-gtng pull-left" to="info">Previous: Info</Link>
                    <Link className="btn btn-gtng pull-right" to="address">Next: Address</Link>
                </div>

            </div>
        );
    }

});

module.exports = Page2;