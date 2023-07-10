"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _stimulus = require("@hotwired/stimulus");
require("select2");
require("select2/dist/js/i18n/es");
require("select2/dist/js/i18n/ca");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/* stimulusFetch: 'lazy' */
var _default = /*#__PURE__*/function (_Controller) {
  _inherits(_default, _Controller);
  var _super = _createSuper(_default);
  function _default() {
    var _this;
    _classCallCheck(this, _default);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "isSelect", function () {
      return _this.element.nodeName === 'SELECT';
    });
    _defineProperty(_assertThisInitialized(_this), "isSelect2", function () {
      return _this.element.className.includes('select2');
    });
    _defineProperty(_assertThisInitialized(_this), "isLive", function () {
      return _this.select2;
    });
    _defineProperty(_assertThisInitialized(_this), "isPreview", function () {
      return document.documentElement.hasAttribute('data-turbolinks-preview');
    });
    _defineProperty(_assertThisInitialized(_this), "isBooting", function () {
      return _this.isSelect() && !_this.isSelect2() && !_this.isPreview() && !_this.isLive();
    });
    _defineProperty(_assertThisInitialized(_this), "_teardown", function () {
      return _this.teardown();
    });
    return _this;
  }
  _createClass(_default, [{
    key: "initialize",
    value: function initialize() {
      if (!this.isBooting()) return false;
      var ajaxUrl = this.data.get('url');
      if (ajaxUrl) {
        this.config = {
          ajax: {
            url: ajaxUrl,
            method: 'POST',
            dataType: 'json',
            delay: 250,
            data: function data(params) {
              return {
                'query': params.term,
                'page': params.page
              };
            },
            // to indicate that infinite scrolling can be used
            processResults: function processResults(data) {
              return {
                results: data.results,
                pagination: {
                  more: data.has_next_page
                }
              };
            },
            cache: true
          }
        };
      }
      var pre_config = Object.assign({}, this.config);
      var config_s = this.data.get('config');
      var config = config_s ? JSON.parse(config_s) : {};
      this.config = Object.assign({}, pre_config, config);
      return this.config;
    }
  }, {
    key: "connect",
    value: function connect() {
      if (!this.isBooting()) return false;

      // Register the teardown listener and start up Select2.
      document.addEventListener('turbolinks:before-render', this._teardown);
      this.select2 = window.jQuery(this.element).select2(Object.assign({}, this.config));
      return this.config;
    }
  }, {
    key: "teardown",
    value: function teardown(event) {
      if (!this.isLive()) return false;
      document.removeEventListener('turbolinks:before-render', this._teardown);
      this.select2.destroy();
      this.select2 = undefined;
      return this.config;
    }
  }]);
  return _default;
}(_stimulus.Controller);
exports["default"] = _default;