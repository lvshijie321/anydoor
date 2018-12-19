// const fs = require('fs')
// const promisify = require('util').promisify
// const Handlebars = require('handlebars')
// const path = require('path')
// const conf = require('../src/config/defaultConfig')

// const source = fs.readFileSync(path.join(__dirname, '../template/dir.tpl')) // 因为模板只要执行一次就行，所以写在 module.exports 外，从缓存中读取
// console.log(source.toString())
// console.log(path.join(__dirname, '../template/dir.tpl'))
// const template = Handlebars.compile(source.toString())
// module.exports = async function(res, filepath) {


//   const stat = promisify(fs.stat)
//   try {
//     const stats = await stat(filepath)
//     if (stats.isFile()) {
//       setResponse(res, 200, 'text/plain')
//       fs.createReadStream(filepath).pipe(res)
//     } else if (stats.isDirectory()) {


//       const readdir = promisify(fs.readdir)
//       const files =  await readdir(filepath)
//       setResponse(res, 200, 'text/html')
//       const dir = path.relative(conf.root, filepath)
//       res.end(template({
//         title: path.basename(filepath),
//         dir: dir ? `/${dir}` : '', // 如果用相对路径或多一个 src
//         files
//       }))

//     }
//   } catch (e) {
//     console.error(e)
//     setResponse(res, 404, 'text/plain')
//     res.end(e.toString())
//   }
// }

// function setResponse(res, code, header) {
//   res.statusCode = code
//   res.setHeader('Content-Type', header)
// }
const promisify = require('util').promisify
const fs = require('fs')
const stat = promisify(fs.stat)
const path = require('path')
const readdir = promisify(fs.readdir)
const tplStr = fs.readFileSync(path.join(__dirname, '../template/dir.tpl')).toString()
const template = require('handlebars').compile(tplStr)
const ext = require('../helper/mime')
const compress = require('../helper/compress')
const range = require('../helper/range')
const isFresh = require('../helper/cache')
module.exports = async function (req, res, conf) {
  const hrefSuffix = req.url
  const filepath = path.join(conf.root, hrefSuffix)
  try {
    const stats = await stat(filepath)
    if (stats.isFile()) {

      if (isFresh(stats, req, res)) {
        res.statusCode = 304
        res.end()
        return
      }
      let rs
      const {code, start, end} = range(stats.size, req, res)
      let params
      if (code === 200) {
        params = [filepath]
      } else {
        params = [filepath, {start, end}]
      }
      setResponse(res, code, ext(filepath))
      rs = fs.createReadStream(...params)
      if (filepath.match(conf.compress)) {
        rs = compress(rs, req, res)
      }
      rs.pipe(res)
    } else if (stats.isDirectory()) {
      const files = await readdir(filepath)
      setResponse(res, 200, 'text/html')
      const dir = path.relative(conf.root, filepath)
      res.end(template({
        title: path.basename(filepath),
        files,
        dir: dir ? `/${dir}` : ''
      }))
    }
  } catch (e) {
    console.error(e.toString())
    setResponse(res, 404, 'text/plain')
    res.end(e.toString())
  }



}

function setResponse(res, code, header) {
  res.statusCode = code
  res.setHeader('Content-Type', header)
}
