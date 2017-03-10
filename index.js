const task = require('task.js')

const data = [...Array(100)].map((_, i) => ({ value: `this is value ${i}` }))

const publicKey = 'XvD6bhtdxC2FVBXVzUNanqXoNSoB+O6XsUdZJKoZtdE='
const privateKey = 'M2aqJGwGNAk3gRyy/UQ09RF2Segea821qXzWgLv4b5Ze8PpuG13ELYVUFdXNQ1qepeg1KgH47pexR1kkqhm10Q=='

const cryptoBun = require('./crypto.bundled')
console.log(cryptoBun)

const signTask = task.defaults({
  warmStart: true,
  maxWorkers: 11,
  globals: {
    publicKey,
    privateKey,
    __dirname
  },
  initialize: globals => {
    globals.crypto = require(globals.__dirname + '/crypto')(globals.publicKey, globals.privateKey)
    return globals
  }
}).wrap(object => {
  return globals.crypto.sign(object)
})

data.forEach(obj => signTask(obj).then(console.log.bind(console)))
