import path from 'path'; // node 内部模块
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import UglifyJsWebpackPlugin from 'uglifyjs-webpack-plugin';
import  AssetsWebpackPlugin from "assets-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from 'webpack';

const webpackConfig = {
  entry:'./src/index.js',
  output:{
    filename:'[name].[hash:10].bundle.js',
    chunkFilename:'[name].[id][hash:10].js',
    path: path.resolve(__dirname,'build'),
    publicPath:'',
  },
  mode: "development",
  devtool:'source-map',
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
        use: ExtractTextPlugin.extract({fallback: "style-loader", use:["css-loader", "postcss-loader"]})
      },
      {
        test: /\.scss/,
        use: ExtractTextPlugin.extract({fallback:"style-loader",use:["css-loader","sass-loader", "postcss-loader"]}) //从右往左应用
      },
      {
        test: /\.(eot|ttf|woff|woff2|svg)/,
        use: 'file-loader'
      },
      {
        test: /\.(png|jpg|svg)/,
        use: 'url-loader'
      },
      {
        test:/\.html/,
        use:'html-loader'
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
    new UglifyJsWebpackPlugin({sourceMap:true}),

    new AssetsWebpackPlugin({
      filename: 'assets.json',
      path: path.resolve(__dirname,'build'),
      includeAllFileTypes: false,
      fileTypes:['js','css']
      }),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new webpack.HotModuleReplacementPlugin()
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