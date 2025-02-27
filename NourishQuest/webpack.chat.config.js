const path = require('path');

module.exports = {
  entry: './public/js/aiChat.js',
  output: {
    filename: 'aiChat.bundle.js',
    path: path.resolve(__dirname, 'public/js/dist'),
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  }
};
