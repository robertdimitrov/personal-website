var browserify = require('browserify');
var babelify = require('babelify');
var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-csso');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');
var watchify = require('watchify');
var exit = require('gulp-exit');

var distDirectory = './dist';

var sassDirectory = './sass';
var scssEntryFile = sassDirectory + '/style.scss';
var scssWatchFiles = sassDirectory + '/**/*.scss';

var jsDirectory = './js';
var jsEntryFile = jsDirectory + '/app.js';
var jsBundleFileName = 'bundle.min.js';
var jsWatchFiles = jsDirectory + '/**/*.js';

function buildJS(watch) {
  var bundler = watchify(browserify(jsEntryFile).transform(babelify));

  function bundle() {
    var startMs = Date.now();
    var db = bundler.bundle()
      .on('error', function(err) {
        console.log(err.message);
        this.emit('end');
      })
      .pipe(source(jsBundleFileName))
      .pipe(buffer())
      .pipe(streamify(uglify()))
      .pipe(gulp.dest(distDirectory));
    console.log('Updated bundle file in', (Date.now() - startMs) + 'ms');
    return db;
  }

  if (watch) {
    bundler = watchify(bundler)
        .on('update', function() {
          bundle();
        });
  }

  return bundle();
}

gulp.task('build-js', function() {
  buildJS(false);
});

gulp.task('watch-js', function() {
  buildJS(true);
});

function buildCss() {
  return gulp.src(scssEntryFile)
      .pipe(sass().on('error', sass.logError))
      .pipe(minifyCSS())
      .pipe(gulp.dest(distDirectory))
}

gulp.task('build-sass', function () {
  buildCss();
});

gulp.task('watch-sass', function () {
  var watcher = gulp.watch(scssWatchFiles, ['build-sass']);
  watcher.on('change', function(e) {
    console.log('Recompiling SASS because file changed: ' + e.path);
  });
});

gulp.task('default', ['build-js', 'build-sass']);
gulp.task('dev', ['watch-js', 'watch-sass']);