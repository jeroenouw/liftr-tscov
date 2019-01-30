"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var typescript_1 = tslib_1.__importDefault(require("typescript"));
var fs = tslib_1.__importStar(require("fs"));
var path = tslib_1.__importStar(require("path"));
var glob_1 = tslib_1.__importDefault(require("glob"));
function getTsConfigFilePath(project) {
    var configFilePath;
    var dirname;
    var projectStats = fs.statSync(project);
    if (projectStats.isDirectory()) {
        configFilePath = path.resolve(project, 'tsconfig.json');
        dirname = project;
    }
    else if (projectStats.isFile()) {
        configFilePath = project;
        dirname = path.dirname(project);
    }
    else {
        throw new Error("parameter '-p' should be a file or directory.");
    }
    return { configFilePath: configFilePath, dirname: dirname };
}
exports.getTsConfigFilePath = getTsConfigFilePath;
function getTsConfig(configFilePath, dirname) {
    var configResult = typescript_1.default.readConfigFile(configFilePath, function (p) { return fs.readFileSync(p).toString(); });
    var config = configResult.error ? {
        compilerOptions: {
            lib: [
                'dom',
                'es5',
                'es2015',
                'es2016',
                'es2017'
            ],
            allowSyntheticDefaultImports: true
        }
    } : configResult.config;
    if (config.extends) {
        var project = path.resolve(dirname, config.extends);
        var _a = getTsConfigFilePath(project), configFilePath_1 = _a.configFilePath, extendsBasename = _a.dirname;
        var extendsConfig = getTsConfig(configFilePath_1, extendsBasename);
        config.compilerOptions = tslib_1.__assign({}, extendsConfig.compilerOptions, config.compilerOptions);
    }
    return config;
}
exports.getTsConfig = getTsConfig;
// tslint:disable-next-line:cognitive-complexity
function getRootNames(config, dirname) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var e_1, _a, include, exclude, rules, include_1, include_1_1, file, currentPath, stats, e_1_1, rootNames;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    include = config.include;
                    exclude = config.exclude || ['node_modules/**'];
                    if (config.files) {
                        return [2 /*return*/, config.files.map(function (f) { return path.resolve(dirname, f); })];
                    }
                    if (!(include && Array.isArray(include) && include.length > 0)) return [3 /*break*/, 9];
                    rules = [];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 6, 7, 8]);
                    include_1 = tslib_1.__values(include), include_1_1 = include_1.next();
                    _b.label = 2;
                case 2:
                    if (!!include_1_1.done) return [3 /*break*/, 5];
                    file = include_1_1.value;
                    currentPath = path.resolve(dirname, file);
                    return [4 /*yield*/, statAsync(currentPath)];
                case 3:
                    stats = _b.sent();
                    if (stats === undefined) {
                        rules.push(currentPath);
                    }
                    else if (stats.isDirectory()) {
                        rules.push((currentPath.endsWith('/') ? currentPath.substring(0, currentPath.length - 1) : currentPath) + "/**/*.{ts,tsx}");
                    }
                    else if (stats.isFile()) {
                        rules.push(currentPath);
                    }
                    _b.label = 4;
                case 4:
                    include_1_1 = include_1.next();
                    return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 8];
                case 6:
                    e_1_1 = _b.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 8];
                case 7:
                    try {
                        if (include_1_1 && !include_1_1.done && (_a = include_1.return)) _a.call(include_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/, globAsync(rules.length === 1 ? rules[0] : "{" + rules.join(',') + "}", exclude, dirname)];
                case 9: return [4 /*yield*/, globAsync("**/*.{ts,tsx}", exclude, dirname)];
                case 10:
                    rootNames = _b.sent();
                    return [2 /*return*/, rootNames.map(function (r) { return path.resolve(process.cwd(), dirname, r); })];
            }
        });
    });
}
exports.getRootNames = getRootNames;
function statAsync(file) {
    return new Promise(function (resolve, reject) {
        fs.stat(file, function (error, stats) {
            if (error) {
                resolve(undefined);
            }
            else {
                resolve(stats);
            }
        });
    });
}
function globAsync(pattern, ignore, cwd) {
    return new Promise(function (resolve, reject) {
        glob_1.default(pattern, { ignore: ignore, cwd: cwd }, function (error, matches) {
            if (error) {
                reject(error);
            }
            else {
                resolve(matches);
            }
        });
    });
}
