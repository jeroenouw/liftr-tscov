import * as packageJson from '../../package.json'
import { cyan } from 'kleur'
import { injectable } from 'inversify'

const program = require('commander')

@injectable()
export class Options {

  constructor() {}

  public showOptions(): void {
    return program
      .version(packageJson.version)
      .description(cyan('TypeScript CLI to calculate type coverage'))
      .option('-m NUMBER, --min-coverage NUMBER', 'define your minimum wanted coverage % by replacing NUMBER (0-100) with 95 for example')
      .option('-p FOLDERNAME, --project FOLDERNAME', 'Test folder')
      .option('-p FOLDERNAME -f FILENAME, --project FOLDERNAME --file FILENAME', 'Test specific file')
      .option('-d, --details', 'Show uncovered types')
      .option('--debug', 'Show debug info')
      .outputHelp()
  }
}
