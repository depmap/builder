import test from 'ava'
import build from '../'
import compile from 'adapter'
import pugCompile from 'adapter-pug'
import parse from 'parser'
import pugParse from 'parse-pug'

test.beforeEach(t => { t.context.build = build })

test('pug', t => {
  const compilers = compile([pugCompile])
  const parsers = parse([pugParse])
  const opts = {
    path: 'test/fixture/basic/*',
    compile: compilers,
    parsers: parsers
  }

  const expected = {
    about: {
      filename: 'about.pug',
      dependsOn: [ 'layout', 'meta' ],
      onUpdate: compilers.pug
    },
    footer: {
      filename: 'footer.pug',
      dependsOn: [],
      onUpdate: compilers.pug
    },
    index: {
      filename: 'index.pug',
      dependsOn: [ 'layout' ],
      onUpdate: compilers.pug
    },
    layout: {
      filename: 'layout.pug',
      dependsOn: [ 'meta' ],
      onUpdate: compilers.pug
    },
    meta: {
      filename: 'meta.pug',
      dependsOn: [],
      onUpdate: compilers.pug
    },
    mixin: {
      filename: 'mixin.pug',
      dependsOn: [],
      onUpdate: compilers.pug
    }
  }

  t.context.build(opts)
    .then(res => t.deepEqual(res, expected))
})
