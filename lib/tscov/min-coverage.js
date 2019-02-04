"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var fs = tslib_1.__importStar(require("fs"));
var util = tslib_1.__importStar(require("util"));
var path = tslib_1.__importStar(require("path"));
var inversify_1 = require("inversify");
var MinCoverage = /** @class */ (function () {
    function MinCoverage() {
        this.existsAsync = util.promisify(fs.stat);
        this.readFileAsync = util.promisify(fs.readFile);
    }
    MinCoverage.prototype.getMinCoverage = function (argv) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var minCoverage, packageJsonPath, currentPackageJson, _a, _b;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        packageJsonPath = path.resolve(process.cwd(), 'package.json');
                        return [4 /*yield*/, this.existsAsync(packageJsonPath)];
                    case 1:
                        if (!_c.sent()) return [3 /*break*/, 3];
                        _b = (_a = JSON).parse;
                        return [4 /*yield*/, this.readFileAsync(packageJsonPath)];
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
    };
    MinCoverage = tslib_1.__decorate([
        inversify_1.injectable(),
        tslib_1.__metadata("design:paramtypes", [])
    ], MinCoverage);
    return MinCoverage;
}());
exports.MinCoverage = MinCoverage;
