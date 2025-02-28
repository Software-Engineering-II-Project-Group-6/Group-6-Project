const path = require('path');

module.exports = {
  entry: './public/AI_Chat.jsx',
  output: {
    filename: 'AI_Chat.bundle.jsx',
    path: path.resolve(__dirname, 'public/dist'),
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
