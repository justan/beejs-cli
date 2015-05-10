var through = require('through2')

//将名称填入样板之中
module.exports = function(name) {
  var capName = name.charAt(0).toUpperCase() + name.slice(1);
  return function(read, write) {
    read.pipe(through(function(buf, enc, next) {
      var str = buf.toString('utf8')
        .replace(/%Com/g, capName)
        .replace(/%com/g, name)

      this.push(str)

      next()
    })).pipe(write)
  }
}
