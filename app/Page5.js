var React = require('react');
var Dropzone = require('dropzone');

var Router = require('react-router');
var { Link } = Router;
var InputField = require('./components/InputField');
var Popover = require('react-bootstrap/lib/Popover');
var OverlayTrigger = require('react-bootstrap/lib/OverlayTrigger');

var Page5 = React.createClass({
    getInitialState: function () {
        return this.props.initUserObj.banner;
    },

    onDrop: function (file, fileOk) {
        this.setState({error:false});
        if (fileOk == 1) {
            file.preview = URL.createObjectURL(file);
            this.setState({file: [file]});
            var change = {};
            var change2 = {};
            change['file'] = this.state.file;
            this.setState(change, function () {
                this.props.updateCall({banner: this.state});
            });
            change2['image'] = file.preview;
            this.setState(change2, function () {
                this.props.updateCall({banner: this.state});
            });
            var self = this;
            var jsonSuccess = function (data) {
                change2['image'] = data;
                self.setState(change2, function () {
                    this.props.updateCall({banner: this.state});
                });
                console.log('success:', data);
            };
            var ajaxComplete = function (data) {
                console.log('Complete Fired');
            };

            var ajaxError = function (data) {
                console.error('Error on upload');
            };
            var data = new FormData(jQuery('form')[0]);
            $.ajax({
                type: 'POST',
                url: '?action=fileupload',
                data: data,
                cache: false,
                contentType: false,
                processData: false,
                success: jsonSuccess,
                error: ajaxError,
                complete: ajaxComplete
            });

            console.log('File format was ok!');
        } else {
            console.log('File format was not ok!');
            this.setState({error:true});


        }
    },
    handleChange: function (fieldvalues) {
        var change = {};
        change[fieldvalues.name] = fieldvalues;
        this.setState(change, function () {
            this.props.updateCall({banner: this.state});
        });

    },
    render: function () {
        var uploader = (<Uploader onUploadComplete={this.onDrop} fileObj={this.state.file} />);

        return (
            <div className="page page5">
                <div className="content">
                    <div className="card">
                        <h3>Promotional Banner (optional)</h3>
                        <InputField name="link" value={this.state.link.value} onChange={this.handleChange} placeholder="http://www.getingegroup.com" label="Banner Link Target"/>
                        <p className="pe">
                            <strong>Drop files in the box below or click on it to select a file.</strong>
                            <br/>
                            File formats accepted are JPG and PNG only.
                            <br />
                            The image must be 600 pixels wide.
                        </p>

                        <div id="findme" />
                        {uploader}
                        <Error active={this.state.error}><strong>Something went wrong!</strong> The image you tried to upload does not meet the requirements</Error>
                        <br/><br/>
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
    render: function () {
        if(this.props.active) {
            return (
                <div className="alert alert-danger" role="alert">{this.props.children}</div>
            )
        } else {
            return null;
        }
    }
});
var maxImageWidth = 600;


var Uploader = React.createClass({
    getInitialState: function () {
        return {
            isDragActive: false,
            fileOk: 3
        }
    },
    // invoked immediately after mounting occurs, initialize plugins
    componentDidMount: function () {
        var self = this;

        Dropzone.autoDiscover = false;
        var myDropzone = new Dropzone(this.getDOMNode(), {
            url: '?action=fileupload',
            acceptedFiles: "image/*",
            dictDefaultMessage: '',
            thumbnailWidth: 0,
            thumbnailHeight: 0,
            dictInvalidFileType: 'Only png or jpg files in the correct size',
            accept: function (file, done) {
                if (self.state.fileOk == 3) {
                    this.emit("addedfile", file);
                    this.emit("thumbnail", file, file.preview);
                }
                done;
            },
            init: function () {
                this.on("addedfile", function (file) {
                    file.acceptFile = function () {
                        self.setState({fileOk: 1});
                    }
                    file.rejectFile = function () {
                        self.setState({fileOk: 0});
                    }
                });

                this.on("thumbnail", function (file) {
                    if (file.width != maxImageWidth || !(file.type == "image/png" || file.type == "image/jpg" || file.type == "image/jpeg")) {
                        self.props.onUploadComplete(file, 0);
                    } else {
                        self.props.onUploadComplete(file, 1);
                    }

                    // Do the dimension checks you want to do
                });
            }
        });

        myDropzone.on("complete", function (file) {
            if (self.state.fileOk == 3) {
                this.emit("addedfile", file);
                this.emit("thumbnail", file, file.preview);
            }

            self.props.onUploadComplete(file, self.state.fileOk);
        });
        this.props.myDropzone = myDropzone;
    },

    onClick: function () {
        this.refs.fileInput.getDOMNode().click();
    },
    onDrop: function (e) {
        var self = this;
        var files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        files = Array.prototype.slice.call(files);
        if (this.state.fileOk == 3) {
            files[0].preview = URL.createObjectURL(files[0]);
            var file = files[0];

            var img = new Image();
            img.onload = function () {
                file.width = this.width;
                file.height = this.height;
                if (file.width != maxImageWidth || !(file.type == "image/png" || file.type == "image/jpg" || file.type == "image/jpeg")) {
                    self.props.onUploadComplete(file, 0);
                } else {
                    self.props.onUploadComplete(file, 1);
                }
            }
            img.src = file.preview;
        }
    },
    render: function () {
        var inputstyle = {display: 'none'};
        var className = this.props.className || 'dzReactClass';
        if (this.state.isDragActive) {
            className += ' active';
        }
        ;

        var style = this.props.style || {
                width: this.props.width || 300,
                height: this.props.height || 100,
                borderStyle: "dashed",
                borderWidth: "thin",
                backgroundImage: "url(" + this.props.fileObj[0].preview + ")" || '',
                backgroundSize: "cover"
            };

        if (this.props.className) {
            style = this.props.style;
        }
        return (
            <div>
                <form action="?action=fileupload" className="dropzone" id="dropzone" method="post">
                    <div className={className} style={style} onDragLeave={this.onDragLeave} onDragEnter={this.onDragEnter} onClick={this.onClick}>
                    {this.props.children}
                        <input type="file" style={inputstyle} id="fileInput" name="fileInput" ref="fileInput" onChange={this.onDrop} />
                        <i className="fa fa-cloud-upload fa-4x"></i>
                    </div>

                </form>
            </div>
        );
    }
});
module.exports = Page5;