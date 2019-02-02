import 'reflect-metadata';
import { JsonConfig } from './types/json-config.type';
export declare class TsConfig {
    constructor();
    getTsConfigFilePath(project: string): any;
    getTsConfig(configFilePath: string, dirname: string): JsonConfig;
    getRootNames(config: JsonConfig, dirname: string): Promise<string[]>;
    private stat;
    private glob;
}
