# TSCOV - TypeScript CLI to calculate type coverage

[![tscov](https://img.shields.io/badge/dynamic/json.svg?label=tscov&prefix=%E2%89%A5&suffix=%&query=$.typeCoverage.atLeast&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fjeroenouw%2Ftscov%2Fmaster%2Fpackage.json)](https://github.com/jeroenouw/tscov)
[![npmversion](https://img.shields.io/npm/v/tscov.svg)](https://github.com/jeroenouw/tscov)
[![npmlicense](https://img.shields.io/npm/l/tscov.svg)](https://github.com/jeroenouw/AngularMaterialFirebase/blob/master/LICENSE/)
[![downloads](https://img.shields.io/npm/dy/tscov.svg)](https://github.com/jeroenouw/tscov)

## Quick start

First globally install `tscov` by running `npm i -g tscov` in the command line.  
Go to your local project in the command line.  
Followed by `tscov` to run the coverage of the types.  

## Example output

```shell
  _____   ____     ____    ___   __     __
 |_   _| / ___|   / ___|  / _ \  \ \   / /
   | |   \___ \  | |     | | | |  \ \ / /
   | |    ___) | | |___  | |_| |   \ V /
   |_|   |____/   \____|  \___/     \_/

The TypeScript CLI to calculate type coverage


----------------- coverage ------------------
3337 - max reachable type coverage
3287 - types covered
50 - types uncovered

98.50% - coverage percentage
You can run "tscov --detail" to show all uncovered types.
```

## How to use

```shell
    // show uncovered types
    --detail
    // show debug info
    --debug
```

## Contributing

Want to file a bug, contribute some code, or improve documentation? Feel free to place an [issue](https://github.com/jeroenouw/AngularMaterialFirebase/issues).

## License

[![npmlicense](https://img.shields.io/npm/l/ngxmatfire.svg)](https://github.com/jeroenouw/AngularMaterialFirebase/blob/master/LICENSE/)

## Credits

[Plantain-00](https://github.com/plantain-00/type-coverage)