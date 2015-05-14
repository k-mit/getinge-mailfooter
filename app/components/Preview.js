/**
 * Project: getinge-mailfooter
 * User: anton
 * Created: 06/05/15 | 18:39
 */
var React = require('react');
var ZeroClipboard = require('zeroclipboard');
var ReactZeroClipboard = require('react-zeroclipboard');
var Popover = require('react-bootstrap/lib/Popover');
var OverlayTrigger= require('react-bootstrap/lib/OverlayTrigger');
var addressformatsarray = ['USA','Sweden'];
var Preview = React.createClass({
        getInitialState          : function () {
            return this.props.initUserObjTemp;
        },
        componentWillReceiveProps: function (nextProps) {

            this.setState(nextProps.initUserObj);
        },
        handleChange: function (name, event) {
            var change = {};
            change[name] = event.target.value;
            this.setState(change, function () {
                this.props.updateCall({preview: this.state});
            });

        },
        renderSelect: function (id, label, values, selectedValue,bindname,startoption) {
            var lkey = 1;
            var options = values.map(function (value) {
                    lkey++;
                    return <option value={value} key={lkey}>{value}</option>
            })

            return (
                <select className="form-control" id={id} onChange={this.handleChange.bind(this, bindname)} ref={id} value={this.state.preview.address_format}>
                    <option value="" key={lkey++}>{startoption}</option>
                    {options}
                </select>
            )
        },
        rawFooter                : function () {
            var banner = this.state.banner.image ? '<a href="'+this.state.banner.link+'" class="banner"><img src="'+this.state.banner.image+'"></a>' : '';
            return '<div style="font-family: \'Arial\'; font-size: 12px; color: #000; line-height: 14px">' +
                (this.state.info.user_name ? this.state.info.user_name + '<br>\n' : '')  +
                (this.state.info.user_position? this.state.info.user_position + '<br>\n':'') +
                (this.state.info.user_department ? this.state.info.user_department + '<br>\n':'') +
                   '<br>\n' +
                   '-------------------------------------<br>\n' +
                   '<br>\n' +
                (this.state.logo.properties.link ? '<a href="' + this.state.logo.properties.link + '" target="_blank"><img border="0" width="' + this.state.logo.properties.size.width + '" height="' + this.state.logo.properties.size.height + '" title="' + this.state.logo.properties.title + '" alt="' + this.state.logo.properties.title + '"  src="' + this.state.logo.properties.url + '" /></a><br>\n':'') +
                   '<br>\n' +
                (this.state.company ? this.state.company + '<br>\n':'') +
                    this.address_string()+
                   '<br>\n' +
                   (this.state.contacts.user_phone.length > 0 ? 'Phone:'+' ' + this.state.contacts.user_phone + '<br>\n' : '') +
                   (this.state.contacts.user_mobile.length > 0 ? 'Mobile:' + ' ' + this.state.contacts.user_mobile + '<br>\n' : '') +
                (this.state.contacts.user_email ? '<a href="mailto:' + this.state.contacts.user_email + '" style="font-family: \'Arial\';font-size  : 12px;color     : #0046ad;line-height: 14px">' + this.state.contacts.user_email + '</a>' + '<br>\n':'') +
                   '<hr/>'+
                    banner+
                   '</div>';
        },
        address_string: function(){
            var adstr;
            switch(this.state.preview.address_format){
                case 'USA':
                    adstr = (this.state.address.user_street ? this.state.address.user_street + '<br>\n' : '') +
                            (this.state.address.user_city || this.state.address.user_state || this.state.address.user_zip ? this.state.address.user_city + ', ' + this.state.address.user_state + ' ' + this.state.address.user_zip + '<br>\n':'') +
                            (this.state.address.user_country ? this.state.address.user_country + '<br>\n':'');
                    break;
                case 'Sweden':
                    adstr = (this.state.address.user_street ? this.state.address.user_street + '<br>\n' : '') +
                    (this.state.address.user_city || this.state.address.user_zip ? this.state.address.user_zip + ' ' + this.state.address.user_city + '<br>\n':'') +
                    (this.state.address.user_country ? this.state.address.user_country + '<br>\n':'');
                    break;
            }
            return adstr;
        },
        render                   : function () {
            return (
                <div id="Preview" className="col-md-6">
                    <h3>Signature Preview</h3>
                    <span>Your signature will display below as you fill out your information to the left. Be sure to
                        include all required fields.</span>
                    <label>Select adress format</label>
                {this.renderSelect('addressformatselect','Address Format',addressformatsarray,this.state.preview.address_format,'address_format','Select Address Format')}
                    <hr className="black" />
                    <div id="footer" dangerouslySetInnerHTML={{__html: this.rawFooter()}}/>
                    <div>
                        <div>
                            <p>Press the button to copy the footer to the clipboard and then paste it into your mail clients field for the footer.</p>
                            <ReactZeroClipboard text={this.rawFooter}>
                                <OverlayTrigger container={this} trigger='focus' placement='top' overlay={<Popover title='Footer generated'>The HTML-code to show your footer has been copied to your clipboard. Paste the footer into your email client</Popover>}>
                                    <button className="btn btn-primary btn-lg">Copy footer to clipboard</button>
                                </OverlayTrigger>

                            </ReactZeroClipboard>
                        </div>
                    </div>
                </div>
            )
        }
    })
    ;


module.exports = Preview;