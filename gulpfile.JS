var gulp = require('gulp');
var inject = require('gulp-inject');
var htmlmin = require('gulp-htmlmin');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var javascriptObfuscator = require('gulp-javascript-obfuscator');
var angularFilesort = require('gulp-angular-filesort');
var webserver = require('gulp-webserver');
var rm = require('gulp-rm');

var changed = require('gulp-changed');

// paths ar correct for src folder
var paths = {
  src: 'public/**/*',
  srcHTML: 'public/**/*.html',
  srcCSS: ['public/styles/*.css'],
  srcJS: ['public/**/module.js', 'public/**/controller.js', 'public/**/router.js'],
  dist: 'dist',
  distIndex: 'dist/index.html',
  distCSS: ['dist/**/style.min.css'],
  distJS: ['dist/**/bundle.min.js']
};

gulp.task('move', function () {
  return gulp.src([

      './public/images/*.*',
      './public/library/**/*.*'
    ], {
      base: 'public'
    })
    .pipe(changed(paths.dist))

    .pipe(gulp.dest(paths.dist));
});

gulp.task('html', function () {
  return gulp.src(paths.srcHTML)
    .pipe(changed(paths.dist))
    .pipe(htmlmin({
      collapseWhitespace: true, // Collapse white space that contributes to text nodes in a document tree
      collapseInlineTagWhitespace: true, // Don't leave any spaces between display:inline; elements when collapsing. Must be used in conjunction with collapseWhitespace=true
      conservativeCollapse: true, // Always collapse to 1 space (never remove it entirely). Must be used in conjunction with collapseWhitespace=true
      ignoreCustomComments: [

        // inject style.min.css
        /^\s+inject:css/,
        /^\s+endinject\s+$/,

        // inject bundle.mins.css
        /^\s+inject:js/,
        /^\s+endinject\s+$/
      ],
      html5: true, // Minify CSS in style elements and style attributes (uses clean-css)
      minifyCSS: true, // Minify CSS in style elements and style attributes (uses clean-css)
      minifyJS: {
        mangle: false,
        ie8: true,
        compress: {
          drop_console: true
        },
        output: {
          comments: false
        }
      }, // Minify JavaScript in script elements and event attributes (uses UglifyJS)
      minifyURLs: true, // Minify URLs in various attributes (uses relateurl)
      removeComments: true, // Strip HTML comments
      sortAttributes: true, // Sort attributes by frequency
      sortClassName: true, // Sort style classes by frequency
      useShortDoctype: true // Replaces the doctype with the short (HTML5) doctype
    }))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('css', function () {
  return gulp.src(paths.srcCSS)
    .pipe(changed(paths.dist))
    //.pipe(sourcemaps.init())
    .pipe(concat('styles/style.min.css'))
    .pipe(cleanCSS({
      compatibility: 'ie8'
    }))
    //.pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.dist));
});

gulp.task('bundle', function () {
  return gulp.src(paths.srcJS)
    .pipe(changed(paths.dist))

    .pipe(angularFilesort())

    .pipe(javascriptObfuscator({
      compact: true
    }))
    .pipe(concat('scripts/bundle.min.js'))



    .pipe(gulp.dest('./dist'));
});


gulp.task('copy', ['html', 'css', 'bundle', 'move']);

gulp.task('inject', ['copy'], function () {
  var css = gulp.src(paths.distCSS);
  var js = gulp.src(paths.distJS);
  return gulp.src(paths.distIndex)
    .pipe(inject(css, {
      ignorePath: '/dist'
    }))
    .pipe(inject(js, {
      ignorePath: '/dist'
    }))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('serve', ['inject'], function () {
  gulp.src(paths.dist)
    .pipe(webserver({
      port: 3000,
      livereload: true,
      directoryListing: false,
      open: true,
      fallback: 'index.html'
    }));
});

gulp.task('clean', function () {
  return gulp.src('dist/**/*', {
      read: false
    })
    .pipe(rm({
      async: false
    }));
});

gulp.task('watch', ['serve'], function () {
  gulp.watch(paths.src, ['inject', 'move']);
});

gulp.task('default', ['watch']);