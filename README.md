# eslint-initializer


[![npm](https://img.shields.io/npm/v/eslint-initializer)](https://www.npmjs.com/package/eslint-initializer)
[![npm bundle size](https://img.shields.io/bundlephobia/min/eslint-initializer)](https://www.npmjs.com/package/eslint-initializer)

Quickly create an eslint config file in any directory based on your presets


## Install

```javascript
npm i -g eslint-initializer
```

## Usage

Basic usage:

```sh
$ eslint-init
? Does your project use typescript? Yes
? Which framework does your project use? Vue
? What environments will your project be running in? browser, es6
ESLint config created.
{
  "typescript": true,
  "framework": "vue",
  "env": [
    "browser",
    "es6"
  ]
}
```

Add rules from a second eslintrc file to the saved template:

```sh
$ eslint-init -m
```

Replace the saved template with a new eslintrc file:

```sh
$ eslint-init -r
```

## Options
    -v, --version                    Print program version
    -m, --merge                      Merge rules from an eslintrc into the saved
                                     template
    -r, --replace                    Replace the saved template with a new eslintrc

## License

MIT © [jmoore914](https://github.com/jmoore914)