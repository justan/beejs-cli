//Beejs 组件模板

//使用 `brfs`
var fs = require('fs')
var tpl = fs.readFileSync(__dirname + '/templates/index.html', 'utf8')
var Bee = require('beejs')

//%Com 是继承 Bee 的构造函数
var %Com = Bee.extend({
  $tpl: tpl,

  //组件的方法定义
  getValue: function() {
    return this.$get('keyword');
  }
}, {
  //组件默认数据
  defaults: {}
});

//将标签 `%pf%tag` 同 %Com 建立关联. 类似 `img` 标签和 `Image` 构造函数的关系
Bee.tag('%pf%tag', %Com)

%Com.version = '__VERSION__'

module.exports = %Com;
