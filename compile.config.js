import path from 'path'; // node 内部模块
import MiniCssExtractPlugin from 'extract-text-webpack-plugin'
import UglifyJsWebpackPlugin from 'uglifyjs-webpack-plugin';
import  AssetsWebpackPlugin from "assets-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from 'webpack';


export default function getWebpackConfig ({hot=false,filenameSignature=false}) {
  const mode = ["dev","development"].includes(process.env.NODE_ENV)? "development" : "production";
  //// 生成环境，资源文件名加版本号
  const nameSignature = {
    filehash:'',
    chunkhash:'',
    contenthash:''
  };
  if(filenameSignature){
    Object.assign(nameSignature,{
      filehash:'-[hash:10]',
      chunkhash:'-[chunkhash:10]',
      contenthash:'-[chunkhash:10]'
    })
  }
  const plugins = [
    // 插件：导出 css
    new MiniCssExtractPlugin({
      filename:`[name]${nameSignature.contenthash}.min.css`
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
    })
  ];
  // 起server时，需要热加载模块
  if(hot){
    plugins.push(new webpack.HotModuleReplacementPlugin());
  }
  return {
    entry:'./src/index.js',
    output:{
      filename:`[name]${nameSignature.chunkhash}.bundle.js`,
      chunkFilename:`[name]${nameSignature.chunkhash}.js`,
      path: path.resolve(__dirname,'build'),
      publicPath:'',
    },
    mode:"development",
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
          use: [ MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"]
        },
        {
          test: /\.scss/,
          use: [ MiniCssExtractPlugin.loader, "css-loader","sass-loader", "postcss-loader"] //从右往左应用
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
    plugins,
    resolve:{
      alias:{
        "@": "./src"
      },
      extensions:['.js','.scss'],
      modules:["node_modules"]
    }
  };
}

