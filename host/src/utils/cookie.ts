export const CONFIG_COOKIE_NAME = "configuration";

type CookieObject = {
    [key: string]: string;
};

export const getCookie = (name: string): string | undefined => {
    if (typeof window !== "undefined") {
        const cookie = document.cookie.split(";").find((item) => item.trim().startsWith(name + "="));
        if (cookie) {
            return decodeURIComponent(cookie.split("=")[1]);
        }
    }
};

export const isCookiePresent = (name: string): boolean => Boolean(getCookie(name));

export const setCookie = (name: string, value: CookieObject) => {
    console.info(`set cookie ${name}:`, value);

    document.cookie = `${name}=${encodeURIComponent(JSON.stringify(value))}`;
};
