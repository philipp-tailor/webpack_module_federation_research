import React, { CSSProperties, useState } from "react";

import { CONFIG_COOKIE_NAME, getCookie, setCookie } from "hostApp/cookie";

const pageStyle: CSSProperties = {
    height: "100vh",
    backgroundColor: "#3f51b5",
    color: "white",
    padding: 12,
    boxSizing: "border-box",
};

const inputStyle: CSSProperties = {
    width: "20rem",
    padding: "0.5rem",
    marginTop: "0.5rem",
};

const SettingsPage = ({ configuration }) => {
    const [configString, setConfigString] = useState(getCookie(CONFIG_COOKIE_NAME) || "");

    const onConfigStringChange = (event) => {
        setConfigString(event.target.value);

        try {
            const newConfigurationCookieValue = JSON.parse(event.target.value);
            setCookie(CONFIG_COOKIE_NAME, newConfigurationCookieValue);
        } catch (_) {}
    };

    return (
        <div style={pageStyle}>
            <h1>Settings Page</h1>
            <p>Page provided by settings app</p>
            <p>Injected configuration: {JSON.stringify(configuration)}</p>
            <p>
                <label>
                    Override configuration for next load by changing the value of {CONFIG_COOKIE_NAME} cookie:
                </label>
                <br />
                <textarea value={configString} onChange={onConfigStringChange} style={inputStyle} />
            </p>
        </div>
    );
};
export default SettingsPage;
