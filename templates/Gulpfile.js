//gulpfile

var gulp = require('gulp')
var browserify = require('browserify')
var v_source = require('vinyl-source-stream')
var del = require('del')
var rename = require('gulp-rename')
var uglify = require('gulp-uglify')
var streamify = require('gulp-streamify')

//构建独立版本
gulp.task('build', function () {
  return build()
})

//构建自带依赖版本
gulp.task('build:with-beejs', function() {
  return build({
    beejs: true
  })
})

gulp.task('watch', function () {
  gulp.watch(['index.js', 'examples/*.js', 'templates/*', 'src/*.js'], ['build'])
})

gulp.task('clean', function () {
    return del(['./examples/build/*'])
})

gulp.task('default', ['clean', 'build', 'watch'])


//opts.debug 是否启用browserify sourcemap
function build(opts) {
  opts = opts || {};
  var b = browserify({debug: opts.debug})

  b.add('./index.js')
  if(!opts.es5Shim) {
    b.exclude('./node_modules/beejs/src/es5-bee-shim.js')
  }
  if(!opts.beejs) {
    b.exclude('beejs')
  }

  return b.bundle()
    .pipe(v_source('%tag.js'))
    .pipe(streamify(
      uglify()
    ))
    .pipe(gulp.dest('./build'))
}
