const path = require('path');

module.exports = {
  entry: {
    'app': path.resolve('./src/index.tsx')
  },
  output: {
    path: path.join(process.cwd(), '/dist'),
    filename: 'js/[name].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.jsx', '.js', '.json']
  },
  module: {
    rules: [
      {
        test: /.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          compilerOptions: {
            module: 'es2015'
          }
        }
      },
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
            ],
            plugins: [
              '@babel/plugin-transform-runtime', 
            ]
          }
        }
      },
      {
        test: /.mp4$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          publicPath: '../',
          name: 'assets/[name]-[hash:7].[ext]',
        }
      },

    ]
  },


}