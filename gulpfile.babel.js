import gulp from 'gulp';
import clean from 'gulp-clean';
import gulpIconfont from 'gulp-iconfont';
import gulpIconfontCss from 'gulp-iconfont-css';
import webpackConfig from './compile.config';
import webpack from 'webpack';



gulp.task('default', ['build']);
gulp.task('build',["clean","icon-font","static-compile"]);
// gulp.task('server',[]);
// gulp.task('release',[]);

gulp.task('clean', function (cb) {
  gulp.src('build')
      .pipe(clean({ force:true }));
  cb();
});

gulp.task('icon-font',function (cb) {
  const fontName = "my-font";
  gulp.src('./src/assets/svg-icons/*.svg')
      .pipe(gulpIconfontCss({
          fontName,
          path:'scss',
          targetPath:'../styles/icons.scss', // relative to dest
          fontPath:'../assets/fonts/', // relative to targetPath
          cssClass:'c-icon'
      }))
      .pipe(gulpIconfont({
        fontName,
        formats:['ttf', 'eot', 'woff','woff2','svg'],
        fontHeight:1200,
        normalize: true
      }))
      .pipe(gulp.dest('./src/assets/fonts'));
      cb();
});

gulp.task('static-compile', function (cb) {
  const compiler = webpack(webpackConfig);
  compiler.run((err,stats)=>{
    console.log(err);
    console.log(stats.toJson("minimal"));
  });
  cb();
});