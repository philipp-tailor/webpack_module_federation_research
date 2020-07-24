import React, { CSSProperties } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import ErrorBoundary from "./components/ErrorBoundary.tsx";
import localRoutes from "./routes.ts";

import appConfiguration from "hostApp/config";
import Navigation from "hostApp/Navigation";
import remoteRoutes from "hostApp/routes";

const routes = [...localRoutes, ...remoteRoutes];

const App = ({ flags: featureFlags }) => {
    const configuration = { ...appConfiguration, ...featureFlags };
    const mainStyle: CSSProperties = { flexGrow: 1, height: "100vh", overflowY: "auto" };

    return (
        <BrowserRouter>
            <div style={{ display: "flex" }}>
                <Navigation routes={routes} configuration={configuration} />
                <main style={mainStyle}>
                    <Switch>
                        {routes.map((route) => (
                            <Route
                                key={route.path}
                                path={route.path}
                                exact={route.exact}
                                render={() => {
                                    const RouteContent = route.component;
                                    return (
                                        <ErrorBoundary>
                                            <React.Suspense fallback={<div>Loading...</div>}>
                                                <RouteContent configuration={configuration} />
                                            </React.Suspense>
                                        </ErrorBoundary>
                                    );
                                }}
                            />
                        ))}
                    </Switch>
                </main>
            </div>
        </BrowserRouter>
    );
};

export default App;
