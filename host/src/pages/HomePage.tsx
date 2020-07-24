import React, { CSSProperties } from "react";

const style: CSSProperties = {
    height: "100vh",
    backgroundColor: "#673ab7",
    color: "white",
    padding: 12,
    boxSizing: "border-box",
};

const HomePage = ({ configuration }) => (
    <div style={style}>
        <h1>Home Page</h1>
        <p>Provided by host app</p>
        <p>Injected environment: {JSON.stringify(configuration)}</p>
    </div>
);

export default HomePage;
