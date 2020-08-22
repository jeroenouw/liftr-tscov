# TSCOV - Check the type coverage of any TypeScript project with this easy npm package

The Liftr framework provides a structure and tools to build API's with TypeScript and express. This repo/package is for the coverage of types in TypeScript.

[![tscov](https://img.shields.io/badge/dynamic/json.svg?label=tscov&prefix=%E2%89%A5&suffix=%&query=$.typeCoverage.minCoverage&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fjeroenouw%2Fliftr-tscov%2Fmaster%2Fpackage.json)](https://github.com/jeroenouw/liftr-tscov)
[![npmversion](https://img.shields.io/npm/v/@liftr/tscov.svg)](https://github.com/jeroenouw/liftr-tscov)
[![npmlicense](https://img.shields.io/npm/l/@liftr/tscov.svg)](https://github.com/jeroenouw/liftr-tscov/blob/master/LICENSE/)
[![downloads](https://img.shields.io/npm/dy/@liftr/tscov.svg)](https://github.com/jeroenouw/liftr-tscov)

## Quick start

### Globally

First globally install `@liftr/tscov` by running the following in the command line. 

```shell
npm i @liftr/tscov -g

cd <your-repo-location>

# To run the coverage of the types.
tscov
```

### Project

Go to your local project in the command line.  
Then install `@liftr/tscov` as devDependency by running:

```shell
npm i @liftr/tscov --save-dev
```

And set tscov up by adding an extra npm script in your `package.json` like this:

```json
"scripts": {
    "tscov": "tscov -m <number>"
},
```

Then you could run this with:

```shell
npm run tscov
```

## How to use

You can use the following commands in the command line or in a project as npm script:

```shell
# Show max reachable coverage and covered/uncovered types (default 90% minimal coverage)
tscov

# Define your minimum wanted coverage % by replacing `<number>` (0-100) with `95` for example 
tscov -m <number>
tscov --min-coverage <number>

# Show all uncovered types  
tscov -d
tscov --details

# Test specific folder
tscov -p <path-to-folder/foldername>
tscov --project <path-to-folder/foldername>

# Testing specific files
tscov -p <path-to-folder/foldername> -f <filename>.ts
tscov --project <path-to-folder/foldername> --file <filename>.ts

# Start debugging
tscov --debug

# Show version
tscov -v
tscov --version

# Show all available options
tscov -h
tscov --help
```

## Example output

Example by running this command: `tscov --min-coverage=95`.

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
You can run "tscov --details" to show all uncovered types.
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

- `npm start` - create build, install globally and run tscov
- `npm run build` - create build
- `npm run global` - install globally and run tscov
- `npm run link-upstream` - add remote
- `npm run sync` - fetch, checkout, merge and push
- `npm run reset` - removes node modules, package-lock.json, lib and re-installs everything.
