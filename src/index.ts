import minimist from 'minimist'
import * as fs from 'fs'
import * as util from 'util'
import * as path from 'path'
import {red, green, cyan, white} from 'kleur';

const figlet = require('figlet');

import * as packageJson from '../package.json'
import { lint } from './core'

let suppressError: boolean = false;
const existsAsync = util.promisify(fs.exists);
const readFileAsync = util.promisify(fs.readFile);

function showToolVersion(): void {
  console.log(`Version: ${packageJson.version}`)
}

function endConsoleLogs(): void {
  console.log('');
  console.log('');
  console.log('');
}

// tslint:disable-next-line:cognitive-complexity no-big-function
async function executeCommandLine(): Promise<any> {
  console.log(cyan(figlet.textSync('TSCOV', {horizontalLayout: 'full'})));
  console.log(cyan(`The TypeScript CLI to calculate type coverage`));

  const argv = minimist(process.argv.slice(2), { '--': true });

  const showVersion: boolean = argv.v || argv.version;
  if (showVersion) {
    showToolVersion();
    return;
  }

  suppressError = argv.suppressError;

  const { correctCount, totalCount, anys } = await lint(argv.p || argv.project || '.', true, argv.debug);
  const openCount = totalCount - correctCount;
  const percent = Math.round(10000 * correctCount / totalCount) / 100;
  const atLeast = await getAtLeast(argv);
  const failed = atLeast && percent < atLeast;
  const success = atLeast && percent > atLeast;
  if (argv.detail || failed) {
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
    console.log(green(`${percent.toFixed(2)}%`) + ` - coverage percentage` +  white(`\nYou can run ` + cyan('"tscov --detail"') + ` to show all uncovered types.`));
  }
  if (failed) {
    console.log((red(`${percent.toFixed(2)}%`) + white(` - the type coverage rate is lower than your target: `) + cyan(`${atLeast}%.`)));
  };
};

async function getAtLeast(argv: minimist.ParsedArgs): Promise<number | undefined> {
  let atLeast: number | undefined;
  const packageJsonPath = path.resolve(process.cwd(), 'package.json')
  if (await existsAsync(packageJsonPath)) {
    const currentPackageJson: {
      typeCoverage?: {
        atLeast?: number;
      };
    } = JSON.parse((await readFileAsync(packageJsonPath)).toString());
    if (currentPackageJson.typeCoverage && currentPackageJson.typeCoverage.atLeast) {
      atLeast = currentPackageJson.typeCoverage.atLeast;
    }
  }
  if (argv['at-least']) {
    atLeast = argv['at-least'];
  }
  return atLeast;
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
