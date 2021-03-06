//组件 package.json 样版
module.exports = {
  name: '',
  version: '0.0.0',
  license: 'MIT',
  main: 'index.js',
  description: '',
  author: '',
  dependencies: {
    beejs: '~0.5.0'
  },
  devDependencies: {
    browserify: '^10.0.0',
    gulp: '^3.8.11',
    brfs: '^1.4.0',
    "browserify-versionify": "^1.0.4",
    "del": "^1.1.1",
    'gulp-streamify': '^0.0.5',
    "gulp-rename": "^1.2.2",
    "gulp-uglify": "^1.2.0",
    "through2": "^0.6.5",
    'vinyl-source-stream': '^1.1.0',
    "babelify": '^6.1.1'
  },
  browser: {},
  browserify: {
    transform: ['babelify', 'brfs', 'browserify-versionify']
  }
}
