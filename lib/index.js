"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var ts_config_1 = require("./tscov/ts-config");
var tscov_1 = require("./tscov/tscov");
var options_1 = require("./tscov/options");
var check_types_1 = require("./tscov/check-types");
var min_coverage_1 = require("./tscov/min-coverage");
function index() {
    var container = new inversify_1.Container();
    container.bind('TsConfig').to(ts_config_1.TsConfig).inSingletonScope();
    container.bind('Tscov').to(tscov_1.Tscov).inSingletonScope();
    container.bind('Options').to(options_1.Options).inSingletonScope();
    container.bind('CheckTypes').to(check_types_1.CheckTypes).inSingletonScope();
    container.bind('MinCoverage').to(min_coverage_1.MinCoverage).inSingletonScope();
    return container.get('Tscov');
}
exports.index = index;
index();
