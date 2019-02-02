import 'reflect-metadata';
import { CheckTypes } from './check-types';
import { Options } from './options';
import { MinCoverage } from './min-coverage';
export declare class Tscov {
    private options;
    private checkTypes;
    private minCoverage;
    suppressError: boolean;
    constructor(options: Options, checkTypes: CheckTypes, minCoverage: MinCoverage);
    executeTscov(): Promise<any>;
    private showIntroLog;
    private showToolVersion;
    private showHelpLog;
    private showSpacesLog;
}
