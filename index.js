const globber = require('glob')
const path = require('path')
const merge = require('lodash.merge')
const process = require('process')

const defaults = {
  path: process.cwd(),
  ignore: [],
  loaders: {},
  glob: undefined
}

function compilationType (compiler, deps, file) {
  console.log('before')
  return new Promise((resolve, reject) => {
    console.log('promise')
    compiler.file(path.join(process.cwd(), file))
      .then(out => {
        console.log('building ...', file)
        fs.writeFile(path.join(opts.output, path.parse(file).base), output, err => {
          if (err) reject(err)
          resolve()
        })
      })
  })
}

module.exports = (opts) => {
  return new Promise((resolve, reject) => {
    opts = merge({}, defaults, opts)

    getFiles(opts.path, opts.glob)
      .then(buildMeta.bind(null, opts))
      .then(map => resolve(map))
      .catch(err => reject(err))
  })
}

function getFiles (glob, opts) {
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
        filename: file,
        dependsOn: [],
        onUpdate: compilationType.bind(null, opts.load[meta.ext].compile)
      }

      promises.push(
        opts.load[meta.ext].parse(file, meta)
          .then(deps => { map[meta.name].dependsOn = deps })
      )
    }

    Promise.all(promises)
      .then(() => resolve(map))
  })
}
