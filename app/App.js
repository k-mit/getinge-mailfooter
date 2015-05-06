var React = require('react');
//var addons = require('react');
var TransitionGroup = require('react/lib/ReactCSSTransitionGroup');
var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler, Link } = Router;

var Page1 = require('./Page1');
var Page2 = require('./Page2');
var Page3 = require('./Page3');
var Page4 = require('./Page4');
var Page5 = require('./Page5');
var Preview = require('./components/Preview');
var addons = {
    update: require("react/lib/update")

};

var App = React.createClass({
    getInitialState: function () {
        return {
            userObj: {
                info    : {
                    user_name      : "James Smith",
                    user_position  : "Dummy person",
                    user_department: "Getinge Group Signature Generator"
                },
                address : {
                    user_street : "335 Angle drive",
                    user_city   : "Metropolis",
                    user_state  : "",
                    user_zip    : "11200",
                    user_country: "Somewhere"

                },
                logo    : {
                    name      : "",
                    properties: {
                        title: 'Getinge Group',
                        url  : 'images/logotypes/getingegroup.png',
                        link : 'http://www.getingegroup.com/',
                        size : {
                            width: 199,
                            height: 19
                        }
                    }
                },
                company : "Getinge Group Signature Generator",
                contacts: {
                    user_phone : "+46 8 555 44 44",
                    user_mobile: "+46 739 00 00",
                    user_email : "john.smith@signaturegenerator.com"

                }
            }
        };
    },
    updateValues   : function (userObj) {
        var stateObj = addons.update(this.state.userObj, {$merge: userObj});

        this.setState({userObj: stateObj}, function () {
            console.log(this.state.userObj);
        });
    },
    contextTypes   : {
        router: React.PropTypes.func
    },

    getUserObject: function () {
        return this.state.userObj;
    },
    render       : function () {

        var name = this.context.router.getCurrentPath();
        return (
            <div className="mg_widget">
                <div>
                    <ul className="table-view" table-view>
                        <li className="table-view-cell">
                            <Link to="info">Info</Link>
                        </li>
                        <li className="table-view-cell">
                            <Link to="area">Business Area</Link>
                        </li>
                        <li className="table-view-cell">
                            <Link to="address">Address</Link>
                        </li>
                        <li className="table-view-cell">
                            <Link to="contacts">Contact info</Link>
                        </li>
                        <li className="table-view-cell">
                            <Link to="extras">Extras</Link>
                        </li>
                    </ul>
                    <form id="mainform" >
                        <TransitionGroup className="transGroup" component="div" transitionName="card">
                            <RouteHandler key={name} hash updateCall={this.updateValues} initUserObj={this.getUserObject()} />
                        </TransitionGroup>
                    </form>
                </div>
                <Preview initUserObj={this.state.userObj} />
            </div>
        );
    }
});


var routes = (
    <Route path="/" handler={App}>
        <DefaultRoute handler={Page1}/>
        <Route path="/info" name="info" handler={Page1} />
        <Route path="/area"  name="area" handler={Page2} />
        <Route  path="/address" name="address" handler={Page3} />
        <Route  path="/contacts" name="contacts" handler={Page4} />
        <Route  path="/extras" name="extras" handler={Page5} />
    </Route>
);

Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.getElementById('main'));
});

module.exports = App;
