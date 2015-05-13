var React = require('react');
var Dropzone = require('dropzone');


var Page5 = React.createClass({
    getInitialState: function () {
        console.log(this.props.initUserObj);
        return this.props.initUserObj.banner;
    },
    onDrop: function (file, fileOk) {
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
            console.log('File format was ok!');
        } else {
            console.log('File format was not ok!');

        }
    },
    handleChange: function (name, event) {
        var change = {};
        change[name] = event.target.value;
        this.setState(change, function () {
            this.props.updateCall({banner: this.state});
        });

    },
    render: function () {
        return (
            <div className="page page5">
                <div className="content">
                    <div className="card">
                        <h3>Promotional Banner (optional)</h3>
                        <div className="form-group form-group-lg">
                            <label className="control-label">Banner link target</label>
                            <input type="text" value={this.state.url} onChange={this.handleChange.bind(this,'url')} placeholder="http://www.getingegroup.com" className="form-control linkfield" ref="user_country_input" required/>
                        </div>
                        <Uploader onUploadComplete={this.onDrop} fileObj={this.state.file}>
                            <p className="pe">
                                <strong>Drop files in this box or click here.</strong>
                                <br/>
                                File formats accepted are JPG and PNG only.
                                <br />
                                Dimensions must be 606x141 pixels.
                            </p>
                        </Uploader>
                    </div>
                </div>
            </div>
        );
    }

});

var maxImageWidth = 606,
    maxImageHeight = 141;


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
            url: '/#/extras',
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
                    if (file.width != 606 || file.height != 141 || !(file.type == "image/png" || file.type == "image/png")) {
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
                if (file.width != 606 || file.height != 141 || !(file.type == "image/png" || file.type == "image/png")) {
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
                width: this.props.width || 503,
                height: this.props.height || 108,
                borderStyle: "dashed",
                borderWidth: "thin",
                backgroundImage: "url("+this.props.fileObj[0].preview+")" || '',
                backgroundSize: "cover"
            };

        if (this.props.className) {
            style = this.props.style;
        }
        return (
            <form action="/#/extras" className="dropzone" id="dropzone" method="post">
                <div className={className} style={style} onDragLeave={this.onDragLeave} onDragEnter={this.onDragEnter} onClick={this.onClick}>
                    {this.props.children}
                    <input type="file" style={inputstyle} ref="fileInput" onChange={this.onDrop} />
                    <i className="fa fa-cloud-upload fa-4x"></i>
                </div>
            </form>
        );
    }
});
module.exports = Page5;