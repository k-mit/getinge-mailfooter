/**
 * Project: getinge-mailfooter
 * User: anton
 * Created: 06/05/15 | 18:39
 */
var React = require('react');
var ZeroClipboard = require('zeroclipboard');
var ReactZeroClipboard = require('react-zeroclipboard');
var Popover = require('react-bootstrap/lib/Popover');
var OverlayTrigger = require('react-bootstrap/lib/OverlayTrigger');
var urlPrefix = typeof window.gtng ? window.gtng.urlPrefix || '' : '';
var ln = '<br>\n';
var Preview = React.createClass({
        getInitialState: function () {
            var defaultObject = {
                info: {
                    user_name: "Your Full Name",
                    user_position: "Position or title",
                    user_department: "Department"
                },
                address: {
                    user_street: "Street address",
                    user_city: "City",
                    user_state: "",
                    user_zip: "00000",
                    user_country: "Country",
                    address_format: 'USA'
                },
                logo: {
                    name: "",
                    properties: {
                        title: 'Getinge Group',
                        url: 'images/logotypes/getingegroup.png',
                        link: 'http://www.getingegroup.com/',
                        size: {
                            width: 199,
                            height: 19
                        }
                    }
                },
                company: "Getinge Group",
                contacts: {
                    user_phone: "+00 0 000 00 00",
                    user_mobile: "+00 000 00 00 00",
                    user_email: "your.email@getingegroup.com"

                },
                banner: {
                    link: "",
                    image: false,
                    file: [
                        {
                            preview: "images/banner_placeholder.png"
                        }
                    ],
                    width: 503,
                    height: 108
                }
            };
            return {
                default: defaultObject,
                userObj: this.props.initUserObj
            }
        },
        componentWillReceiveProps: function (nextProps) {

            this.setState({userObj: nextProps.initUserObj});
        },
        getValue: function (keyString, allowBlank, getDefault) {
            var out = getDefault ? this.state.default : this.state.userObj,
                key = keyString.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
            key = key.replace(/^\./, '');           // strip a leading dot

            var a = key.split('.');
            for (var i = 0, n = a.length; i < n; ++i) {
                var k = a[i];
                if (k in out) {
                    out = out[k];
                } else {
                    return keyString;
                }
            }

            out = (typeof out === 'string') ? out : typeof out.value !== 'undefined' ? out.value : out;
            if (allowBlank !== true && (out === null || out === '')) {
                return this.getValue(keyString, true, true);
            }
            if (out === null) {
                return "";
            }
            if (typeof out === 'string' && getDefault === true) {
                out = '<span class="defaultext">' + out + '</span>';
            }
            return out;
        },
        handleChange: function (name, event) {
            var change = {};
            change[name] = event.target.value;
            this.setState({preview: change}, function () {
                this.props.updateCall({preview: this.state.preview});
            });

        },
        renderSelect: function (id, label, values, selectedValue, bindname, startoption) {
            var lkey = 1;
            var options = values.map(function (value) {
                lkey++;
                return <option value={value} key={lkey}>{value}</option>
            })

            return (

                <select className="form-control" id={id} onChange={this.handleChange.bind(this, bindname)} ref={id} value={this.state.address.address_format}>
                    <option value="" key={lkey++}>{startoption}</option>
                    {options}
                </select>
            )
        },
        rawFooter: function () {
            var banner = this.getValue('banner.image') ? '<a href="' + this.getValue('banner.link',true,false) + '" class="banner"><img width="303" height="70" src="' + this.getValue('banner.image') + '"></a>' : '';
            return '<div style="font-family: \'Arial\'; font-size: 12px; color: #000; line-height: 14px">' +
                (this.getValue('info.user_name') + ln) +
                (this.getValue('info.user_position') ? this.getValue('info.user_position') + ln : '') +
                (this.getValue('info.user_department') ? this.getValue('info.user_department') + ln : '') +
                ln +
                '<div style="height: 0px; border-top: 1px solid #787878; width: ' + this.getValue('logo.properties.size.width') + 'px"></div>'  +
                ln +
                (this.getValue('logo.properties.link') ? '<a href="' + this.getValue('logo.properties.link') + '" target="_blank"><img border="0" width="' + this.getValue('logo.properties.size.width') + '" height="' + this.getValue('logo.properties.size.height') + '" title="' + this.getValue('logo.properties.title') + '" alt="' + this.getValue('logo.properties.title') + '"  src="' + urlPrefix + this.getValue('logo.properties.url') + '" /></a><br>\n' : '') +
                ln +
                (this.getValue('company') ? this.getValue('company') + ln : '') +
                this.address_string() +
                ln +
                (this.getValue('contacts.user_phone', true).length > 0 ? 'Phone:' + ' ' + this.getValue('contacts.user_phone', true) + ln : '') +
                (this.getValue('contacts.user_mobile', true).length > 0 ? 'Mobile:' + ' ' + this.getValue('contacts.user_mobile', true) + ln : '') +
                (this.getValue('contacts.user_email') ? '<a href="mailto:' + this.getValue('contacts.user_email', true) + '" style="font-family: \'Arial\';font-size  : 12px;color     : #0046ad;line-height: 14px">' + this.getValue('contacts.user_email') + '</a>' + ln : '') +
                '<hr/>' +
                banner +
                '</div>';
        },
        address_string: function () {
            var adstr;
            var street = this.getValue('address.user_street');
            var city = this.getValue('address.user_city');
            var state = this.getValue('address.user_state');
            var zip = this.getValue('address.user_zip');
            var country = this.getValue('address.user_country');
            switch (this.state.userObj.address.address_format) {
                case 'USA':
                    adstr = (street ? street + ln : '') +
                    (city || state || zip ? city + ', ' + state + ' ' + zip + ln : '') +
                    (country ? country + ln : '');
                    break;
                case 'Europe':
                    adstr = (street ? street + ln : '') +
                    (city || zip ? zip + ' ' + city + ln : '') +
                    (country ? country + ln : '');
                    break;
                case 'UK':
                    adstr = (street ? street + ln : '') +
                    (city || state || zip ? city + ', ' + state + ' ' + zip + ln : '') +
                    (country ? country + ln : '');
                    break;
            }
            return adstr;
        },
        validateUserObject () {
            return this.checkNode(this.state.userObj);
        },
        checkNode : function (node) {
            if(typeof node === 'object' && node !== null) {
                if (typeof node.value === 'undefined') {
                    for(var key in node) {
                        var child = node[key];

                        if(this.checkNode(child)===false) {
                            return false;
                        }
                    }
                } else {
                    if (node.valid !== true) return false;
                }
            }
            return true;
        },
        render: function () {
            var copybutton;
            if(this.validateUserObject()) {
                copybutton = (
                    <ReactZeroClipboard text={this.rawFooter}>
                        <OverlayTrigger container={this} trigger='focus' placement='top' overlay={<Popover title='Footer generated'>The HTML-code to show your signature has been copied to your clipboard. Paste the signature into your email client</Popover>}>
                            <button className="btn btn-gtnginvert btn-lg">Copy signature to clipboard</button>
                        </OverlayTrigger>
                    </ReactZeroClipboard>
                )
            } else {
                copybutton = (
                    <OverlayTrigger container={this} trigger='focus' placement='top' overlay={<Popover title='Complete the form'>You have not completed the form yet. Fill out all fields and try again</Popover>}>
                        <button className="btn btn-gtnginvert btn-lg disabled">Copy signature to clipboard</button>
                    </OverlayTrigger>
                )
            }
            return (
                <div id="Preview">
                    <div>
                        <h3>Signature Preview</h3>
                        <span>Your signature will display below as you fill out your information to the left. Be sure to
                            include all required fields.</span>
                    </div>
                    <hr/>
                    <div id="footer" dangerouslySetInnerHTML={{__html: this.rawFooter()}}/>
                    <div>
                        <div className="description" dangerouslySetInnerHTML={{__html: window.gtng.body}}/>
                        <div>
                        {copybutton}
                        </div>
                    </div>
                </div>
            )
        }
    })
    ;


module.exports = Preview;