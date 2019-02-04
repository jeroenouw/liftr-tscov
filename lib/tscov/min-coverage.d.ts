/// <reference types="node" />
import * as fs from 'fs';
import minimist from 'minimist';
export declare class MinCoverage {
    existsAsync: typeof fs.stat.__promisify__;
    readFileAsync: typeof fs.readFile.__promisify__;
    constructor();
    getMinCoverage(argv: minimist.ParsedArgs): Promise<number | undefined>;
}
