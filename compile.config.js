import path from 'path'; // node 内部模块
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import UglifyJsWebpackPlugin from 'uglifyjs-webpack-plugin';
const webpackConfig = {
  entry:'./src/index.js',
  output:{
    filename:'[name].[chunkhash:10].bundle.js',
    chunkFilename:'[name].[id][chunkhash:10].js',
    path: path.resolve(__dirname,'build'),
    publicPath:'',
  },
  mode: "development",
  module:{
    rules:[
      {
        test: /\.jsx?$/,
        use:{
          loader: 'babel-loader',
          options:{
            presets:['@babel/react']
          }
        } ,
        exclude: /node_modules/
      },
      {
        test: /\.css/,
        use: ExtractTextPlugin.extract({fallback: "style-loader", use:["css-loader"]})
      },
      {
        test: /\.scss/,
        use: ExtractTextPlugin.extract({fallback:"style-loader",use:["css-loader","sass-loader"]}) //从右往左应用
      },
      {
        test: /\.(eot|ttf|woff|woff2|svg)/,
        use: 'file-loader'
      },
      {
        test: /\.(png|jpg|svg)/,
        use: 'url-loader'
      }
    ]
  },
  optimization:{
    splitChunks:{
      name:'common',
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    },
  },
  plugins:[
    // 插件：导出 css
    new ExtractTextPlugin({
      filename:'[name]-[chunkhash:10].min.css'
    }),
    // 插件，压缩js
    new UglifyJsWebpackPlugin()
  ],
  resolve:{
    alias:{
      "@": "./src"
    },
    extensions:['.js','.scss'],
    modules:["node_modules"]
  }
};

export default webpackConfig;