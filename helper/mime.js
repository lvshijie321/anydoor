// const path = require('path')
// const mimeTypes = {
//     '*': 'text/plain',
//     xml: 'text/xml',
//     txt: 'text/plain',
//     pdf: 'application/pdf',
//     word: 'application/msword',
//     png: 'image/png',
//     gif: 'image/gif',
//     jpeg: 'image/jpeg',
//     jpg: 'image/jpeg',
//     js: 'text/javascript',


// }
// module.exports = (filepath) => {
//     const ext = path.extname(filepath).split('.').pop().toLowerCase()
//     return mimeTypes[ext || '*'] || mimeTypes['*']
// }
const path = require('path')
const mimeTypes = {
    '*': 'text/plain',
    xml: 'text/xml',
    txt: 'text/plain',
    pdf: 'application/pdf',
    word: 'application/msword',
    png: 'image/png',
    gif: 'image/gif',
    jpeg: 'image/jpeg',
    jpg: 'image/jpeg',
    js: 'text/javascript',


}
module.exports = (filepath) => {
  const ext = path.extname(filepath).split('.').pop().toLowerCase()
  return mimeTypes[ext || '*'] || mimeTypes['*']
}
