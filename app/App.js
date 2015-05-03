var React = require('react');
var TransitionGroup = require('react/lib/ReactCSSTransitionGroup');
var Router = require('react-router');
var { Route, RouteHandler, Link } = Router;
var Page1 = require('./Page1');
var Page2 = require('./Page2');
var Page3 = require('./Page3');
var Page4 = require('./Page4');
var Page5 = require('./Page5');
var ZeroClipboard = require('zeroclipboard');
var ReactZeroClipboard = require('react-zeroclipboard');
var user_name;

var App = React.createClass({
        getInitialState: function () {
            return {
                userObj: {
                    user_name: "",
                    user_position: "",
                    user_department: "",
                    user_street: "",
                    user_city: "",
                    user_state: "",
                    user_zip: "",
                    user_country: "",
                    user_phone: "",
                    user_mobile: "",
                    user_email: ""
                }
            };
        },
        updateValues: function (userObj,page) {
            var oldUserObj = this.state.userObj;
            switch(page) {
                case 1:
                    this.setState({
                        userObj:{
                            user_name: userObj.user_name,
                            user_position: userObj.user_position,
                            user_department: userObj.user_department,
                            user_street: oldUserObj.user_street,
                            user_city: oldUserObj.user_city,
                            user_state: oldUserObj.user_state,
                            user_zip: oldUserObj.user_zip,
                            user_country: oldUserObj.user_country,
                            user_phone: oldUserObj.user_phone,
                            user_mobile: oldUserObj.user_mobile,
                            user_email: oldUserObj.user_email

                        }
                    });
                    break;
                case 2:

                    break;
                case 3:
                    this.setState({
                        userObj: {
                            user_name: oldUserObj.user_name,
                            user_position: oldUserObj.user_position,
                            user_department: oldUserObj.user_department,
                            user_street: userObj.user_street,
                            user_city: userObj.user_city,
                            user_state: userObj.user_state,
                            user_zip: userObj.user_zip,
                            user_country: userObj.user_country,
                            user_phone: oldUserObj.user_phone,
                            user_mobile: oldUserObj.user_mobile,
                            user_email: oldUserObj.user_email
                        }
                    });
                    break;
                case 4:
                    this.setState({
                        userObj: {
                            user_name: oldUserObj.user_name,
                            user_position: oldUserObj.user_position,
                            user_department: oldUserObj.user_department,
                            user_street: oldUserObj.user_street,
                            user_city: oldUserObj.user_city,
                            user_state: oldUserObj.user_state,
                            user_zip: oldUserObj.user_zip,
                            user_country: oldUserObj.user_country,
                            user_phone: userObj.user_phone,
                            user_mobile: userObj.user_mobile,
                            user_email: userObj.user_email
                        }
                    });
                    break;
            }

        },
        contextTypes: {
            router: React.PropTypes.func
        }
        ,

        render: function () {

            var name = this.context.router.getCurrentPath();
            return (
                <div className="mg_widget">
                    <div>
                        <ul className="table-view" table-view>
                            <li className="table-view-cell">
                                <Link to="page1">Page 1</Link>
                            </li>
                            <li className="table-view-cell">
                                <Link to="page2">Page 2</Link>
                            </li>
                            <li className="table-view-cell">
                                <Link to="page3">Page 3</Link>
                            </li>
                            <li className="table-view-cell">
                                <Link to="page4">Page 4</Link>
                            </li>
                            <li className="table-view-cell">
                                <Link to="page5">Page 5</Link>
                            </li>
                        </ul>
                        <form id="mainform" >
                        <TransitionGroup className="transGroup" component="div" transitionName="card">
                            <RouteHandler key={name} updateCall={this.updateValues} initUserObj={this.state.userObj} />
                        </TransitionGroup>
                        </form>
                    </div>
                    <div className="resultArea">
                        <h3>Signature Preview</h3>
                        <span>Your signature will display below as you fill out your information to the left. Be sure to
                            include all required fields.</span>

                        <br />
                        <hr className="black" />
                        <div style={{fontFamily:'Arial', fontSize:'12px', color:'#000', lineHeight:'14px'}} ref="copy">
                        <br />
                        {this.state.userObj.user_name}<br />
                        {this.state.userObj.user_position}<br />
                        {this.state.userObj.user_department}<br />
                        <br />-------------------------------------<br />
                        <img src="images/getinge_group.png" />
                        <br />
                            <br />
                        {this.state.userObj.user_street}<br />
                        {this.state.userObj.user_city}, {this.state.userObj.user_state} {this.state.userObj.user_zip}<br />
                        {this.state.userObj.user_country}<br />
                        <br />

                            {this.state.userObj.user_phone.length>0 ? 'Phone:':''} {this.state.userObj.user_phone} <br />
                            {this.state.userObj.user_mobile>0 ? 'Cell:':''} {this.state.userObj.user_mobile}<br />
                            <a href="mailto:{this.state.userObj.user_email}" style={{fontFamily:'Arial', fontSize:'12px', color:'#000', lineHeight:'14px'}}>{this.state.userObj.user_email}</a><br />

                        </div>
                        <div>
                            <div>
                                <p>Click the button to copy some text</p>
                                <ReactZeroClipboard text="Hello, world!">
                                    <button>Copy</button>
                                </ReactZeroClipboard>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    })
    ;


var routes = (
    <Route handler={App}>
        <Route name="page1" handler={Page1} />
        <Route name="page2" handler={Page2} />
        <Route name="page3" handler={Page3} />
        <Route name="page4" handler={Page4} />
        <Route name="page5" handler={Page5} />
    </Route>
);

Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.getElementById('example'));
});

module.exports = App;
