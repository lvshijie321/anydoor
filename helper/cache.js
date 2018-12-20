// const {cache} = require('../src/config/defaultConfig')

// function refreshRes(stats, res) {
//   const{ maxAge,expires, cacheControl, lastModified, etag } = cache
//   if (expires) {
//     res.setHeader('Expires', new Date(Date.now() + maxAge * 1000).toUTCString())
//   }

//   if (cacheControl) {
//     res.setHeader('Cache-Control', `public, max-age=${maxAge}`)
//   }
//   if (lastModified) {
//     res.setHeader('Last-Modified', stats.mtime.toUTCString())
//   }
//   if (etag) {
//     res.setHeader('ETag', `${stats.size}-${stats.mtime.toUTCString()}`)
//   }
// }

// module.exports = (stats, req, res) => {
//   refreshRes(stats, res)
//   const lastModified = req.headers['if-modified-since']
//   const etag = req.headers['if-none-match']
//   if (!lastModified && !etag) {
//     return false
//   }
//   if (lastModified && lastModified!== res.getHeader('Last-Modified')) {
//     return false
//   }
//   // if (etag && etag!== res.getHeader('ETag')) {
//   //   return false
//   // }
//   return true
// }
const {cache} = require('../src/config/defaultConfig')
module.exports = (stats, req, res) => {
  refreshRes(stats, res)
  const lastModified = req.headers['if-modified-since']
  if (!lastModified) {
    return false
  } else if (lastModified !== res.getHeader('Last-Modified')) {
    return false
  } else {
    return true
  }
}

function refreshRes(stats, res) {
  const {maxAge,expires, cacheControl, lastModified, etag} = cache
  expires && res.setHeader('Expires', new Date(Date.now() + maxAge * 1000).toUTCString())
  cacheControl && res.setHeader('Cache-Control', `public, max-age=${maxAge}`)
  lastModified && res.setHeader('Last-Modified', stats.mtime.toUTCString())
}
