var gulp = require('gulp');

var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var sass = require('gulp-sass');
var del = require('del');
var wiredep = require('wiredep').stream;
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync').create();

var paths = {
  styles: {
    src: 'public/src/styles/**/*.scss',
    dest: 'public/build/styles/'
  },
  scripts: {
    src: 'public/src/app/**/*.js',
    dest: 'public/build/scripts/'
  },
  html: {
    src: 'public/src/**/*.html',
    dest: 'public/build/',
    base: 'public/src/'
  }
};

function clean() {
  return del(['public/build']);
}

function styles() {
  return gulp.src(paths.styles.src, { sourcemaps: true })
    .pipe(wiredep())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.styles.dest));
}

function scripts() {
  return gulp.src(paths.scripts.src, { sourcemaps: true })
    .pipe(concat('app.js'))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts.dest));
}

function html() {
  return gulp.src(paths.html.src, { since: gulp.lastRun(html), base: paths.html.base })
    .pipe(wiredep({
      exclude: 'bootstrap.js'
    }))
    .pipe(gulp.dest(paths.html.dest));
}

function watch() {
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.styles.src, styles);
}

var build = gulp.series(clean, gulp.parallel(styles, scripts, html));

var defaultTask = gulp.series(build, watch);

exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
exports.watch = watch;
exports.build = build;
exports.default = defaultTask;