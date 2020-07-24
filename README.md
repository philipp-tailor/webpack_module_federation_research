# Webpack 5 Module Federation Research

Example usage of module federation, which is in beta in webpack 5 as of 2020-07-24.

Further explanations can be found in [this blog post](https://blog.schneiders.space/post/webpack-module-federation).

## Repository description

There's two apps, `host` and `settings` in folders of the same name.

Both apps import each other's exposed routes to render a single UI to the user that contains the combined set of routes. Accessing `/` renders `host/src/pages/HomePage.tsx`, `/settings` will render `settings/src/pages/SettingsPage.tsx`. While both apps are depending on each other, `host` is considered the master application, as it exposes shared components (like `host/src/components/Navigation.tsx` or `host/src/utils/cookie.ts`).

Routing and passing of application configuration occurs in the respective `App.tsx`. The initial plan was to use shared react context to pass global state from the rendered app to remote apps, but issues (#1, #7) made it simpler to pass shared data as props to rendered components.

`settings/src/pages/SettingsPage` allows to set the `configuration` cookie, which can override the default configuration defined in `host/src/config.ts`. The cookie based configuration can also be used to define the applications' hosts with the properties `hostAppHost` and `settingsAppHost`. This allows to easily mix & match different federations in any deployment, simplifying local development (only spin up the application you are working on and use the current production application code for the rest) and E2E testing.

## Module federation specific code

The `webpack.config.js` files contain a `output.publicPath` and use the `ModuleFederationPlugin`. The application's name is defined with the `name` property; remote applications are listed in the `remotes` object; exposed modules in the `exposes` object; and shared dependencies in `shared`. To resolve imports to remote applications, `remoteEntry.js` of all remote applications is loaded from `index.html`. The initialisation process of federated applications requires the combination of a combination of `index.js` and `bootstrap.js`.

## Used resources

-   https://github.com/module-federation
-   https://github.com/webpack/webpack/issues/10352
-   https://module-federation.github.io
-   https://dev.to/marais/webpack-5-and-module-federation-4j1i
-   https://webpack.js.org/concepts/module-federation/
-   https://www.youtube.com/watch?v=3c-RFpaiUT8&list=PLWSiF9YHHK-DqsFHGYbeAMwbd9xcZbEWJ
