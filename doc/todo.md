### main task
1. create project/ git init
    a. git init
    b. create dir
    c. create index.html
        cdn load react
        cdn load css normalize file
        create root div
    d. create index.js and routes/index.js
        import common style file
        render DOM
        create empty routes
6. npm init
7. gulp init
    a. install gulp and babel
    b. create gulpfile.babel.js
8. gulp build
    static compile
        tips: chunkFilename 是导出按需加载的资源， 使用optimization.splitChunks 属性代替
        导出独立的css文件
        第三方依赖单独打包
        记录资源信息
    view compile 模版加载静态资源
    optimize：
        css 兼容性
        css 去重
9. gulp server (hot reload)
    ExtractTextPlugin 不支持css HMR, webpack4下不支持contenthash值
    try: css-hot-loader & mini-css-extract-plugin: cannot read property call of undefined
    try: gulp webserver : 另起一个单独的view 服务，监听文件夹, doesn't work. webpackDevSever 构建的内容在内存中
    solution: 起server时，不单独导出css文件，直接使用style-loader
10. npm script

### extra task
增加reset／normalize css, 重制默认样式
增加 viewport <meta> ， 适应移动设备


warning:
WARNING in asset size limit: The following asset(s) exceed the recommended size limit (244 KiB).
This can impact web performance.
Assets:
  vendor.js (293 KiB)
