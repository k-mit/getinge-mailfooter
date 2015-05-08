var React = require('react');
var Dropzone = require('dropzone');
Dropzone.autoDiscover = false;


var Page5 = React.createClass({
    getInitialState: function () {
        return {
            file: [
                {
                    preview: "images/banner_placeholder.png",
                },
            ],
            width: '503px',
            height: '108px'
        };
    },

    onDrop: function (file) {
        this.setState({file: file});
    },

    render: function () {
        return (
            <div className="page page5">
                <div className="content">
                    <div className="card">
                        <h3>Promotional Banner (optional)</h3>
                        <label>Link that banner should link to</label>
                        <input className="textfields linkfield"/>
                        <DzReact onDrop={this.onDrop} width={503} height={108} maxWidth={503} maxHeight={108}>
                            <div className="dropText">
                                <p className="pe">Try dropping some files here, or click to select files to upload.
                                    <br />
                                    <br />
                                    File formats accepted are JPG and PNG only.
                                    Dimensions must be 606x141 pixels.</p>
                            </div>
                        </DzReact>
                        <div className="UploadButtonDiv">
                            <button>Upload Image</button>
                            <div className="buttonText"></div>
                        </div>
                        <label>Image preview</label>
                        <img src={this.state.file[0].preview} height={this.state.height} width={this.state.width}/>
                    </div>
                </div>
            </div>
        );
    }

});
Dropzone.autoDiscover = false;
var maxImageWidth = 800,
    maxImageHeight = 800;
Dropzone.options.DzReactId = {

    // Make sure only images are accepted
    acceptedFiles: "image/jpg,image/png",
    autoDiscover: false,
    init: function () {
        console.log('INIT!!')
        // Register for the thumbnail callback.
        // When the thumbnail is created the image dimensions are set.
        this.on("thumbnail", function (file) {
            // Do the dimension checks you want to do
            if (file.width > maxImageWidth || file.height > maxImageHeight) {
                file.rejectDimensions()
            }
            else {
                file.acceptDimensions();
            }
        });
    },

    // Instead of directly accepting / rejecting the file, setup two
    // functions on the file that can be called later to accept / reject
    // the file.
    accept: function (file, done) {
        file.acceptDimensions = done;
        file.rejectDimensions = function () {
            done("Invalid dimension.");
        };
        // Of course you could also just put the `done` function in the file
        // and call it either with or without error in the `thumbnail` event
        // callback, but I think that this is cleaner.
    }
};
var DzReact = React.createClass({
    getInitialState: function () {
        return {
            isDragActive: false
        }
    },

    propTypes: {
        onDrop: React.PropTypes.func.isRequired,
        width: React.PropTypes.number,
        height: React.PropTypes.number,
        maxWidth: React.PropTypes.number,
        maxHeight: React.PropTypes.number,
        style: React.PropTypes.object

    },

    onDragLeave: function (e) {
        this.setState({
            isDragActive: false
        });
    },

    onDragOver: function (e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = "copy";

        this.setState({
            isDragActive: true
        });
    },

    onDrop: function (e) {
        e.preventDefault();

        this.setState({
            isDragActive: false
        });

        var files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }

        for (var i = 0; i < files.length; i++) {
            files[i].preview = URL.createObjectURL(files[i]);
        }

        if (this.props.onDrop) {
            files = Array.prototype.slice.call(files);
            this.props.onDrop(files);
        }
    },

    onClick: function () {
        this.refs.fileInput.getDOMNode().click();
    },

    componentDidMount: function () {
        var options = {
            autoDiscover: false
        };
        for (var opt in Dropzone.prototype.defaultOptions) {
            var prop = this.props[opt];
            if (prop) {
                options[opt] = prop;
                continue;
            }
            options[opt] = Dropzone.prototype.defaultOptions[opt];
        }
        //this.dropzone = new Dropzone(this.getDOMNode(), options);
        //console.log(Dropzone)
    },

    componentWillUnmount: function () {
        this.dropzone.destroy();
        this.dropzone = null;
    },

    render: function () {

        var className = this.props.className || 'dropzone';
        if (this.state.isDragActive) {
            className += ' active';
        }
        ;

        var style = this.props.style || {
                width: this.props.width + 'px' || 100,
                height: this.props.height + 'px' || 100,
                borderStyle: this.state.isDragActive ? "solid" : "dashed"
            };
        var inputstyle = {display: 'none'};

        if (this.props.className) {
            style = this.props.style;
        }

        return (
            <div id="DzReactId" className={className} style={style} onClick={this.onClick} onDragLeave={this.onDragLeave} onDragOver={this.onDragOver} onDrop={this.onDrop}>
            {this.props.children}
                <input type="file" style={inputstyle} multiple="false" ref="fileInput" onChange={this.onDrop} />
            </div>
        );
    }

});

module.exports = Page5;