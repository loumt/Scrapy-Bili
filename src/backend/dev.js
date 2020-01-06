process.env.debug='bili:*'
let server = require('./app')
server.on('server-success', () => {
  console.log(`Server Run ......... `)
})
server.on('server-error', msg => {
  console.log(`Server Error ......... `)
  console.log(msg)
})
server.createServer();