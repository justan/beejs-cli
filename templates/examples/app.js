//加载需要的组件
var Compnent = require('../')

window.onload = function() {
  var list = [
    {value: '黑客与画家'},
    {value: '基地'},
    {value: '三体'},
    {value: '从0到1'}
  ];

  //针对单个组件进行初始化
  //组件的初始值通过这里的代码传入
  var bee = Bee.mount(document.getElementById('%com'), {
    $data: {
      keyword: "beejs",
      list: list
    }
  });

  document.getElementById('get%ComValue').onclick = function() {
    alert(bee.getValue());
  }

  //也可以通过 dom 获取 bee 示例
  //document.querySelectorAll('[data-role=%com]')[0].bee === bee; // true

  //初始化容器
  //这种情况下组件的初始数据需要透过自定义标签的属性完成
  var container = Bee.mount('container', {
    $data: {
      list: list
    },
    showValue: function() {
      //获取组件的 beejs 实例
      var x_%com = this.$el.querySelector('[data-role=%com]').bee;
      alert(x_%com.getValue())
    }
  })

  //container 是组件的容器
  //container === document.querySelectorAll('[data-role=%com]')[1].bee; //false
}
