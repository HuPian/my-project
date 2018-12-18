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
10. npm script

### extra task
增加reset／normalize css, 重制默认样式
增加 viewport <meta> ， 适应移动设备


# MiniCssExtractPlugin 取代 ExtractTextPlugin，支持css HMR