const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack").container.ModuleFederationPlugin;
const path = require("path");
const deps = require("./package.json").dependencies;

const PRODUCTION = "production";
const DEVELOPMENT = "development";

const mode = process.env.NODE_ENV === PRODUCTION ? PRODUCTION : DEVELOPMENT;
const isDevelopmentEnv = mode === DEVELOPMENT;
const port = process.env.PORT || 3004;

module.exports = {
    entry: "./src/index",

    mode,

    devServer: {
        contentBase: path.join(__dirname, "public"),
        port,
        historyApiFallback: true,
        quiet: true,
        watchContentBase: true,
    },

    output: {
        publicPath: `http://localhost:${port}/`,
    },

    devtool: isDevelopmentEnv ? "cheap-module-source-map" : "source-map",

    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                options: {
                    presets: ["@babel/preset-react", "@babel/preset-typescript"],
                },
            },
            {
                test: /\.(js|jsx)$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                options: {
                    presets: ["@babel/preset-react"],
                },
            },
            {
                loader: "file-loader",
                // Exclude `js` files to keep "css" loader working as it injects
                // its runtime that would otherwise be processed through "file" loader.
                // Also exclude `html` and `json` extensions so they get processed
                // by webpacks internal loaders.
                exclude: [/\.(js|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
                options: {
                    name: "static/media/[name].[hash:8].[ext]",
                },
            },
        ],
    },

    plugins: [
        new ModuleFederationPlugin({
            name: "settingsApp",
            // library: { type: "var", name: "settingsApp" },
            filename: "remoteEntry.js",
            remotes: {
                hostApp: "hostApp@http://localhost:3003/remoteEntry.js",
            },
            exposes: {
                "./routes": "./src/routes.ts",
            },
            shared: {
                ...deps,
                react: {
                    eager: true,
                    singleton: true,
                    requiredVersion: deps.react,
                },
                "react-dom": {
                    eager: true,
                    singleton: true,
                    requiredVersion: deps["react-dom"],
                },
            },
        }),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
    ],
};
