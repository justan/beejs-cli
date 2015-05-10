//获取用户终端输入内容

var stdin = process.stdin

module.exports = function(tip) {
  return new Promise(function(resolve, reject) {
    tip = tip || ''

    stdin.resume()
    stdin.setEncoding('utf8')
    process.stdout.write(tip);
    stdin.on('data', function listener(text) {
      stdin.removeListener('data', listener)
      stdin.pause()
      resolve(text.trim())
    })
  })
}
