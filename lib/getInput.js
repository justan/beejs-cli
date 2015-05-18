//获取用户终端输入内容

var stdin = process.stdin
// var readline = require('readline')
//
// var rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// })

module.exports = function(tip) {
  return new Promise(function(resolve, reject) {
    tip = tip || ''

    // rl.question(tip, function(text) {
    //   resolve(text.trim())
    //   rl.close();
    // })
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
