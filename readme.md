# depmap builder
> map builder for depmap

## usage
```javascript
const depmap = require('depmap')
const build = require('depmap-builder')
const compile = require('adapter')
const pug = require('adapter/adapters/pug')

const compilers = compile([pug])
const map = build('test/fixture/pug/*', { compilers: compilers })
console.log(map)
// {
//   about: {
//     filename: 'about.pug',
//     dependsOn: [ 'layout', 'meta' ],
//     onUpdate: compilers.pug
//   },
//   footer: {
//     filename: 'footer.pug',
//     dependsOn: [],
//     onUpdate: compilers.pug
//   },
//   index: {
//     filename: 'index.pug',
//     dependsOn: [ 'layout' ],
//     onUpdate: compilers.pug
//   },
//   layout: {
//     filename: 'layout.pug',
//     dependsOn: [ 'meta' ],
//     onUpdate: compilers.pug
//   },
//   meta: {
//     filename: 'meta.pug',
//     dependsOn: [],
//     onUpdate: compilers.pug
//   },
//   mixin: {
//     filename: 'mixin.pug',
//     dependsOn: [],
//     onUpdate: compilers.pug
//   }
// }

depmap.watch(map)
```

## license
MIT
