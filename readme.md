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

depmap.watch(map)
```

## license
MIT
