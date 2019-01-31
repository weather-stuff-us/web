'use strict'

module.exports = delay

const pDefer = require('p-defer')

async function delay (ms) {
  const deferred = pDefer()

  setTimeout(onTimeout, ms)

  return deferred.promise

  function onTimeout () {
    deferred.resolve(ms)
  }
}
