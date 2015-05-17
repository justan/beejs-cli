var pt = require('path')
var fs = require('fs')

var ncp = require('ncp').ncp
var assign = require('object-assign')

var getInput = require('../lib/getInput')
var putName = require('../lib/putName')
var defaultsPkgJson = require('../lib/package.json.js')

var inputTips = [
  { tip: '请输入组件名称', field: 'name' },
  { tip: '请输入组件描述', field: 'description' },
  { tip: '请输入作者称呼', field: 'author' },
  { tip: '版本', field: 'version' }
]


module.exports = function(opts) {
  var name = opts._[1]
  var path, isNewDir
  var empty = true

  if(!name) {
    name = pt.basename(process.cwd())
    path = './'
  }else{
    isNewDir = true
    path = name
  }

  name += ''

  path = pt.join(process.cwd(), path)

  try{
    if(fs.readdirSync(path).length) {
      empty = false
    }
  }catch(e) {
    empty = true
  }

  if(!empty) {
    getInput('该目录不为空, 继续执行可能会覆盖现有文件, 是否继续 (yes)?').then(function(r) {
      r = r ? r.toLowerCase() : 'yes'
      if(r === 'yes' || r === 'y') {
        configPkg(path, name, isNewDir, opts)
      }
    })
  }else{
    configPkg(path, name, isNewDir, opts)
  }
}

//配置 package.json
function configPkg(path, name, isNewDir, opts) {
  var pkg

  try{
    //优先使用现有 package.json
    pkg = JSON.parse(fs.readFileSync(pt.join(path, 'package.json'), 'utf8'))
  }catch(e){
    pkg = assign({}, defaultsPkgJson)
  }

  pkg.name = pkg.name || name

  inputTips.reduce(function(queue, item) {
    var defaultValue = pkg[item.field];
    var tip = item.tip + (defaultValue ? ('(' + defaultValue + '): ') : ': ')
    return queue.then(function() {
      return getInput(tip)
    }).then(function(text) {
      pkg[item.field] = text || defaultValue;
      return pkg;
    })

  }, Promise.resolve()).then(function(p) {
    console.log(JSON.stringify(p, null, 2))
    copy(path, p, isNewDir, opts.prefix)
  })
}

function copy(path, pkg, isNewDir, prefix) {
  if(isNewDir) {
    fs.mkdirSync(path)
  }
  ncp(pt.join(__dirname, '../templates/'), path, {
    transform: putName(pkg.name, prefix)
  }, function(err) {
    if(err) {
      console.error(err)
    }else{
      fs.writeFileSync(pt.join(path, 'package.json'), JSON.stringify(pkg, null, 2), 'utf8')
      console.log('完成! 运行: `cd %s && npm install` 安装好依赖然后开始吧。', pkg.name)
    }
  })
}
