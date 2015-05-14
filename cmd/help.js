//一般帮助
var tips = [
  "\nBeeJs 辅助工具\n",
  "\n用法: bee <command> [<args>]\n",
  "\n可用命令包括:\n",
  "  init, help"
]

module.exports = function(opts, e) {
  var cmd = opts._[0];
  if(e) {
    if(e.code === 'MODULE_NOT_FOUND') {
      console.log(opts._[0] + ' 不是合法的命令')
    }else{
      console.error(e.code)
    }
    tips.splice(0, 2)
  }else{
    (function help(cmd) {
      switch(cmd) {
        case 'init':
          tips = [
            "\n创建一个 beejs 组件, 指定了组件名后还会创建同名目录\n",
            "\n用法: bee init [<组件名>]\n",
            "\n  --prefix -p 自定义标签前缀" 
          ]
          break;
        case 'help':
          help(opts._[1])
          break;
        default:
          break;
      }
    }(cmd))
  }
  console.log(tips.join(''))
}
