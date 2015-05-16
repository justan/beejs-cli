//一般帮助
var tips = [
  "\nBeeJs 辅助工具\n",
  "\n用法: bee <command> [<args>]\n",
  "\n可用命令包括:\n",
  "  init, help"
]

module.exports = function(e, cmd) {
  if(e) {
    if(e.code === 'MODULE_NOT_FOUND') {
      console.log(cmd + ' 不是合法的命令')
    }else{
      console.error(e.code)
    }
    tips.splice(0, 2)
  }else{
    switch(cmd) {
      case 'init':
        tips = [
          "\n创建一个 beejs 组件, 指定了组件名后还会创建同名目录\n",
          "\n用法: bee init [<组件名>]\n",
          "\n  --prefix -p 自定义标签前缀"
        ]
        break;
      case 'help':
        tips.unshift('\n显示下面的帮助文字:\n')
        break;
      case undefined:
        break;
      default:
        console.log(cmd + ' 不是合法的命令')
        tips.splice(0, 2)
        break;
    }
  }
  console.log(tips.join(''))
}
