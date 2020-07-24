import React from "react";

const HomePage = React.lazy(() => import("./pages/HomePage.tsx"));

const routes = [
    {
        name: "Home",
        path: "/",
        component: HomePage,
        exact: true,
    },
];

export default routes;
