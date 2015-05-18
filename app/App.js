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
                address_format: 'USA',
                info: {
                    user_name: null,
                    user_position: null,
                    user_department: null,
                    valid: false
                },
                address: {
                    user_street: null,
                    user_city: null,
                    user_state: null,
                    user_zip: null,
                    user_country: null,
                    valid: false

                },
                logo: {
                    name: null,
                    properties: {
                        title: 'Getinge Group',
                        url: 'images/logotypes/getingegroup.png',
                        link: 'http://www.getingegroup.com/',
                        size: {
                            width: 199,
                            height: 19
                        }
                    },
                    valid: false
                },
                company: null,
                contacts: {
                    user_phone: null,
                    user_mobile: null,
                    user_email: null,
                    valid: false

                },
                banner: {
                    link: null,
                    image: false,
                    file: [
                        {
                            preview: "images/banner_placeholder.png"
                        }
                    ],
                    width: 503,
                    height: 108
                }
            }
        };
    },
    updateValues: function (userObj) {
        var stateObj = addons.update(this.state.userObj, {$merge: userObj});
        this.setState({userObj: stateObj});
    },
    contextTypes: {
        router: React.PropTypes.func
    },

    getUserObject: function () {
        return this.state.userObj;
    },
    render: function () {

        var name = this.context.router.getCurrentPath();
        return (
            <div id="ggmfg" className="row">
                <div id="Configure" className="col-md-6">
                    <ul className="navigator">
                        <li className="navigator__item">
                            <Link to="info">Info</Link>
                        </li>
                        <li className="navigator__item">
                            <Link to="area">Business Area</Link>
                        </li>
                        <li className="navigator__item">
                            <Link to="address">Address</Link>
                        </li>
                        <li className="navigator__item">
                            <Link to="contacts">Contact info</Link>
                        </li>
                        <li className="navigator__item">
                            <Link to="extras">Extras</Link>
                        </li>
                    </ul>
                    <TransitionGroup className="transGroup" component="div" transitionName="card">
                        <RouteHandler key={name} hash updateCall={this.updateValues} initUserObj={this.getUserObject()} />
                    </TransitionGroup>
                </div>
                <Preview initUserObj={this.state.userObj} updateCall={this.updateValues} />
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
