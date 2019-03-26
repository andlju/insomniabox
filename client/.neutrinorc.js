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
          USE_FAKE: true
        }]);
    },
    ['@neutrinojs/style-loader', {
      // Override the default file extension of `.css` if needed
      test: /\.(css|sass|scss)$/,
      moduleTest: /\.module\.(css|sass|scss)$/,
      loaders: [
        // Define loaders as objects. Note: loaders must be specified in reverse order.
        // ie: for the loaders below the actual execution order would be:
        // input file -> sass-loader -> postcss-loader -> css-loader -> style-loader/mini-css-extract-plugin
        {
          loader: 'postcss-loader',
          options: {
            plugins: [require('autoprefixer')]
          }
        },
        {
          loader: 'sass-loader',
          useId: 'sass',
          /*options: {
            includePaths: ['absolute/path/a', 'absolute/path/b']
          }*/
        }
      ]
    }
   ],
  ]
};
