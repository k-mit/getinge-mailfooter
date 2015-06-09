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
var urlPrefix = typeof window.gtng ? window.gtng.urlPrefix || '' : '';
var Header = require('./components/Header');
var addons = {
    update: require("react/lib/update")
};

var App = React.createClass({
    getInitialState: function () {
        return {

            userObj: {
                info: {
                    user_name: {value: null},
                    user_position: {value: null},
                    user_department: {value: null}
                },
                address: {
                    user_street: {value: null},
                    user_city: {value: null},
                    user_state: {value: null, valid: true},
                    user_zip: {value: null},
                    user_country: {value: null},
                    address_format: 'USA'
                },
                logo: {
                    name: {value: null},
                    properties: {
                        title: 'Getinge Group',
                        url: 'images/logotypes/getingegroup.png',
                        link: 'http://www.getingegroup.com/',
                        size: {
                            width: 199,
                            height: 52
                        }
                    }
                },
                company: {value: null},
                contacts: {
                    user_phone: {value: null, valid: true},
                    user_mobile: {value: null, valid: true},
                    user_email: {value: null}

                },
                banner: {
                    link: {value: null, valid: true},
                    link_suffix: true,
                    image: false,
                    file: [
                        {
                            preview: urlPrefix + "images/banner_placeholder.png"
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
            <div id="ggmfg" >
                <Header/>
                <div className="row ggmfg-main">
                    <div className="col-md-7">
                        <div id="Configure">
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
                {/*<TransitionGroup className="transGroup" component="div" transitionName="card">*/}
                            <RouteHandler key={name} hash updateCall={this.updateValues} initUserObj={this.getUserObject()} />
                {/*</TransitionGroup>*/}
                        </div>
                    </div>
                    <div className="col-md-5">
                        <Preview initUserObj={this.state.userObj} updateCall={this.updateValues} />
                    </div>
                </div>
            </div>
        );
    }
});

function RedirectTo(destination) {
    return React.createClass({
        statics: {
            willTransitionTo: function (transition) {
                transition.redirect(destination);
            }
        },
        render: function () {
        }
    });
}

var routes = (
    <Route path="/" handler={App}>
        <DefaultRoute handler={ RedirectTo('/info') }/>
        <Route path="/info" name="info" handler={Page1} />
        <Route path="/area"  name="area" handler={Page2} />
        <Route  path="/address" name="address" handler={Page3} />
        <Route  path="/contacts" name="contacts" handler={Page4} />
        <Route  path="/extras" name="extras" handler={Page5} />
    </Route>
);

Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.getElementById('main_jsx_mailfooter'));
});
module.exports = App;
