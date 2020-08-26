import * as fs from 'fs'
import * as util from 'util'
import * as path from 'path'
import minimist from 'minimist'

export async function getMinCoverage(argv: minimist.ParsedArgs): Promise<number | undefined>  {
  let existsAsync = util.promisify(fs.stat)
  let readFileAsync = util.promisify(fs.readFile)

  let minCoverage: number | undefined

  const packageJsonPath = path.resolve(process.cwd(), 'package.json')
  if (await existsAsync(packageJsonPath)) {
    const currentPackageJson: {
      typeCoverage?: {
        minCoverage?: number;
      };
    } = JSON.parse((await readFileAsync(packageJsonPath)).toString())
    if (currentPackageJson.typeCoverage && currentPackageJson.typeCoverage.minCoverage) {
      minCoverage = currentPackageJson.typeCoverage.minCoverage
    }
  }
  if (argv['m'] || argv['min-coverage']) {
    minCoverage = argv['m'] || argv['min-coverage']
  }

  return minCoverage
}
