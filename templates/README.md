Beejs 示例组件 %Com
---

%Com 是 [beejs] 的示例组件.

Installation
---
你可以将组件发布至 npm. 使用的时候就可以直接:
```bash
npm install beejs-%com
cd beejs-%com && npm install
```

传统 script 标签引入:
```html
<script src="./build/%com.js"></script>
```

Usage
---
第一种用法是使用自定义标签:

1. 在 HTML 中使用自定义标签 `%pf%tag` 来引用该组件

  ```html
  <%pf%tag id="%com"></%pf%tag>
  ```

2. 在 js 中初始化

  ```js
  var %com = Bee.mount('%com', {
    //这里传入初始值
  }); //初始化可以针对单个组件本身

  Bee.mount(document.body); //也可以针对某个容器进行
  ```
  针对容器的初始化将会初始化所有该节点下的组件自定义标签


第二种用法是直接使用组件构造函数:

```js
var %Com = Bee.components['%pf%tag'];

var %com = new %Com({
  //初始值在这里
})
```

`%com.$el` 属性表示组件元素, 你可以插入到页面的任何地方.

具体的用法请参阅 examples 目录.


API
---
%com.getValue

Build
---
运行 `gulp build` 来构建独立版本的组件 js 文件.

运行 `gulp` 会自动监控, 组件 js 和示例 js 的变化, 并实时构建.

License
---
MIT


[beejs]: https://github.com/CFETeam/bee.js
