import { cyan, red, white, green } from 'kleur'

const figlet = require('figlet')
const program = require('commander')

import * as packageJson from '../../../package.json'

const newLine = '\n'

export const showTitleAndBanner = (): void => {
  console.log(figlet.textSync('TSCOV', { horizontalLayout: 'full' }))
  console.log(cyan(`The TypeScript CLI to calculate type coverage`))
  console.log(white(`Busy calculating...`))
}

export const showToolVersion = (): void => {
  console.log(`Version: ${packageJson.version}`)
}

export const showHelpLog = (): void => {
  return program
    .version(packageJson.version)
    .description(cyan('TypeScript CLI to calculate type coverage'))
    .option('-m number, --min-coverage number', 'define your minimum wanted coverage % by replacing number (0-100) with 95 for example')
    .option('-p <foldername>, --project <foldername>', 'Test folder')
    .option('-p <foldername> -f <filename>, --project <foldername> --file <filename>', 'Test specific file')
    .option('-d, --details', 'Show uncovered types')
    .option('--debug', 'Show debug info')
    .outputHelp()
}

export const showSpacesLog = (): void => {
  console.log(newLine)
  console.log(newLine)
  console.log(newLine)
}

export const showDefaultError = (error: Error, suppressError: boolean): void => {
  if (error instanceof Error) {
    console.log(red(error.message))
  } else {
    console.log(red(error))
  }
  if (!suppressError) {
    process.exit(1)
  }
}

export const showCommandError = (): void => {
  console.error(red('Unknown command, run tscov -h or tscov --help for a list of commands.'))
}

export const showSuccess = (percentage: number): void => {
  console.log(green(`${percentage.toFixed(2)}%`) + ` - coverage percentage` + white(`\nYou can run ` + cyan('"tscov --details"') + ` to show all uncovered types.`))
}

export const showFailedError = (percentage: number, minCoverage: number | undefined): void => {
  console.log((red(`${percentage.toFixed(2)}%`) + white(` - the type coverage rate is lower than your target: `) + cyan(`${minCoverage}%.`)))
}

export const showCoverageResult = (totalCount: number, correctCount: number, openCount: number) => {
  console.log(newLine)
  console.log(newLine)
  console.log('----------------- coverage ------------------')
  console.log(cyan(`${totalCount}`) + ` - max reachable type coverage`)
  console.log(cyan(`${correctCount}`) + ` - types covered`)
  console.log(cyan(`${openCount}`) + ` - types uncovered`)
  console.log(newLine)
}

export const showUncoveredTypesIntro = (): void => {
  console.log('')
  console.log('------------- uncovered types ---------------')
}
