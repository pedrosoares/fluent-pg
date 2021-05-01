"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteBuilder = void 0;

var _filter = require("./filter.builder");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DeleteBuilder = /*#__PURE__*/function () {
  function DeleteBuilder(table, filters) {
    _classCallCheck(this, DeleteBuilder);

    this.table = table;
    this.filters = filters;
  }

  _createClass(DeleteBuilder, [{
    key: "tablerize",
    value: function tablerize(column) {
      return "\"".concat(column, "\"");
    }
  }, {
    key: "parse",
    value: function parse() {
      var whereBuilder = new _filter.FilterBuilder(this.filters);
      var whereBuilt = whereBuilder.parse();
      return {
        sql: "DELETE FROM ".concat(this.tablerize(this.table), " ").concat(whereBuilt.sql).trim(),
        data: whereBuilt.data
      };
    }
  }]);

  return DeleteBuilder;
}();

exports.DeleteBuilder = DeleteBuilder;