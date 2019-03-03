// require('dotenv').config();

const { EnvironmentPlugin } = require('webpack');

module.exports = {
  use: [
    [
      '@neutrinojs/react',
      {
        html: {
          title: 'insomniabox'
        }
      }
    ],
    '@neutrinojs/jest',
    (neutrino) => {
      neutrino.config
        .plugin('env')
        .use(EnvironmentPlugin, [{
          API_BASE_URL: 'http://localhost:3000',
        }]);
    }  ]
};
