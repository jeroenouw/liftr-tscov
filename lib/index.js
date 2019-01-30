"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var minimist_1 = tslib_1.__importDefault(require("minimist"));
var fs = tslib_1.__importStar(require("fs"));
var util = tslib_1.__importStar(require("util"));
var path = tslib_1.__importStar(require("path"));
var kleur_1 = require("kleur");
var figlet = require('figlet');
var program = require('commander');
var packageJson = tslib_1.__importStar(require("../package.json"));
var core_1 = require("./core");
var suppressError = false;
var existsAsync = util.promisify(fs.exists);
var readFileAsync = util.promisify(fs.readFile);
program
    .version(showToolVersion())
    .description(kleur_1.cyan('TypeScript CLI to calculate type coverage'))
    .option('-m NUMBER, --min-coverage NUMBER', 'define your minimum wanted coverage % by replacing NUMBER (0-100) with 95 for example')
    .option('-p FOLDERNAME', 'Test folder')
    .option('-p FOLDERNAME -f, --file FILENAME', 'Test specific file')
    .option('-d, --details', 'Show uncovered types')
    .option('--debug', 'Show debug info');
function showToolVersion() {
    console.log("Version: " + packageJson.version);
}
function showHelpLog() {
    program.outputHelp();
}
function showIntroLog() {
    console.log(figlet.textSync('TSCOV', { horizontalLayout: 'full' }));
    console.log(kleur_1.cyan("The TypeScript CLI to calculate type coverage"));
}
function endConsoleLogs() {
    console.log('');
    console.log('');
    console.log('');
}
// tslint:disable-next-line:cognitive-complexity no-big-function
function executeCommandLine() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var e_1, _a, argv, showVersion, showHelp, _b, correctCount, totalCount, anys, openCount, percent, minCoverage, failed, success, anys_1, anys_1_1, _c, file, line, character, text;
        return tslib_1.__generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    showIntroLog();
                    argv = minimist_1.default(process.argv.slice(2), { '--': true });
                    showVersion = argv.v || argv.version;
                    if (showVersion) {
                        showToolVersion();
                        return [2 /*return*/];
                    }
                    showHelp = argv.h || argv.help;
                    if (showHelp) {
                        showHelpLog();
                        return [2 /*return*/];
                    }
                    suppressError = argv.suppressError;
                    return [4 /*yield*/, core_1.lint(argv.p || argv.project || '.', true, argv.debug, argv.f || argv.file)];
                case 1:
                    _b = _d.sent(), correctCount = _b.correctCount, totalCount = _b.totalCount, anys = _b.anys;
                    openCount = totalCount - correctCount;
                    percent = Math.round(10000 * correctCount / totalCount) / 100;
                    return [4 /*yield*/, getMinCoverage(argv)];
                case 2:
                    minCoverage = _d.sent();
                    failed = minCoverage && percent < minCoverage;
                    success = minCoverage && percent > minCoverage;
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
                        console.log(kleur_1.green(percent.toFixed(2) + "%") + " - coverage percentage" + kleur_1.white("\nYou can run " + kleur_1.cyan('"tscov --details"') + " to show all uncovered types."));
                    }
                    if (failed) {
                        console.log((kleur_1.red(percent.toFixed(2) + "%") + kleur_1.white(" - the type coverage rate is lower than your target: ") + kleur_1.cyan(minCoverage + "%.")));
                    }
                    ;
                    return [2 /*return*/];
            }
        });
    });
}
;
function getMinCoverage(argv) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var minCoverage, packageJsonPath, currentPackageJson, _a, _b;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    packageJsonPath = path.resolve(process.cwd(), 'package.json');
                    return [4 /*yield*/, existsAsync(packageJsonPath)];
                case 1:
                    if (!_c.sent()) return [3 /*break*/, 3];
                    _b = (_a = JSON).parse;
                    return [4 /*yield*/, readFileAsync(packageJsonPath)];
                case 2:
                    currentPackageJson = _b.apply(_a, [(_c.sent()).toString()]);
                    if (currentPackageJson.typeCoverage && currentPackageJson.typeCoverage.minCoverage) {
                        minCoverage = currentPackageJson.typeCoverage.minCoverage;
                    }
                    _c.label = 3;
                case 3:
                    if (argv['m'] || argv['min-coverage']) {
                        minCoverage = argv['m'] || argv['min-coverage'];
                    }
                    return [2 /*return*/, minCoverage];
            }
        });
    });
}
;
executeCommandLine().then(function () {
    endConsoleLogs();
}, function (error) {
    if (error instanceof Error) {
        console.log(kleur_1.red(error.message));
    }
    else {
        console.log(kleur_1.red(error));
    }
    if (!suppressError) {
        process.exit(1);
    }
});
