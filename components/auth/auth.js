
import { state } from "../../utils/state";
import { Router } from "next/router";

// export const getAuthHeader = () => {
//     return {headers: {Authorization: `Bearer ${getCookie('token')}`}}
// }

// export const getCookie = (key) => {
//     if (process.browser) {
//         return localStorage.getItem(key);
//     }
// }

export const authenticate = (data, next) => {
    setLocalStorage("user", data.user);
    next();
}

export const setLocalStorage = (key, value) => {
    if (typeof window !== "undefined") {
        localStorage.setItem(key, JSON.stringify(value));
    }
}

export const removeLocalStorage = (key) => {
    if (typeof window !== "undefined") {
        localStorage.removeItem(key);
    }
}

export const signout = (next) => {
    removeLocalStorage("token");
}

export const forceLogout = () => {
    // localStorage.removeItem("islogged");
    // state.islogged = false;
    // state.user = null;
    Router.push("/");
}