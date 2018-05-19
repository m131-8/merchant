var gulp = require('gulp');

// 阿里云 OSS 上传
var aoss = require('./build/ali-oss');
// 版本号
// var version = require('./package').version;
var version = 'common'; // 不再区分版本，都在common下面通过hash来识别不同的版本
var prefix  = 'dos/weixin';

// dev
gulp.task('dev', function(){
  var devServer = require('./build/dev-server');
});
// production
gulp.task('build', function(){
  var devServer = require('./build/build');
});

// 上传cdn文件
gulp.task('oss', function() {
  var ACCESSKEYID = process.env.ACCESSKEYID;
  var ACCESSKEYSECRET = process.env.ACCESSKEYSECRET;
  var options = {
    prefix: prefix,
    version: version,
    accessKeyId: ACCESSKEYID,
    accessKeySecret: ACCESSKEYSECRET,
    region: 'oss-cn-shanghai',
    bucket: 'cheanjia-assets'
  };
  return gulp.src(['www/**/*.*','!www/**/*.html']).pipe(aoss(options));
});
