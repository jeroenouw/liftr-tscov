"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var packageJson = tslib_1.__importStar(require("../../package.json"));
var kleur_1 = require("kleur");
var inversify_1 = require("inversify");
var program = require('commander');
var Options = /** @class */ (function () {
    function Options() {
    }
    Options.prototype.showOptions = function () {
        return program
            .version(packageJson.version)
            .description(kleur_1.cyan('TypeScript CLI to calculate type coverage'))
            .option('-m NUMBER, --min-coverage NUMBER', 'define your minimum wanted coverage % by replacing NUMBER (0-100) with 95 for example')
            .option('-p FOLDERNAME, --project FOLDERNAME', 'Test folder')
            .option('-p FOLDERNAME -f FILENAME, --project FOLDERNAME --file FILENAME', 'Test specific file')
            .option('-d, --details', 'Show uncovered types')
            .option('--debug', 'Show debug info')
            .outputHelp();
    };
    Options = tslib_1.__decorate([
        inversify_1.injectable(),
        tslib_1.__metadata("design:paramtypes", [])
    ], Options);
    return Options;
}());
exports.Options = Options;
