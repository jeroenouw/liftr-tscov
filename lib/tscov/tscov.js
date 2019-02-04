"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
require("reflect-metadata");
var minimist_1 = tslib_1.__importDefault(require("minimist"));
var path = tslib_1.__importStar(require("path"));
var packageJson = tslib_1.__importStar(require("../../package.json"));
var kleur_1 = require("kleur");
var inversify_1 = require("inversify");
var check_types_1 = require("./check-types");
var options_1 = require("./options");
var min_coverage_1 = require("./min-coverage");
var figlet = require('figlet');
var Tscov = /** @class */ (function () {
    function Tscov(options, checkTypes, minCoverage) {
        var _this = this;
        this.options = options;
        this.checkTypes = checkTypes;
        this.minCoverage = minCoverage;
        this.suppressError = false;
        try {
            this.executeTscov()
                .then(function () { return _this.showSpacesLog(); })
                .catch(function (err) { return console.error(err); });
        }
        catch (error) {
            if (error instanceof Error) {
                console.log(kleur_1.red(error.message));
            }
            else {
                console.log(kleur_1.red(error));
            }
            if (!this.suppressError) {
                process.exit(1);
            }
        }
    }
    // tslint:disable-next-line:cognitive-complexity no-big-function
    Tscov.prototype.executeTscov = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var e_1, _a, argv, showVersion, showHelp, _b, correctCount, totalCount, anys, openCount, percentage, minCoverage, failed, success, anys_1, anys_1_1, _c, file, line, character, text;
            return tslib_1.__generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        this.showIntroLog();
                        argv = minimist_1.default(process.argv.slice(2), { '--': true });
                        this.suppressError = argv.suppressError;
                        showVersion = argv.v || argv.version;
                        if (showVersion) {
                            this.showToolVersion();
                            return [2 /*return*/];
                        }
                        showHelp = argv.h || argv.help;
                        if (showHelp) {
                            this.showHelpLog();
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.checkTypes.startLinter(argv.p || argv.project || '.', true, argv.debug, argv.f || argv.file)];
                    case 1:
                        _b = _d.sent(), correctCount = _b.correctCount, totalCount = _b.totalCount, anys = _b.anys;
                        openCount = totalCount - correctCount;
                        percentage = Math.round(10000 * correctCount / totalCount) / 100;
                        return [4 /*yield*/, this.minCoverage.getMinCoverage(argv)];
                    case 2:
                        minCoverage = _d.sent();
                        failed = minCoverage && percentage < minCoverage;
                        success = minCoverage && percentage > minCoverage;
                        if (argv.d || argv.details || failed) {
                            console.log('');
                            console.log('------------- uncovered types ---------------');
                            try {
                                for (anys_1 = tslib_1.__values(anys), anys_1_1 = anys_1.next(); !anys_1_1.done; anys_1_1 = anys_1.next()) {
                                    _c = anys_1_1.value, file = _c.file, line = _c.line, character = _c.character, text = _c.text;
                                    console.log(path.resolve(process.cwd(), file) + ": " + kleur_1.cyan(line + 1 + ":" + (character + 1)) + (" - " + text));
                                }
                            }
                            catch (e_1_1) { e_1 = { error: e_1_1 }; }
                            finally {
                                try {
                                    if (anys_1_1 && !anys_1_1.done && (_a = anys_1.return)) _a.call(anys_1);
                                }
                                finally { if (e_1) throw e_1.error; }
                            }
                        }
                        console.log('');
                        console.log('');
                        console.log('----------------- coverage ------------------');
                        console.log(kleur_1.cyan("" + totalCount) + " - max reachable type coverage");
                        console.log(kleur_1.cyan("" + correctCount) + " - types covered");
                        console.log(kleur_1.cyan("" + openCount) + " - types uncovered");
                        console.log('');
                        if (success) {
                            console.log(kleur_1.green(percentage.toFixed(2) + "%") + " - coverage percentage" + kleur_1.white("\nYou can run " + kleur_1.cyan('"tscov --details"') + " to show all uncovered types."));
                        }
                        if (failed) {
                            console.log((kleur_1.red(percentage.toFixed(2) + "%") + kleur_1.white(" - the type coverage rate is lower than your target: ") + kleur_1.cyan(minCoverage + "%.")));
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Tscov.prototype.showIntroLog = function () {
        console.log(figlet.textSync('TSCOV', { horizontalLayout: 'full' }));
        console.log(kleur_1.cyan("The TypeScript CLI to calculate type coverage"));
    };
    Tscov.prototype.showToolVersion = function () {
        console.log("Version: " + packageJson.version);
    };
    Tscov.prototype.showHelpLog = function () {
        this.options.showOptions();
    };
    Tscov.prototype.showSpacesLog = function () {
        console.log('');
        console.log('');
        console.log('');
    };
    Tscov = tslib_1.__decorate([
        inversify_1.injectable(),
        tslib_1.__param(0, inversify_1.inject('Options')),
        tslib_1.__param(1, inversify_1.inject('CheckTypes')),
        tslib_1.__param(2, inversify_1.inject('MinCoverage')),
        tslib_1.__metadata("design:paramtypes", [options_1.Options,
            check_types_1.CheckTypes,
            min_coverage_1.MinCoverage])
    ], Tscov);
    return Tscov;
}());
exports.Tscov = Tscov;
