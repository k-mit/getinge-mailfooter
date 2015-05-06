/**
 * Project: getinge-mailfooter
 * User: anton
 * Created: 06/05/15 | 18:39
 */
var React = require('react');
var ZeroClipboard = require('zeroclipboard');
var ReactZeroClipboard = require('react-zeroclipboard');

var Preview = React.createClass({
        getInitialState          : function () {
            console.log(this.props.initUserObj);
            return this.props.initUserObj;
        },
        componentWillReceiveProps: function (nextProps) {
            this.setState(nextProps.initUserObj);
        },
        rawFooter                : function () {
            return '<div style="font-family: \'Arial\'; font-size: 12px; color: #000; line-height: 14px">' +
                   this.state.info.user_name + '<br>' +
                   this.state.info.user_position + '<br>' +
                   this.state.info.user_department + '<br>' +
                   '<br>' +
                   '-------------------------------------<br>' +
                   '<br>' +
                   '<a href="' + this.state.logo.properties.link + '" target="_blank"><img border="0" width="' + this.state.logo.properties.size.width + '" height="' + this.state.logo.properties.size.height + '" title="' + this.state.logo.properties.title + '" alt="' + this.state.logo.properties.title + '"  src="' + this.state.logo.properties.url + '" /></a><br>' +
                   '<br>' +
                   this.state.company + '<br>' +
                   this.state.address.user_street + '<br>' +
                   this.state.address.user_city + ', ' + this.state.address.user_state + ' ' + this.state.address.user_zip + '<br>' +
                   this.state.address.user_country + '<br>' +
                   '<br>' +
                   (this.state.contacts.user_phone.length > 0 ? 'Phone:' : '') + ' ' + this.state.contacts.user_phone + '<br>' +
                   (this.state.contacts.user_mobile.length > 0 ? 'Mobile:' : '') + ' ' + this.state.contacts.user_mobile + '<br>' +
                   '<a href="mailto:' + this.state.contacts.user_email + '" style="font-family: \'Arial\';font-size  : 12px;color     : #0046ad;line-height: 14px">' + this.state.contacts.user_email + '</a>' + '<br>' +
                   '</div>';
        },
        render                   : function () {
            return (
                <div className="resultArea">
                    <h3>Signature Preview</h3>
                    <span>Your signature will display below as you fill out your information to the left. Be sure to
                        include all required fields.</span>

                    <br/>
                    <hr className="black" />
                    <div id="footer" dangerouslySetInnerHTML={{__html: this.rawFooter()}}/>
                    <div>
                        <div>
                            <p>Click the button to copy some text</p>
                            <ReactZeroClipboard text="Hello, world!">
                                <button>Copy</button>
                            </ReactZeroClipboard>
                        </div>
                    </div>
                </div>
            )
        }
    })
    ;


module.exports = Preview;