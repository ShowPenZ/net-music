const path = require('path');
const CracoLessPlugin = require('craco-less');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const LodashWebpackPlugin = require('lodash-webpack-plugin');

const analyzerMode = process.env.REACT_APP_INTERACTIVE_ANALYZE ? 'server' : 'json';

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  webpack: {
    alias: {
      '@': path.resolve('src'),
    },
    plugins: [
      new BundleAnalyzerPlugin({ analyzerMode }),
      new LodashWebpackPlugin({
        collections: true,
        paths: true,
      }),
      new webpack.DefinePlugin({
        // Definitions...
        BASE_HOST: true,
      }),
    ],
  },
  babel: {
    presets: ['@babel/preset-react'],
    plugins: [
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }, 'antd'],
    ],
  },
};
