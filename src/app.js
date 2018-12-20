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

// const http = require("http");
// const conf = require("./config/defaultConfig");
// const chalk = require("chalk");
// const route = require("../helper/route");
// const opoenUrl = require("../helper/openUrl");
// class Server {
//   constructor(config) {
//     this.conf = Object.assign({}, conf, config);
//   }
//   start() {
//     http
//       .createServer((req, res) => {
//         route(req, res, this.conf);
//       })
//       .listen(this.conf.port, this.conf.hostname, () => {
//         const addr = `http://${this.conf.hostname}:${this.conf.port}`;
//         console.info(`Server started at ${chalk.green(addr)}`);
//         opoenUrl(addr)
//       });
//   }
// }

// module.exports = Server

const defaultConfig = require('../src/config/defaultConfig')
const http = require('http')
const route = require('../helper/route')
const chalk = require('chalk')
const openUrl = require('../helper/openUrl')
class Server {
  constructor(conf) {
    this.conf = Object.assign({}, defaultConfig, conf)
  }
  start () {

    http.createServer((req, res) => {
      route(req, res, this.conf)
    }).listen(this.conf.port, this.conf.hostname, () => {
      const addr = `http://${this.conf.hostname}:${this.conf.port}`
      console.info(`Server start at ${chalk.green(addr)}`)
      openUrl(addr)
    })
  }
}

module.exports = Server

