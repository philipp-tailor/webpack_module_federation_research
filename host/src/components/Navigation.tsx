import React, { CSSProperties } from "react";
import { Link } from "react-router-dom";

type Route = {
    path: string;
    name: string;
};

const style: CSSProperties = {
    height: "100vh",
    overflowY: "auto",
    width: "30vw",
    maxWidth: "20rem",
    padding: 12,
    borderRight: "1px solid #e9e9eb",
};

const Navigation = ({ routes, configuration }) => {
    return (
        <nav style={style}>
            {routes.map((route: Route) => (
                <React.Fragment key={route.path}>
                    <Link to={route.path}>{route.name}</Link>
                    <br />
                </React.Fragment>
            ))}
            <p>A random configuration is {configuration.aRandomConfigKey ? "enabled" : "disabled"}</p>
        </nav>
    );
};

Navigation.defaultProps = {
    routes: [],
};

export default Navigation;
