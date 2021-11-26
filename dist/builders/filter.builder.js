"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilterBuilder = void 0;

var _builder = require("./builder");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var FilterBuilder = /*#__PURE__*/function (_Builder) {
  _inherits(FilterBuilder, _Builder);

  var _super = _createSuper(FilterBuilder);

  function FilterBuilder(driver, filters) {
    var _this;

    _classCallCheck(this, FilterBuilder);

    _this = _super.call(this, driver);
    _this.filters = filters;
    return _this;
  }

  _createClass(FilterBuilder, [{
    key: "typerize",
    value: function typerize(type) {
      if (!type) return '';

      switch (type) {
        case 'and':
          return ' AND';

        case 'or':
          return ' OR';

        default:
          throw new Error("Invalid filter type");
      }
    }
  }, {
    key: "parse",
    value: function parse() {
      var _this2 = this;

      var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      if (this.filters.length === 0) return "";
      var values = [];

      var parseFunction = function parseFunction(filter) {
        if (filter instanceof Object && !!filter.filter) {
          var type = _this2.typerize(filter.type);

          return ["".concat(type, " (")].concat(_toConsumableArray(filter.filter.map(parseFunction)), [') ']).join('');
        } else if (filter instanceof Object && !!filter.raw) {
          var _type = _this2.typerize(filter.type);

          return "".concat(_type, " ").concat(filter.raw);
        } else if (filter instanceof Object) {
          var _type2 = _this2.typerize(filter.type);

          var column = _this2.columnrize(filter.column);

          var compare = _this2.comparize(filter.compare);

          values.push(filter.value);
          return "".concat(_type2, " ").concat(column, " ").concat(compare, " $").concat(++i);
        } else {
          throw new Error("Invalid filter object type");
        }
      };

      var result = this.filters.map(parseFunction).join('');
      return {
        sql: "WHERE".concat(result),
        data: values
      };
    }
  }]);

  return FilterBuilder;
}(_builder.Builder);

exports.FilterBuilder = FilterBuilder;