import { decode as atob } from "base-64";

export const parseJwt = (token: string): any => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/, '/');
    var jsonPayload = decodeURIComponent(
        atob(base64)
            .split('')
            .map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16).slice(-2));
            })
            .join('')
    );
    return JSON.parse(jsonPayload);
}

export const isTokenExpired = (token: string): any => {
    const decodedJwt = parseJwt(token);
    if(decodedJwt.exp * 1000 < Date.now()){
        return true;
    }
    return false
}