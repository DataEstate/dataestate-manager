const HtmlWebPackPlugin = require("html-webpack-plugin");
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const dotenv = require("dotenv");
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = (env) =>{

  // Get the root path (assuming your webpack config is in the root of your project!)
  const currentPath = path.join(__dirname);
  // Create the fallback path (the production .env)
  const basePath = currentPath + '/.env';
  // We're concatenating the environment name to our filename to specify the correct env file!
  const envPath = basePath + (env !== undefined ? `.${env.ENVIRONMENT}` : '');
  // Check if the file exists, otherwise fall back to the production .env
  const finalPath = fs.existsSync(envPath) ? envPath : basePath;

  const fileEnv = dotenv.config({ path: finalPath }).parsed;

  const envKeys = Object.keys(fileEnv).reduce((prev,next)=>{
    prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
    return prev;
  }, {});

  return {
    entry:{
      index: './src/index.js',
      estatesManager: './src/EstatesManager/containers/Manager.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    optimization: {
      minimizer: [
        new TerserPlugin({}), 
        new OptimizeCSSAssetsPlugin({})
      ]
      ,
      splitChunks: {
        cacheGroups: {
          commons: {
            chunks: "initial",
            minChunks: 2,
            maxInitialRequests: 5,
            minSize: 0
          },
          vendor: {
            test: /node_modules/,
            chunks: "initial", 
            name: "vendor",
            priority: 10, 
            enforce: true
          }
        }
      }
    },
    // optimization: {
    //   splitChunks: {
    //     cacheGroups: {
    //       commons: {
    //         chunks: "initial",
    //         minChunks: 2,
    //         maxInitialRequests: 5,
    //         minSize: 0
    //       },
    //       vendor: {
    //         test: /node_modules/,
    //         chunks: "initial", 
    //         name: "vendor",
    //         priority: 10, 
    //         enforce: true
    //       }
    //     }
    //   }
    // },
    devServer: {
      port: 5031
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader"
            }
          ]
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader'
          ]
        }, 
        {
          test: /\.scss$/,
          use: [
            'style-loader', 
            'css-loader',
            'sass-loader'
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: "./src/index.html",
        filename: "./index.html"
      }),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: 'brand.css'

      }),
      new webpack.DefinePlugin(envKeys),
      // new webpack.optimize.DedupePlugin(), //dedupe similar code 
      // new webpack.optimize.UglifyJsPlugin(), //minify everything
      // new webpack.optimize.AggressiveMergingPlugin()//Merge chunks 
    ]
  }
}