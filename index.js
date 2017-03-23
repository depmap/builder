const globber = require('glob')
const path = require('path')
const parse = {}

// collect all parsers
globber('./parsers/*', (err, parsers) => {
  if (err) throw err
  for (let i = 0; i < parsers.length; i++) {
    let parser = parsers[i]
    let name = path.parse(parser).name
    parser = require(parser)
    parse[name] = parser
  }
})

module.exports = (glob, opts) => {
  return new Promise((resolve, reject) => {
    opts = opts || { glob: {}, compiler: {} }

    files(glob, opts.glob)
      .then(buildMeta.bind(null, opts))
      .then(map => resolve(map))
      .catch(err => reject(err))
  })
}

function files (glob, opts) {
  return new Promise((resolve, reject) => {
    globber(glob, opts, (err, files) => {
      if (err) reject(err)
      resolve(files)
    })
  })
}

function buildMeta (opts, files) {
  return new Promise((resolve, reject) => {
    const map = {}
    const promises = []

    for (let key in files) {
      let file = files[key]
      let meta = path.parse(file)
      meta.ext = meta.ext.substring(1)
      map[meta.name] = {
        filename: meta.base,
        dependsOn: [],
        onUpdate: opts.compilers[meta.ext]
      }

      promises.push(
        parse[meta.ext](file, meta)
          .then(deps => { map[meta.name].dependsOn = deps })
      )
    }

    Promise.all(promises)
      .then(() => resolve(map))
  })
}
