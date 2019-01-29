const path = require("path");

const externals = _externals();
console.log(__dirname);

let common_config = {
  node: {
    __dirname: true
  },
  mode: process.env.ENV || "development",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: [
          /node_modules/,
           path.resolve(__dirname, "src/ui")
        ]
      }
    ]
  },
  resolve: {
    extensions: [ ".tsx", ".ts", ".js" ]
  },
};

module.exports = [
  Object.assign({}, common_config, {
    target: "electron-main",
    entry: {
      main: "./src/main/index.ts",
    },
    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "./dist/main/")
    },
    externals: externals
  }),
  Object.assign({}, common_config, {
    target: "electron-renderer",
    entry: {
      renderer: "./src/renderer/index.ts",
    },
    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "./dist/renderer/")
    }
  })
]

function _externals() {
  let manifest = require("./package.json");
  let dependencies = manifest.dependencies;
  let externals = {};
  for (let p in dependencies) {
    externals[p] = "commonjs " + p;
  }
  return externals;
}
