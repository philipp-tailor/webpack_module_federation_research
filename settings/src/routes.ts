import React from "react";

const SettingsPage = React.lazy(() => import("./pages/SettingsPage.tsx"));

const routes = [
    {
        name: "Settings",
        path: "/settings",
        component: SettingsPage,
    },
];

export default routes;
