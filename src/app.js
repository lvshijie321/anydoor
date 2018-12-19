// const http = require('http')
// const conf = require('./config/defaultConfig')
// const chalk = require('chalk')
// const path = require('path')


// const route = require('../helper/route.js')
// const server = http.createServer((req, res) => {
//   const filepath = path.join(conf.root, req.url)
//   route(res, filepath)

//   console.log(111111)




// })
// server.listen(conf.port, conf.hostname, () => {
//   const addr = `http://${conf.hostname}:${conf.port}`
//   console.info(`Server started at ${chalk.green(addr)}`)
// })

const http = require('http')
const conf = require('./config/defaultConfig')
const chalk = require('chalk')
const route = require('../helper/route')
http.createServer((req, res) => {
  route(req, res)
}).listen(conf.port, conf.hostname, () => {
  const addr = `http://${conf.hostname}:${conf.port}`
  console.info(`Server started at ${chalk.green(addr)}`)
})
