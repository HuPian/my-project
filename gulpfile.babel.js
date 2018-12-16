import gulp from 'gulp';
import clean from 'gulp-clean';
import gulpIconfont from 'gulp-iconfont';
import gulpIconfontCss from 'gulp-iconfont-css';
import gulpSequence from 'gulp-sequence';
import webpackConfig from './compile.config';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import open from 'open';



gulp.task('default', ['build']);
gulp.task('build',gulpSequence("clean","icon-font","compile"));
// gulp.task('server',[]);

gulp.task('clean', function (cb) {
  gulp.src('build')
      .pipe(clean({ force:true }));
  cb();
});

gulp.task('icon-font',function (cb)  {
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
        normalize: true,
        timestamp: 1
      }))
      .pipe(gulp.dest('./src/assets/fonts'));
  cb();
});

gulp.task('compile', function (cb) {
  const compiler = webpack(webpackConfig);
  compiler.run((err,stats)=>{
    if(err) console.log(err);
    if(stats.hasErrors()) console.log(stats.toJson("minimal"));
    cb();
  });
});

gulp.task('server.dev', function () {

  const options = {
    hot:true,
    port:8989,
    host: "0.0.0.0",
    compress:true,
    // publicPath:'',
    open: true,
    watchContentBase: true,
    // inline:true,
  };
  WebpackDevServer.addDevServerEntrypoints(webpackConfig, options);
  const compiler = webpack(webpackConfig);
  const devServer = new WebpackDevServer(compiler, options);
  devServer.listen(8989,'0.0.0.0',(error)=>{
    if(error) console.log(error);
    console.log(`Listen at http://0.0.0.0:8989`);
    open('http://0.0.0.0:8989');
  });
});