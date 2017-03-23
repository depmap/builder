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
      filename: 'about',
      dependsOn: [ 'layout.pug' ],
      onUpdate: compilers.pug
    },
    footer: {
      filename: 'footer',
      dependsOn: [],
      onUpdate: compilers.pug
    },
    index: {
      filename: 'index',
      dependsOn: [ 'layout.pug' ],
      onUpdate: compilers.pug
    },
    layout: {
      filename: 'layout',
      dependsOn: [ 'meta.pug' ],
      onUpdate: compilers.pug
    },
    meta: {
      filename: 'meta',
       dependsOn: [],
      onUpdate: compilers.pug
    },
    mixin: {
      filename: 'mixin',
      dependsOn: [],
      onUpdate: compilers.pug
     }
  }

  t.context.build(glob, opts)
    .then(res => t.deepEqual(res, expected))
})
