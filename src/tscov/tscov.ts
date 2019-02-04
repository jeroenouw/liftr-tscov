import 'reflect-metadata'
import minimist from 'minimist'
import * as path from 'path'
import * as packageJson from '../../package.json'
import { red, green, cyan, white } from 'kleur'

import { inject, injectable } from 'inversify'
import { CheckTypes } from './check-types'
import { Options } from './options'
import { MinCoverage } from './min-coverage'

const figlet = require('figlet')

@injectable()
export class Tscov {
  public suppressError: boolean = false

  constructor(
    @inject('Options') private options: Options,
    @inject('CheckTypes') private checkTypes: CheckTypes,
    @inject('MinCoverage') private minCoverage: MinCoverage
  ) {
    try {
      this.executeTscov()
        .then(() => this.showSpacesLog())
        .catch((err) => console.error(err))
    } catch (error) {
      if (error instanceof Error) {
        console.log(red(error.message))
      } else {
        console.log(red(error))
      }
      if (!this.suppressError) {
        process.exit(1)
      }
    }
  }

  // tslint:disable-next-line:cognitive-complexity no-big-function
  public async executeTscov(): Promise<any> {
    this.showIntroLog()

    const argv = minimist(process.argv.slice(2), { '--': true })
    this.suppressError = argv.suppressError

    const showVersion: boolean = argv.v || argv.version
    if (showVersion) {
      this.showToolVersion()
      return
    }

    const showHelp: boolean = argv.h || argv.help
    if (showHelp) {
      this.showHelpLog()
      return
    }

    let projectInput: string = argv.p || argv.project
    const fileInput: string = argv.f || argv.file

    if (projectInput === undefined && argv._.length === 0) {
      projectInput = '.'
    }

    if (projectInput === undefined && fileInput === undefined && !showHelp && !showVersion) {
      console.error(red('Unknown command, run tscov -h or tscov --help for a list of commands.'))
      return
    }

    const { correctCount, totalCount, anys } = await this.checkTypes.startLinter(projectInput, true, argv.debug, fileInput)
    const openCount: number = totalCount - correctCount
    const percentage: number = Math.round(10000 * correctCount / totalCount) / 100
    const minCoverage: number | undefined = await this.minCoverage.getMinCoverage(argv)
    const failed: boolean | undefined | 0 = minCoverage && percentage < minCoverage
    const success: boolean | undefined | 0 = minCoverage && percentage > minCoverage

    if (argv.d || argv.details || failed) {
      console.log('')
      console.log('------------- uncovered types ---------------')
      for (const { file, line, character, text } of anys) {
        console.log(`${path.resolve(process.cwd(), file)}: ` + cyan(`${line + 1}:${character + 1}`) + ` - ${text}`)
      }
    }
    console.log('')
    console.log('')
    console.log('----------------- coverage ------------------')
    console.log(cyan(`${totalCount}`) + ` - max reachable type coverage`)
    console.log(cyan(`${correctCount}`) + ` - types covered`)
    console.log(cyan(`${openCount}`) + ` - types uncovered`)
    console.log('')
    if (success) {
      console.log(green(`${percentage.toFixed(2)}%`) + ` - coverage percentage` + white(`\nYou can run ` + cyan('"tscov --details"') + ` to show all uncovered types.`))
    }
    if (failed) {
      console.log((red(`${percentage.toFixed(2)}%`) + white(` - the type coverage rate is lower than your target: `) + cyan(`${minCoverage}%.`)))
    }
  }

  private showIntroLog(): void {
    console.log(figlet.textSync('TSCOV', { horizontalLayout: 'full' }))
    console.log(cyan(`The TypeScript CLI to calculate type coverage`))
  }

  private showToolVersion(): void {
    console.log(`Version: ${packageJson.version}`)
  }

  private showHelpLog(): void {
    this.options.showOptions()
  }

  private showSpacesLog(): void {
    console.log('')
    console.log('')
    console.log('')
  }
}
