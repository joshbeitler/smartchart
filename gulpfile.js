var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  less = require('gulp-less'),
  path = require('path'),
  browserSync = require('browser-sync'),
  babel = require('gulp-babel'),
  reload = browserSync.reload,
  concat = require('gulp-concat');

gulp.task('nodemon', function() {
  nodemon({
    script: 'app/server.js',
    ext: 'js html',
    env: {
      'NODE_ENV': 'development'
    }
  });
});

gulp.task('build', function() {
  gulp.src([
      'app/public/javascripts/app.js',
      'app/public/javascripts/**/*.module.js',
      'app/public/javascripts/**/**/*.module.js',
      'app/public/javascripts/**/*.directive.js',
      'app/public/javascripts/**/**/*.directive.js'
    ])
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('app/public'));
})

gulp.task('less', function() {
  return gulp.src('app/public/styles/**/*.less')
    .pipe(less({
      paths: [path.join('app/public/styles')]
    }))
    .pipe(gulp.dest('app/public/styles/build'));
});

gulp.task('browser-sync', ['nodemon', 'less'], function() {
  browserSync({
    proxy: "localhost:3000", // local node app address
    port: 5000, // use *different* port than above
    notify: true
  });
});

gulp.task('default', ['build', 'browser-sync'], function() {
  gulp.watch(['app/public/javascripts/**/*.html'], reload);
  gulp.watch(['app/public/views/*.ejs'], reload);
  gulp.watch(['app/public/styles/*.less'], ['less']);
  gulp.watch(['app/public/styles/build/*.css'], reload);
});
