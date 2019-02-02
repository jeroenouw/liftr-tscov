import * as fs from 'fs';
import * as util from 'util';
import * as path from 'path';
import minimist from 'minimist';

import {injectable} from 'inversify';

@injectable()
export class MinCoverage {
  public existsAsync = util.promisify(fs.exists);
  public readFileAsync = util.promisify(fs.readFile);

  constructor() {}

  public async getMinCoverage(argv: minimist.ParsedArgs): Promise<number | undefined> {
    let minCoverage: number | undefined;
    const packageJsonPath = path.resolve(process.cwd(), 'package.json')
    if ( await this.existsAsync(packageJsonPath) ) {
      const currentPackageJson: {
        typeCoverage?: {
        minCoverage?: number;
        };
      } = JSON.parse((await this.readFileAsync(packageJsonPath)).toString());
      if (currentPackageJson.typeCoverage && currentPackageJson.typeCoverage.minCoverage) {
        minCoverage = currentPackageJson.typeCoverage.minCoverage;
      }
    }
    if (argv['m'] || argv['min-coverage']) {
      minCoverage = argv['m'] || argv['min-coverage']
    }
    return minCoverage;
  };
}
