# Contributing

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
