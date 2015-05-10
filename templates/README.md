Beejs 示例组件 %Com
---

%Com 是 [beejs] 的示例组件. 该文档是示例文档, 请随意修改

Installation
---
你可以将组件发布至 npm. 使用的时候就可以直接:
```bash
npm install beejs-%com
cd beejs-%com && npm install
```

Usage
---
1. 在 HTML 中使用自定义标签 `x-%com` 来引用该组件

  ```html
  <x-%com id="%com"></x-%com>
  ```

2. 在 js 中初始化

  ```js
  Bee.mount('%com'); //初始化可以针对单个组件本身

  Bee.mount(document.body); //也可以针对某个容器进行
  ```
  针对容器的初始化将会初始化所有该节点下的组件自定义标签


具体的用法请参阅 examples 目录.


API
---
%com.getValue

Build
---
查看 examples 中的示例请先运行 `gulp build`


License
---
MIT


[beejs]: https://github.com/CFETeam/bee.js
