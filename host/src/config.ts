import { CONFIG_COOKIE_NAME, isCookiePresent, getCookie } from "./utils/cookie.ts";

export type AppConfig = {
    aRandomConfigKey: boolean;
    apiHost: string;
};

// Map the global process.env to a more convenient object which can be ES6-imported in other places.
const config: AppConfig = {
    aRandomConfigKey: true, //TODO: hydrate from .env, possibly use a combination of https://www.npmjs.com/package/dotenv and https://www.npmjs.com/package/env-var
    apiHost: "https://staging.myapi.com",
};

const getConfig = (): AppConfig => {
    if (isCookiePresent(CONFIG_COOKIE_NAME)) {
        try {
            const cookieConfig = JSON.parse(getCookie(CONFIG_COOKIE_NAME));

            console.info(`default configuration overridden by ${CONFIG_COOKIE_NAME} cookie:`, cookieConfig);

            return { ...config, ...cookieConfig };
        } catch (e) {
            return config;
        }
    }
    return config;
};

export default getConfig();
