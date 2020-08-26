import minimist from 'minimist'
import * as path from 'path'
import { cyan } from 'kleur'

import { startLinter } from './check-types'
import { getMinCoverage } from './min-coverage'

import { showCommandError, showCoverageResult, showDefaultError, showFailedError, showHelpLog, showSpacesLog, showSuccess, showTitleAndBanner, showToolVersion, showUncoveredTypesIntro } from '../tscov/utils/logger.util'

export async function tscov(): Promise<any> {
  let suppressError: boolean = false

  try {
    executeTscov()
      .then(success => {
        showSpacesLog()
        if (!success && !suppressError) {
          process.exit(1)
        }
      })
      .catch((err) => console.error(err))
  } catch (error) {
    showDefaultError(error, suppressError);
  }

  // tslint:disable-next-line:cognitive-complexity no-big-function
  async function executeTscov(): Promise<void|boolean> {
    showTitleAndBanner()

    const argv = minimist(process.argv.slice(2), { '--': true })
    suppressError = argv.suppressError

    const showVersion: boolean = argv.v || argv.version
    if (showVersion) {
      return showToolVersion()
    }

    const showHelp: boolean = argv.h || argv.help
    if (showHelp) {
      return showHelpLog()
    }

    let projectInput: string = argv.p || argv.project
    const fileInput: string = argv.f || argv.file

    if (projectInput === undefined && argv._.length === 0) {
      projectInput = '.'
    }

    if (projectInput === undefined && fileInput === undefined && !showHelp && !showVersion) {
      return showCommandError();
    }

    const { correctCount, totalCount, anys } = await startLinter(projectInput, true, argv.debug, fileInput)
    const openCount: number = totalCount - correctCount
    const percentage: number = Math.round(10000 * correctCount / totalCount) / 100
    const minCoverage: number = await getMinCoverage(argv) || 90
    const failed: boolean | undefined | 0 = minCoverage && percentage < minCoverage
    const success: boolean | undefined | 0 = minCoverage && percentage > minCoverage

    if (argv.d || argv.details || failed) {
      showUncoveredTypesIntro()
      for (const { file, line, character, text } of anys) {
        console.log(`${path.resolve(process.cwd(), file)}: ` + cyan(`${line + 1}:${character + 1}`) + ` - ${text}`)
      }
    }
  
    showCoverageResult(totalCount, correctCount, openCount)

    if (success) showSuccess(percentage)
    if (failed) showFailedError(percentage, minCoverage)
    return !failed
  }
}
