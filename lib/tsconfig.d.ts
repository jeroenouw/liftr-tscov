export declare function getTsConfigFilePath(project: string): any;
declare type JsonConfig = {
    extends?: string;
    compilerOptions?: {
        [name: string]: any;
    };
    include?: string[];
    exclude?: string[];
    files?: string[];
};
export declare function getTsConfig(configFilePath: string, dirname: string): JsonConfig;
export declare function getRootNames(config: JsonConfig, dirname: string): Promise<string[]>;
export {};
