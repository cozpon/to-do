const atImport = require('postcss-import');
const customProperties = require('postcss-custom-properties');
const customMedia = require('postcss-custom-media');
const autoPrefixer = require('autoprefixer');

module.exports = {
  loader: 'postcss-loader',
  options: {
    plugins() {
      return [
        atImport,
        customProperties,
        customMedia,
        autoPrefixer,
      ];
    },
  },
};