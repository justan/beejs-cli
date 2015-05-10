//Beejs 组件模板


//Beejs 通过 npm 安装, 用 require 依赖, 就像在使用 node 程序!
//当然, 如果 bee.js 是通过全局模式引入的话, 就可以不必在这里依赖了
var Bee = require('beejs')

//fs 模块只能在 node 环境中使用.
//但是由于我们在 package.json 中定义了 `browserify.transform` 使用 `brfs`
//browserify 构建的时候会将内容内嵌到 js 文件中, 从而兼容 node 和浏览器
var fs = require('fs')
var tpl = fs.readFileSync(__dirname + '/templates/index.html', 'utf8')

//%Com 是继承 Bee 的构造函数
var %Com = Bee.extend({
  $tpl: tpl,

  //组件默认数据
  $data: {},

  //组件的方法定义
  getValue: function() {
    return this.$get('keyword');
  }
});

//将标签 `x-%com` 同 %Com 建立关联. 类似 `img` 标签和 `Image` 构造函数的关系
//为了不和将来 HTML5 的新标签相冲突, 建议自定义标签总是带上前缀
Bee.tag('x-%com', %Com)

//上面两步可以合写成:
// var %Com = Bee.tag('x-%com', {
//   $tpl: tpl,
//   $data: {},
//
//   getValue: function() {
//     return this.$get('keyword');
//   }
// })


module.exports = %Com;
