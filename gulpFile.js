(function(){
  var gulp  = require('gulp');
  var $     = require('gulp-load-plugins')({lazy:false});
  var wiredep = require('wiredep');
  var mocha = require('gulp-mocha');

$.livereload();
$.livereload.listen();

var paths = {
  index: './client/index.html',
  root: './client',
  html: './client/**/*.html',
  scripts: './client/app/**/*.js',
  styles: './client/app/**/*.css',
  bower:'./client/bower_components',
  tests: './tests/tests.js'
}

gulp
  .task('default', $.sequence('inject', 'bower', 'test', 'server', 'watch'))
  .task('server', startServer)
  .task('watch', startWatch)
  .task('inject', startInject)
  .task('test', startTests)
  .task('bower', startBower);

function startServer(){
  require('./server');

}
function startWatch(){
  gulp.watch('./client/app/**/*.css', $.livereload.changed);
  gulp.watch('./client/app/**/*.js', $.livereload.changed);
  gulp.watch('./client/**/*.html', $.livereload.changed);
}

function startInject(){
  var target  = gulp.src( paths.index );
  var scripts = gulp.src( paths.scripts, {read:false} );
  var styles  = gulp.src( paths.styles, {read:false} );

  return target
    .pipe( $.inject( scripts,  {relative:true}) )
    .pipe( $.inject( styles,  {relative:true}) )
    .pipe( gulp.dest( paths.root ) );
}

function startBower(){
  var wire = wiredep.stream;
  return gulp.src(paths.index)
    .pipe(wire({
      directory: paths.bower
    }))
    .pipe(gulp.dest(paths.root))
}

function startTests(){
  return gulp.src(paths.tests, {read : false})
    .pipe(mocha({reporter : 'nyan'}));
}

})();