"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Builder = void 0;

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
      var DEFAULT_SCHEMA = this.driver.configurator.default_schema || process.env.DEFAULT_SCHEMA;
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