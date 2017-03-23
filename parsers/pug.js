const fs = require('fs')
const readline = require('readline')
const path = require('path')

const keywords = ['extends', 'include']

module.exports = (path, meta) => {
  return new Promise((resolve, reject) => {
    const deps = []
    const rl = readline.createInterface({
      input: fs.createReadStream(path, 'utf8')
    })

    rl
      .on('line', line => {
        if (line.indexOf(keywords[0]) > -1 || line.indexOf(keywords[1]) > -1) {
          let words = line.split(' ')
          let file = words[words.length - 1]
          deps.push(path.parse(file).name)
        }
      })
      .on('error', err => reject(err))
      .on('close', () => resolve(deps))
  })
}
