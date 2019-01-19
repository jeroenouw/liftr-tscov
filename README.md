# TSCOV - TypeScript CLI to calculate your projects type coverage

[![tscov](https://img.shields.io/badge/dynamic/json.svg?label=tscov&prefix=%E2%89%A5&suffix=%&query=$.typeCoverage.atLeast&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fjeroenouw%2Ftscov%2Fmaster%2Fpackage.json)](https://github.com/jeroenouw/tscov)
[![npmversion](https://img.shields.io/npm/v/tscov.svg)](https://github.com/jeroenouw/tscov)
[![npmlicense](https://img.shields.io/npm/l/tscov.svg)](https://github.com/jeroenouw/AngularMaterialFirebase/blob/master/LICENSE/)
[![downloads](https://img.shields.io/npm/dy/tscov.svg)](https://github.com/jeroenouw/tscov)

## Quick start

### Globally

First globally install `tscov` by running `npm i -g tscov` in the command line.  
Go to your local project in the command line.  
Followed by `tscov` to run the coverage of the types.  

### Project

Go to your local project in the command line.  
Then install `tscov` as devDependency by running `npm i tscov --save-dev` in the command line.  
And setup by adding an extra npm script in your `package.json` like this:

```json
"scripts": {
    "tscov": "tscov --at-least=NUMBER"
},
```

## How to use

You can use the following commands in the command line or in a project as npm script.  

`tscov` - show max reachable coverage and covered/uncovered types  
`tscov --at-least=NUMBER` - define your minimum wanted coverage by replacing `NUMBER` with `95` for example  
`tscov --detail` - show uncovered types  
`tscov --debug` - show debug info  

## Example output

Example by running this command: `tscov --at-least=95`.

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

## Contributing

Want to file a bug, contribute some code, or improve documentation? Feel free to place an [issue](https://github.com/jeroenouw/tscov/issues).  

First fork this project.  

```shell
git clone <your-forked-repo>
npm install

git checkout -b my-fix
# fix some code...

git commit -m "added this feature"
git push origin my-fix
```

Lastly, open a pull request on Github.

The following npm script are available

- `npm start` - watch files
- `npm run create` - create build, install globally and run tscov
- `npm run build` - create build
- `npm test` - install globally and run tscov
- `npm run link-upstream` - add remote
- `npm run sync` - fetch, checkout, merge and push
- `npm run reset` - removes node modules, package-lock.json, lib and re-installs everything.

## License

[![npmlicense](https://img.shields.io/npm/l/tscov.svg)](https://github.com/jeroenouw/tscov/blob/master/LICENSE/)

## Credits

[Plantain-00](https://github.com/plantain-00/type-coverage)