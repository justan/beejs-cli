var through = require('through2')

//将名称填入样板之中
module.exports = function(tagName, prefix) {
  //替换 `-` 横线
  var name = tagName.replace(/-([a-z])/g, function(m, char){ return char.toUpperCase() })
  var capName = name.charAt(0).toUpperCase() + name.slice(1)

  if(prefix === true || !prefix) {
    prefix = ''
  }

  return function(read, write, file) {
    //console.log(file.name)
    read.pipe(through(function(buf, enc, next) {
      var str = buf.toString('utf8')
        .replace(/%Com/g, capName)
        .replace(/%com/g, name)
        .replace(/%tag/g, tagName)
        .replace(/%pf/g, prefix)

      this.push(str)

      next()
    })).pipe(write)
  }
}
