import 'reflect-metadata';
import ts from 'typescript';
import { TsConfig } from './ts-config';
export declare class CheckTypes {
    private tsConfig;
    constructor(tsConfig: TsConfig);
    startLinter(project: string, detail: boolean, debug: boolean, files?: any, oldProgram?: ts.Program): Promise<any>;
}
