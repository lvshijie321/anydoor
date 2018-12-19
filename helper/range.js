const { succCode, failCode } = {
  succCode: 206,
  failCode: 200,
}

module.exports = (totalSize, req, res) => {
  const range = req.headers['range']
  if (!range) {
    return {code: failCode}
  }
  const sizes = range.match(/bytes=(\d*)-(\d*)/)
  const end = sizes[2] || totalSize - 1
  const start = sizes[1] || totalSize - end
  if (start > end || start < 0 || end > totalSize) {
    return {code: failCode}
  }
  res.setHeader('Accept-Ranges', 'bytes')
  res.setHeader('Content-Range', `bytes ${start}-${end}/${totalSize}`)
  res.setHeader('Content-Length', end - start)
  return {
    code: succCode,
    start: parseInt(start),
    end: parseInt(end)
  }
}
