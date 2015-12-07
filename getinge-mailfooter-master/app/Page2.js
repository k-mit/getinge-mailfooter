var React = require('react');
var Router = require('react-router');
<<<<<<< HEAD
var RadioGroup = require('react-radio-group');
var { Link } = Router;
var InputField = require('./components/InputField');
var bareaarray = ['Sales Region','Business Category Unit','Getinge Group Corporate Department'];
=======
var { Link } = Router;
var InputField = require('./components/InputField');
>>>>>>> f7c569b199e8d21722a46abeb675763485ea6803

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

<<<<<<< HEAD


=======
>>>>>>> f7c569b199e8d21722a46abeb675763485ea6803
var LogoSelector = React.createClass({
    getInitialState: function () {
        return {
            imageSelected: this.props.imageSelected,
            logos        : {
                'getingegroup' : {
                    title: 'Getinge Group',
                    url  : 'images/logotypes/getingegroup.png',
                    link : 'http://www.getingegroup.com/',
                    size : {
                        width: 190,
                        height: 67
                    }

                },
                'maquet'       : {
                    title: 'Maquet Getinge Group',
                    url  : 'images/logotypes/maquet_getingegroup.png',
                    link : 'http://www.maquet.com/',
                    size : {
                        width: 160,
                        height: 73
                    }
                },
                'getinge'      : {
                    title: 'Getinge Getinge Group',
                    url  : 'images/logotypes/getinge_getingegroup.png',
                    link : 'http://www.getinge.com/',
                    size : {
                        width: 156,
                        height: 74
                    }
                },
                'arjohuntleigh': {
                    title: 'Arjo Huntleigh Getinge Group',
                    url  : 'images/logotypes/arjohuntleigh_getingegroup.png',
                    link : 'http://www.arjohuntleigh.com/',
                    size : {
                        width: 232,
                        height: 65
                    }
                }
            }
        };
    },
    handleClick    : function (target) {
        this.setState({imageSelected: target.props.shortname},function () {
            this.props.updateCall({'logo': {
                name: this.state.imageSelected,
                properties : this.state.logos[this.state.imageSelected]
            }})

        });
    },
    render         : function () {
        var self = this;
        var logoNodes = Object.keys(this.state.logos).map(function (key) {
            var logoitem = self.state.logos[key];

            var selected = key === self.state.imageSelected;
            return (
                <LogoItem selected={selected} key={key} url={logoitem.url} shortname={key} onClick={self.handleClick}>

                </LogoItem>
            );
        });
        return (
            <ul className="logoselector">
                {logoNodes}
            </ul>
        );

    }
});
var Page2 = React.createClass({
    getInitialState: function () {
<<<<<<< HEAD
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
=======
        return {
            company: this.props.initUserObj.company
        };
    },
    handleChange: function (fieldvalues) {
        var change = {};
        change[fieldvalues.name] = fieldvalues;

        this.setState(change, function () {
            this.props.updateCall({company: this.state.company});
        });

    },

>>>>>>> f7c569b199e8d21722a46abeb675763485ea6803
    render         : function () {
        return (
            <div className="page page2">
                <div className="content">
                    <div className="card">
                        <h3>Business Area</h3>
<<<<<<< HEAD
                        Select your sales region,business category unit or department. Your selection will determin the logos used in your signature.<br/><br/>
                        Sales Region / Business Category Unit / Department<br/><br/>
                        {this.renderMainSelect('mainDropValue', 'Sales Region / Business Category Unit / Department', bareaarray, this.state.mainDropValue.value, 'mainDropValue', 'Select one')}<br />
                        {this.renderMainResult()}
                        <br />
=======
                {this.props.key}
                        Select your business area logo.
                        <LogoSelector imageSelected={this.props.initUserObj.logo.name} updateCall={this.props.updateCall}/>
                        <InputField name="company" value={this.state.company.value} onChange={this.handleChange} placeholder="Company Name/Business Area" label="Company Name/Business Area" required/>
>>>>>>> f7c569b199e8d21722a46abeb675763485ea6803
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