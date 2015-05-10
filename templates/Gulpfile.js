//gulpfile

var gulp = require('gulp')
var browserify = require('browserify')
var v_source = require('vinyl-source-stream')
var del = require('del')
var rename = require('gulp-rename')


gulp.task('build', function () {
  //var b = browserify({debug: true})//开启 sourcemap
  var b = browserify()

  b.add('./examples/app.js')

  return b.bundle()
    .pipe(v_source('app.js'))
    .pipe(gulp.dest('./examples/build'))
})

gulp.task('watch', function () {
  gulp.watch(['index.js', 'src/*/*.js'], ['build'])
})

gulp.task('clean', function () {
    return del(['./examples/build/*'])
})

gulp.task('default', ['clean', 'build', 'watch'])
