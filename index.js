const task = require('task.js')

const data = [...Array(200)].map((_, i) => ({ value: `this is value ${i}` }))

console.log(data)
