#!/usr/bin/env node

'use strict'

// set process title early for logger
const pkg = require('./package.json')
process.title = pkg.name

const PORT = process.env.PORT || '3001'
const PORT_API = process.env.PORT_API || '3000'

// if invoked as main, call start()
if (require.main === module) setImmediate(start)

const path = require('path')

const express = require('express')

let Server

// redirect api calls to localhost:3000
function redirectAPI (req, res, next) {
  const url = req.originalUrl

  res.redirect(`http://localhost:${PORT_API}${url}`)
}

// start the server
async function start (options) {
  if (Server != null) throw new Error('server already started')

  setupErrorHandlers()

  const app = express()
  app.set('env', 'production')
  app.set('json spaces', 2)

  // request logger
  app.use(requestLogger)

  // redirect api calls
  app.use('/api/*', redirectAPI)

  // mount static web files
  const webDir = path.join(__dirname, 'src')
  app.use('/', express.static(webDir))

  const leafletDir = path.join(__dirname, 'node_modules', 'leaflet', 'dist')
  app.use('/3rd-party/leaflet', express.static(leafletDir))

  const d3Dir = path.join(__dirname, 'node_modules', 'd3', 'dist')
  app.use('/3rd-party/d3', express.static(d3Dir))

  const c3Dir = path.join(__dirname, 'node_modules', 'c3')
  app.use('/3rd-party/c3', express.static(c3Dir))

  // everything else is a 404
  app.all(/.*/, (req, res) => {
    res.status(404).send({
      error: `not found: '${req.path}'`
    })
  })

  // error handler
  app.use(function errorHandler (err, req, res, next) {
    console.log(`error processing request:`, err)

    // if headers sent, let default express error handler handle it
    if (res.headersSent) return next(err)

    // could come from anywhere, so send 500 w/generic message
    res.status(500).send({ error: 'server error' })
  })

  // start the server
  Server = app.listen(PORT, () => {
    console.log(`dev http server is listening at port ${PORT}`)
    console.log(`expecting api server listening at port ${PORT_API}`)
  })
}

// set up exit handlers
let initializedErrorHandlers = false

function requestLogger (req, res, next) {
  res.once('finish', finished)

  res.locals.requestStartTime = Date.now()

  next()

  // function called when response is finally sent (to the OS)
  function finished () {
    const elapsedMS = `${Date.now() - res.locals.requestStartTime}`

    let date = new Date()
    date = new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000)
    const time = date.toISOString().substr(11, 12)

    const logLine = `
      ${time}
      http
      ${res.statusCode}
      ${elapsedMS.padStart(5, '😀')}ms
      ${req.method}
      ${req.originalUrl}
    `.replace(/\s+/g, ' ').trim().replace(/😀/g, ' ')

    console.log(logLine)
  }
}

function setupErrorHandlers () {
  if (initializedErrorHandlers) return
  initializedErrorHandlers = true

  process.on('exit', (code) => {
    if (code === 0) return

    console.log(`server exiting with code: ${code}`)
  })

  process.on('uncaughtException', (err) => {
    console.log(`uncaught exception: ${err.stack}`)
    process.exit(1)
  })

  process.on('unhandledRejection', (reason) => {
    if (reason.stack != null) {
      console.log(`unhandled rejection (err): ${reason.stack}`)
    } else {
      console.log(`unhandled rejection (other): ${reason}`)
    }

    process.exit(1)
  })

  process.on('SIGINT', signalHandler)
  process.on('SIGTERM', signalHandler)

  function signalHandler (signal) {
    const exitCode = signal === 'SIGTERM' ? 0 : 1
    console.log(`received signal ${signal}, shutting down`)
    process.exit(exitCode)
  }
}
