"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateBuilder = void 0;

var _builder = require("./builder");

var _filter = require("./filter.builder");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var UpdateBuilder = /*#__PURE__*/function (_Builder) {
  _inherits(UpdateBuilder, _Builder);

  var _super = _createSuper(UpdateBuilder);

  function UpdateBuilder(driver, table, columns, filters, limit, order) {
    var _this;

    _classCallCheck(this, UpdateBuilder);

    _this = _super.call(this, driver);
    _this.driver = driver;
    _this.table = table;
    _this.columns = columns;
    _this.filters = filters;
    _this.limit = limit || {};
    _this.order = order || {};
    return _this;
  }

  _createClass(UpdateBuilder, [{
    key: "parse",
    value: function parse() {
      var whereBuilder = new _filter.FilterBuilder(this.driver, this.filters);
      var columns = Object.keys(this.columns);
      var values = Object.values(this.columns);
      var data = columns.map(function (col, index) {
        return "".concat(col, " = $").concat(index + 1);
      }).join(', ');
      var whereBuilt = whereBuilder.parse(columns.length);
      this.parseLimit(); // Validate if there is no Limit at Update

      return {
        sql: "UPDATE ".concat(this.tablerize(this.table), " SET ").concat(data, " ").concat(whereBuilt.sql, " ").concat(this.parseOrder()).trim(),
        data: values.concat(whereBuilt.data)
      };
    }
  }, {
    key: "parseLimit",
    value: function parseLimit() {
      if (!!this.limit.skip) {
        throw new Error("Postgres does not support Skip at Update Query");
      }

      if (!!this.limit.take) {
        throw new Error("Postgres does not support Take at Update Query");
      }
    }
  }, {
    key: "parseOrder",
    value: function parseOrder() {
      if (!!this.order.column && !!this.order.direction) {
        throw new Error("Postgres does not support Order By at Update Query");
      }

      return "";
    }
  }]);

  return UpdateBuilder;
}(_builder.Builder);

exports.UpdateBuilder = UpdateBuilder;