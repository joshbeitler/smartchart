var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  less = require('gulp-less'),
  path = require('path'),
  browserSync = require('browser-sync'),
  babel = require('gulp-babel'),
  reload = browserSync.reload;

gulp.task('nodemon', function() {
  nodemon({
    script: 'app/server.js',
    ext: 'js html',
    env: {
      'NODE_ENV': 'development'
    }
  });
});

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

gulp.task('default', ['browser-sync'], function() {
  gulp.watch(['app/public/javascripts/**/*.html'], reload);
  gulp.watch(['app/public/views/*.ejs'], reload);
  gulp.watch(['app/public/styles/*.less'], ['less']);
  gulp.watch(['app/public/styles/build/*.css'], reload);
});
