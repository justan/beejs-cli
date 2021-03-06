#!/usr/bin/env node

var help = require('../cmd/help.js')
var path = require('path')
var fs = require('fs')
require('es6-promise').polyfill()

var argv = require('minimist')(process.argv.slice(2), {
  alias: {
    help: ['h'],
    version: ['v'],
    prefix: ['p']
  }
})

var cmd = argv._[0] + ''

if(argv.version) {
  console.log(JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'))).version)
}else if(!cmd || cmd === 'help' || argv.help) {
  if(cmd === 'help') {
    cmd = argv._[1]
  }
  help(null, cmd, argv)
} else{
  try{
    require(path.join('../cmd', cmd))(argv)
  }catch(e) {
    help(e, cmd, argv)
  }
}
