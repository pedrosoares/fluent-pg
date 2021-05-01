"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.configure = void 0;

var _postgres_driver = require("./postgres_driver");

var configure = function configure(fluent_configurator) {
  fluent_configurator.register_driver("pgsql", new _postgres_driver.PostgresDriver(fluent_configurator));
};

exports.configure = configure;
var _default = configure;
exports["default"] = _default;