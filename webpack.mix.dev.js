
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isHot = process.argv.includes('--hot');

module.exports = function (_, config){
  if (! isHot) return {};
  config.module.rules.push([
    {
      test: /\.[jt]sx?$/,
      exclude: /node_modules/,
      use: [
        {
          loader: require.resolve('babel-loader'),
          options: {
            // ... other options
            plugins: [
              require.resolve('react-refresh/babel')
            ],
          },
        },
      ],
    }
  ])
  config.plugins.push([
    new ReactRefreshWebpackPlugin()

  ])
  return config
}
