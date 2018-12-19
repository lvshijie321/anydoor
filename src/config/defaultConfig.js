// module.exports = {
//   port: 1213,
//   hostname: '127.0.0.1',
//   root: process.cwd()
// }
module.exports = {
    port: '1234',
    hostname: '127.0.0.1',
    root: process.cwd(),
    compress: /\.(html|js|css|md)/,
    cache: {
      maxAge: 600, // 单位秒
      expires: true,
      cacheControl: true,
      lastModified: true,
      etag: true,
    }
}
