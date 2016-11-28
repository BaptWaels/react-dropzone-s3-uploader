'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactS3UploaderS3upload = require('react-s3-uploader/s3upload');

var _reactS3UploaderS3upload2 = _interopRequireDefault(_reactS3UploaderS3upload);

var _reactDropzone = require('react-dropzone');

var _reactDropzone2 = _interopRequireDefault(_reactDropzone);

var DropzoneS3Uploader = (function (_React$Component) {
  _inherits(DropzoneS3Uploader, _React$Component);

  function DropzoneS3Uploader() {
    var _this = this;

    _classCallCheck(this, DropzoneS3Uploader);

    _React$Component.apply(this, arguments);

    this.onProgress = function (progress) {
      _this.props.onProgress && _this.props.onProgress(progress);
      _this.setState({ progress: progress });
    };

    this.onError = function (err) {
      _this.props.onError && _this.props.onError(err);
      _this.setState({ error: err, progress: null });
    };

    this.onFinish = function (info) {
      var filenames = _this.state.filenames || [];
      var filename = info.filename;
      filenames.push(filename);
      _this.setState({ filename: filename, filenames: filenames, error: null, progress: null }, function () {
        return _this.props.onFinish && _this.props.onFinish(info);
      });
    };

    this.handleDrop = function (files, rejectedFiles) {
      _this.setState({ filenames: [], filename: null, error: null, progress: null });

      new _reactS3UploaderS3upload2['default']({ // eslint-disable-line
        files: files,
        filenamePrefix: _this.props.filenamePrefix || '',
        signingUrl: _this.props.signing_url || _this.props.signingUrl || '/s3/sign',
        signingUrlQueryParams: _this.props.signing_url_query_params || _this.props.signingUrlQueryParams || {},
        signingUrlHeaders: _this.props.signing_url_headers || _this.props.signingUrlHeaders || {},
        onProgress: _this.onProgress,
        onFinishS3Put: _this.onFinish,
        onError: _this.onError,
        uploadRequestHeaders: _this.props.headers || { 'x-amz-acl': 'public-read' },
        contentDisposition: 'auto',
        server: _this.props.server || _this.props.host || ''
      });

      _this.props.onDrop && _this.props.onDrop(files, rejectedFiles);
    };

    this.renderFileComponent = function (_ref) {
      var filename = _ref.filename;
      return _react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement('span', { className: 'glyphicon glyphicon-file', style: { fontSize: '50px' } }),
        filename
      );
    };
  }

  DropzoneS3Uploader.prototype.render = function render() {
    var state = this.state || { filename: this.props.filename };
    var _props = this.props;
    var className = _props.className;
    var style = _props.style;
    var multiple = _props.multiple;
    var accept = _props.accept;
    var filename = state.filename;
    var filenames = state.filenames;
    var progress = state.progress;
    var error = state.error;

    var s3Url = this.props.s3Url || this.props.s3_url;
    var fileUrl = filename ? s3Url + '/' + filename : null;
    var fileUrls = filenames ? filenames.map(function (filename) {
      return s3Url + '/' + filename;
    }) : null;
    var ProgressComponent = this.props.progressComponent;
    var FileComponent = this.props.fileComponent || this.renderFileComponent;

    var dropzoneProps = {
      className: className,
      style: style,
      multiple: multiple,
      accept: accept,
      disableClick: this.props.disable_click || this.props.disableClick,
      activeStyle: this.props.active_style || this.props.activeStyle,
      rejectStyle: this.props.reject_style || this.props.rejectStyle,
      minSize: this.props.min_file_size || this.props.minFileSize,
      maxSize: this.props.max_file_size || this.props.maxFileSize
    };

    var imageStyle = this.props.image_style || this.props.imageStyle;
    var childProps = { fileUrl: fileUrl, fileUrls: fileUrls, s3Url: s3Url, filename: filename, filenames: filenames, progress: progress, error: error, imageStyle: imageStyle };

    var contents = null;
    if (this.props.children) {
      contents = this.props.children;
    } else if (fileUrl) {
      if (this.props.isImage(fileUrl)) {
        contents = _react2['default'].createElement('img', { src: fileUrl, style: imageStyle });
      } else {
        contents = _react2['default'].createElement(FileComponent, childProps);
      }
    }

    return _react2['default'].createElement(
      _reactDropzone2['default'],
      _extends({ onDrop: this.handleDrop }, dropzoneProps),
      contents,
      progress && ProgressComponent ? _react2['default'].createElement(ProgressComponent, { progress: progress }) : null,
      error ? _react2['default'].createElement(
        'small',
        null,
        error
      ) : null
    );
  };

  _createClass(DropzoneS3Uploader, null, [{
    key: 'propTypes',
    value: {
      host: _react.PropTypes.string,
      server: _react.PropTypes.string,
      s3Url: _react.PropTypes.string,
      s3_url: _react.PropTypes.string,
      signing_url: _react.PropTypes.string,
      signingUrl: _react.PropTypes.string,
      signing_url_query_params: _react.PropTypes.object,
      signingUrlQueryParams: _react.PropTypes.object,
      signing_url_headers: _react.PropTypes.object,
      signingUrlHeaders: _react.PropTypes.object,
      className: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.array]),
      filenamePrefix: _react.PropTypes.string,

      fileComponent: _react.PropTypes.func,
      progressComponent: _react.PropTypes.func,
      onDrop: _react.PropTypes.func,
      onError: _react.PropTypes.func,
      onProgress: _react.PropTypes.func,
      onFinish: _react.PropTypes.func,
      isImage: _react.PropTypes.func,

      children: _react.PropTypes.element,
      headers: _react.PropTypes.object,
      multiple: _react.PropTypes.bool,
      accept: _react.PropTypes.string,
      filename: _react.PropTypes.string,
      max_file_size: _react.PropTypes.number,
      maxFileSize: _react.PropTypes.number,
      min_file_size: _react.PropTypes.number,
      minFileSize: _react.PropTypes.number,

      style: _react.PropTypes.object,
      active_style: _react.PropTypes.object,
      activeStyle: _react.PropTypes.object,
      reject_style: _react.PropTypes.object,
      rejectStyle: _react.PropTypes.object,
      image_style: _react.PropTypes.object,
      imageStyle: _react.PropTypes.object,
      disable_click: _react.PropTypes.bool,
      disableClick: _react.PropTypes.bool
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      className: 'react-dropzone-s3-uploader',
      multiple: false,
      isImage: function isImage(filename) {
        return filename && filename.match(/\.(jpeg|jpg|gif|png|svg)/i);
      },
      style: {
        width: 200,
        height: 200,
        border: 'dashed 2px #999',
        borderRadius: 5,
        position: 'relative',
        cursor: 'pointer',
        overflow: 'hidden'
      },
      activeStyle: {
        borderStyle: 'solid',
        backgroundColor: '#eee'
      },
      rejectStyle: {
        borderStyle: 'solid',
        backgroundColor: '#ffdddd'
      },
      imageStyle: {
        position: 'absolute',
        top: 0,
        left: 0,
        maxWidth: '100%',
        height: 'auto'
      }
    },
    enumerable: true
  }]);

  return DropzoneS3Uploader;
})(_react2['default'].Component);

exports['default'] = DropzoneS3Uploader;
module.exports = exports['default'];
