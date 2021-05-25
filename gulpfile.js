let gulp = require('gulp');
let sass = require('gulp-sass');
let autoprefixer = require('gulp-autoprefixer'); // 自动修复插件
 
gulp.task('sass', () => {
  return gulp
    .src('scss/*.scss')
    .pipe(sass({ outputStyle: 'expanded' }))
    .on('error', sass.logError)
    .pipe(autoprefixer())
    .pipe(gulp.dest('static/css'))
});
 
gulp.task('watch', () => {
    // gulp.watch('scss/*.scss', ['sass']); // 4.0以上报错
    gulp.watch('scss/*.scss', gulp.series('sass'));
});