const path = require('path')
  , webpack = require('webpack')
  , ExtractTextPlugin = require('extract-text-webpack-plugin')

const cssLoader = ExtractTextPlugin.extract({ use: 'css-loader' })

module.exports = {
  entry:{
    bundle: './src/index.js',
    runtime: ['preact'],
    vendor: [
      'rxjs/Subject', 'rxjs/Observable', 'rxjs/add/observable/from', 'rxjs/add/observable/fromPromise',
      'rxjs/add/operator/mergeMap', 'rxjs/add/operator/map', 'rxjs/add/operator/startWith', 'rxjs/add/operator/scan'
    ]
  },

  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: '[name].js'
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }, {
        test: /\.css$/,
        loader: cssLoader
      }, {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },

  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['.js', '.jsx'],
    alias: {
    }
  },

  devServer: {
    historyApiFallback: true,
    port: '8000',
    noInfo: true
  },

  devtool: '#eval-source-map',

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin("css/app.css"),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'runtime'],
      warnings: false
    })
  ]
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
