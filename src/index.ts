import minimist from 'minimist';
import * as fs from 'fs';
import * as util from 'util';
import * as path from 'path';
import {red, green, cyan, white} from 'kleur';

const figlet = require('figlet');
const program = require('commander');

import * as packageJson from '../package.json';
import { lint } from './core';

let suppressError: boolean = false;
const existsAsync = util.promisify(fs.exists);
const readFileAsync = util.promisify(fs.readFile);

program
	.version(showToolVersion())
  .description(cyan('TypeScript CLI to calculate type coverage'))
  .option('-m NUMBER, --min-coverage NUMBER', 'define your minimum wanted coverage % by replacing NUMBER (0-100) with 95 for example')
  .option('-p FOLDERNAME', 'Test folder')
  .option('-p FOLDERNAME -f, --file FILENAME', 'Test specific file')
  .option('-d, --details', 'Show uncovered types')
  .option('--debug', 'Show debug info')

function showToolVersion(): void {
  console.log(`Version: ${packageJson.version}`)
}

function showHelpLog(): void {
  program.outputHelp();
}

function showIntroLog(): void {
  console.log(figlet.textSync('TSCOV', {horizontalLayout: 'full'}));
  console.log(cyan(`The TypeScript CLI to calculate type coverage`));
}

function endConsoleLogs(): void {
  console.log('');
  console.log('');
  console.log('');
}

// tslint:disable-next-line:cognitive-complexity no-big-function
async function executeCommandLine(): Promise<any> {
  showIntroLog();

  const argv = minimist(process.argv.slice(2), { '--': true });

  const showVersion: boolean = argv.v || argv.version;
  if (showVersion) {
    showToolVersion();
    return;
  } 
  
  const showHelp: boolean = argv.h || argv.help;
  if (showHelp) {
    showHelpLog();
    return;
  }

  suppressError = argv.suppressError;

  const { correctCount, totalCount, anys } = await lint(argv.p || argv.project || '.', true, argv.debug, argv.f || argv.file);
  const openCount = totalCount - correctCount;
  const percent = Math.round(10000 * correctCount / totalCount) / 100;
  const minCoverage = await getMinCoverage(argv);
  const failed = minCoverage && percent < minCoverage;
  const success = minCoverage && percent > minCoverage;
  if (argv.d || argv.details || failed) {
    console.log('');
    console.log('------------- uncovered types ---------------');
    for (const { file, line, character, text } of anys) {
      console.log(`${path.resolve(process.cwd(), file)}: ` + cyan(`${line + 1}:${character + 1}`) + ` - ${text}`);
    }
  }
  console.log('');
  console.log('');
  console.log('----------------- coverage ------------------');
  console.log(cyan(`${totalCount}`) + ` - max reachable type coverage`);
  console.log(cyan(`${correctCount}`) + ` - types covered`);
  console.log(cyan(`${openCount}`) + ` - types uncovered`);
  console.log('');
  if (success) {
    console.log(green(`${percent.toFixed(2)}%`) + ` - coverage percentage` +  white(`\nYou can run ` + cyan('"tscov --details"') + ` to show all uncovered types.`));
  }
  if (failed) {
    console.log((red(`${percent.toFixed(2)}%`) + white(` - the type coverage rate is lower than your target: `) + cyan(`${minCoverage}%.`)));
  };
};

async function getMinCoverage(argv: minimist.ParsedArgs): Promise<number | undefined> {
  let minCoverage: number | undefined;
  const packageJsonPath = path.resolve(process.cwd(), 'package.json')
  if (await existsAsync(packageJsonPath)) {
    const currentPackageJson: {
      typeCoverage?: {
        minCoverage?: number;
      };
    } = JSON.parse((await readFileAsync(packageJsonPath)).toString());
    if (currentPackageJson.typeCoverage && currentPackageJson.typeCoverage.minCoverage) {
      minCoverage = currentPackageJson.typeCoverage.minCoverage;
    }
  }
  if (argv['m'] || argv['min-coverage']) {
    minCoverage = argv['m'] || argv['min-coverage']
  }
  return minCoverage;
};

executeCommandLine().then(() => {
  endConsoleLogs();
}, error => {
  if (error instanceof Error) {
    console.log(red(error.message));
  } else {
    console.log(red(error));
  }
  if (!suppressError) {
    process.exit(1);
  }
});
