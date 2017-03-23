import test from 'ava'
import build from '../'
import compile from 'adapter'
import pug from 'adapter/adapters/pug'

test.beforeEach(t => { t.context.build = build })

test('pug', t => {
  const glob = 'test/fixture/basic/*'
  const compilers = compile([pug])
  const opts = { compilers: compilers }

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

  t.context.build(glob, opts)
    .then(res => t.deepEqual(res, expected))
})
