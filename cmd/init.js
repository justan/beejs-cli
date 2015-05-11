var pt = require('path')
var fs = require('fs')
var ncp = require('ncp').ncp

var getInput = require('../lib/getInput')
var putName = require('../lib/putName')

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
        configPkg(path, name, isNewDir)
      }
    })
  }else{
    configPkg(path, name, isNewDir)
  }
}

//配置 package.json
function configPkg(path, name, isNewDir) {
  var defaults = {
      name: '',
      version: '0.0.0',
      license: 'MIT',
      main: 'index.js',
      description: '',
      author: '',
      dependencies: {
        beejs: '~0.1.1'
      },
      devDependencies: {
        browserify: '^10.0.0',
        gulp: '^3.8.11',
        brfs: '^1.4.0',
        "del": "^1.1.1",
        'gulp-streamify': '^0.0.5',
        "gulp-rename": "^1.2.2",
		"through2": "^0.6.5",
        'vinyl-source-stream': '^1.1.0'
      },
      browserify: {
        transform: ['brfs']
      }
    }
  var pkg = defaults

  try{
    pkg = JSON.parse(fs.readFileSync(pt.join(path, 'package.json'), 'utf8'))
  }catch(e){
    pkg = defaults;
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
    copy(path, p, isNewDir)
  })
}

function copy(path, pkg, isNewDir) {
  if(isNewDir) {
    fs.mkdirSync(path)
  }
  ncp(pt.join(__dirname, '../templates/'), path, {
    transform: putName(pkg.name)
  }, function(err) {
    if(err) {
      console.error(err)
    }else{
      fs.writeFileSync(pt.join(path, 'package.json'), JSON.stringify(pkg, null, 2), 'utf8')
      console.log('完成! 请输入: `npm install` 安装好依赖然后开始吧。')
    }
  })
}
