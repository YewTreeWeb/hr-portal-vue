const path = require("path");

module.exports = {
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "scss",
      patterns: [
        path.resolve(__dirname, "./src/styles/helpers/_functions.scss"),
        path.resolve(__dirname, "./src/styles/helpers/_variables.scss"),
        path.resolve(__dirname, "./src/styles/helpers/_mixins.scss"),
      ],
    },
  },
};
