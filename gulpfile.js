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

// Path config
//-----------------------------------------------
var paths = {
  server: 'index.js',
  build: 'public/build',
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

// Gulp task
//-----------------------------------------------
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
  gulp.watch(paths.html.src, html);
}

function serveServer(done) {
  var isStarted = false;

  return nodemon({ scripts: paths.server })
    .on('start', () => {
      if (!isStarted) {
        isStarted = true;

        setTimeout(() => {
          done();
        }, 2000);
      }
    })
    .on('restart', () => {
      setTimeout(function () {
        browserSync.reload({ stream: false });
      }, 1000);
    });
}

function serveClient(done) {
  browserSync.init({
    proxy: 'localhost:3000',
    port: 7000,
    files: paths.build,
  }, done);
}

var serve = gulp.series(serveServer, serveClient);

var build = gulp.series(clean, gulp.parallel(styles, scripts, html));

var defaultTask = gulp.series(build, serve, watch);

// Export task
//-----------------------------------------------
exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
exports.watch = watch;
exports.serve = serve;
exports.build = build;
exports.default = defaultTask;