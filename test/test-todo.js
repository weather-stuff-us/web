'use strict'

const runTest = require('./lib/test-runner')(__filename)

// TODO - build real tests
runTest(async function buildRealTests (t) {
  t.pass('need to add real tests')
  t.end()
})
