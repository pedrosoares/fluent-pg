"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Builder = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Builder = /*#__PURE__*/function () {
  function Builder(driver) {
    _classCallCheck(this, Builder);

    this.driver = driver || {
      configurator: {}
    };
  }

  _createClass(Builder, [{
    key: "tablerize",
    value: function tablerize(column) {
      var options_ = _objectSpread({}, this.driver.configurator.get_connection_configuration(this.driver.connection_name || this.driver.configurator.default_connection));

      var DEFAULT_SCHEMA = options_.default_schema || process.env.DEFAULT_SCHEMA;
      var clm = column // Split Schema from Table
      .split(".") // Remove Empty
      .filter(function (f) {
        return !!f;
      });

      if (clm.length === 1 && DEFAULT_SCHEMA) {
        return "\"".concat(DEFAULT_SCHEMA, "\".\"").concat(clm.pop(), "\"");
      }

      return clm // Add quotes from database
      .map(function (f) {
        return "\"".concat(f, "\"");
      }) // Re-Join Schema/Table
      .join(".");
    }
  }, {
    key: "columnrize",
    value: function columnrize(column) {
      return "\"".concat(column, "\"");
    }
  }, {
    key: "comparize",
    value: function comparize(compare) {
      //TODO validate all comparation types
      return compare;
    }
  }]);

  return Builder;
}();

exports.Builder = Builder;