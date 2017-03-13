# parse-es6-imports [![Build Status](https://travis-ci.org/brenoc/parse-es6-imports.svg?branch=master)](https://travis-ci.org/brenoc/parse-es6-imports)

> Parse ES6 imports from a string

## Install

```sh
$ npm install parse-es6-imports --save
```

### Usage

```js
const parseImports = require('parse-es6-imports')

const code = `
  import defaultA from './moduleA'
  import defaultB, { namedB } from './moduleB'
  import { namedC } from './moduleC'
  import { namedD as otherName } from './moduleD'
  import * as moduleE from './moduleE'
  import './moduleF'
`

const result = parseImports(code)

console.log(JSON.stringify(result, null, 2))

// [
//   {
//     "defaultImport": "defaultA",
//     "namedImports": [],
//     "starImport": null,
//     "fromModule": "./moduleA"
//   },
//   {
//     "defaultImport": "defaultB",
//     "namedImports": [
//       {
//         "name": "namedB",
//         "value": "namedB"
//       }
//     ],
//     "starImport": null,
//     "fromModule": "./moduleB"
//   },
//   {
//     "defaultImport": null,
//     "namedImports": [
//       {
//         "name": "namedC",
//         "value": "namedC"
//       }
//     ],
//     "starImport": null,
//     "fromModule": "./moduleC"
//   },
//   {
//     "defaultImport": null,
//     "namedImports": [
//       {
//         "name": "namedD",
//         "value": "otherName"
//       }
//     ],
//     "starImport": null,
//     "fromModule": "./moduleD"
//   },
//   {
//     "defaultImport": null,
//     "namedImports": [],
//     "starImport": "moduleE",
//     "fromModule": "./moduleE"
//   },
//   {
//     "defaultImport": null,
//     "namedImports": [],
//     "starImport": null,
//     "fromModule": "./moduleF"
//   }
// ]
```

## License

MIT