// Webpack uses this to work with directories
const path = require('path');

// Needed to create separate css file
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// This is the main configuration object.
// Here, you write different options and tell Webpack what to do
module.exports = {

  // Path to your entry point. From this file Webpack will begin its work
  entry: {
    main: [
      './app/client/src/scss/main.scss', 
      './app/client/src/js/main.js'
    ],
  },
  
  // Path and filename of your result bundle.
  // Webpack will bundle all JavaScript into this file
  output: {
    filename: 'js/[name].js',
    path: path.resolve('app/client/dist'),
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve('app/client/src/js')],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        // Apply rule for .sass, .scss or .css files
        test: /\.(sa|sc|c)ss$/,

        // Set loaders to transform files.
        // Loaders are applying from right to left(!)
        // The first loader will be applied after others
        use: [
          {
            // After all CSS loaders, we use a plugin to do its work.
            // It gets all transformed CSS and extracts it into separate
            loader: MiniCssExtractPlugin.loader
          }, 
          {
            // This loader resolves url() and @imports inside CSS
            loader: "css-loader",
          },
          {
            // Then we apply postCSS fixes like autoprefixer and minifying
            loader: "postcss-loader"
          },
          {
            // First we transform SASS to standard CSS
            loader: "sass-loader",
            options: {
              implementation: require("sass")
            }
          }
        ]
      }
    ],  
  },

  plugins: [
    // Resulting css file
    new MiniCssExtractPlugin({
      filename: "css/[name].css"
    })
  ],

};