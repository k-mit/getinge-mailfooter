var React = require('react');
var Router = require('react-router');
var Bootstrap = require('react-bootstrap');
var { Link } = Router;
var InputField = require('./components/InputField');
var Popover = require('react-bootstrap/lib/Popover');
var OverlayTrigger = require('react-bootstrap/lib/OverlayTrigger');
var bannerSuffix = typeof window.gtng ? window.gtng.bannerSuffix || 'utm_source=email&utm_medium=signature&utm_campaign=banner' : 'utm_source=email&utm_medium=signature&utm_campaign=banner';

var Page5 = React.createClass({
    getInitialState: function () {
        return this.props.initUserObj.banner;
    },
    componentDidMount: function () {
        var self = this;
        this.setState({errorText: ''});
        this.setState({error: false});

        jQuery(React.findDOMNode(this.refs.fileupload)).on('change', function() {
            var input = $(this),
                numFiles = input.get(0).files ? input.get(0).files.length : 1,
                label = input.val().replace(/\\/g, '/').replace(/.*\//, ''),
                textfield = jQuery(React.findDOMNode(self.refs.fileuploadtext)),
                log = numFiles > 1 ? numFiles + ' files selected' : label;
            if( textfield.length ) {
                textfield.val(log);
            } else {
                if( log ) alert(log);
            }
        });

        jQuery(React.findDOMNode(this.refs.fileupload)).fileupload({
            dataType: 'json',
            url: window.gtng.uploadUrl,
            allowedFileExtensions: ['jpg', 'png', 'jpeg'],
            autoUpload: true,
            done: function (e, data) {
                var uself=self;

                var file = data.result.files[0]
                if (file.error) {
                    self.setState({errorText: file.error});
                    self.setState({error: true});
                } else {
                    var img = new Image();
                    img.onload = function () {
                        var width = this.width;
                        var height = this.height;
                        uself.setState({width: width, height: height});
                    }
                    img.src = file.url;
                    self.setState({error: false, file: [file],image: file.url});
                    var change = {};
                    change['file'] = self.state.file;
                    self.setState(change, function () {
                        self.props.updateCall({banner: self.state});
                    });

                }
            },
            fail: function (e, data) {
            },
            add: function (e, data) {
                var files;
                if (data.dataTransfer) {
                    files = data.dataTransfer.files;
                } else if (data) {
                    files = data.files;
                }
                var file = files[0];
                data.submit();
            }

        });
    },
    handleChange: function (fieldvalues) {
        var change = {};
        change[fieldvalues.name] = fieldvalues;
        this.setState(change, function () {
            this.props.updateCall({banner: this.state});
        });

    },
    suffixChange: function (evt) {
        this.setState({
            link_suffix: evt.target.checked
        }, function () {
            this.props.updateCall({banner: this.state});
        });

    },
    banner: function () {
        return this.state.image ? '<img src="' + this.state.image + '" />' : '';
    },
    render: function () {
        return (
            <div className="page page5">
                <div className="content">
                    <div className="card">
                        <h3>Promotional Banner (optional)</h3>
                        <InputField name="link" value={this.state.link.value} onChange={this.handleChange} placeholder="http://www.getingegroup.com" label="Banner Link Target"/>

                        <div className="checkbox">
                            <label>
                                <input type="checkbox" name="link_suffix"  onChange={this.suffixChange} checked={this.state.link_suffix} />
                                Append tracking parameters to the banner link if url is provided
                            </label>

                        </div>

                        <br/>
                        <div className="form-group">
                        <label>Upload file</label>
                        <div className="input-group">
                            <span className="input-group-btn">
                                <span className="btn btn-primary fileinput-button btn-file">
                                    <span className="icon-folder" /> Browse <input id="fileupload" type="file" name="files[]" ref="fileupload" />
                                </span>
                            </span>
                            <input ref="fileuploadtext" type="text" className="form-control" readOnly />
                        </div>
                        <span className="help-block">
                            File formats accepted are JPG and PNG only.<br />
                            The image must be 600 pixels wide.
                        </span>
                            </div>
                        <div id="banner" className="margin-top1em" dangerouslySetInnerHTML={{__html: this.banner()}}/>
                        <Error active={this.state.error}>
                            <strong>There was a problem uploading the file! </strong>
                        {this.state.errorText}</Error>
                        <br/>
                        <br/>
                        <div className="clearfix">
                            <Link className="btn btn-gtng pull-left" to="contacts">Previous: Contact info</Link>

                        </div>

                    </div>
                </div>
            </div>
        );
    }

});
var Error = React.createClass({
    render: function () {
        if (this.props.active) {
            return (
                <div className="alert alert-danger margin-top1em" role="alert">{this.props.children}</div>
            )
        } else {
            return null;
        }
    }
});

module.exports = Page5;