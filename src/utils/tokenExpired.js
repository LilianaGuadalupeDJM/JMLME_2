import { jwtDecode } from "jwt-decode";

export const tokenExpired = (token) => {
    const tokenDecoded = jwtDecode(token)
    ////.log('Token decoded', tokenDecoded)
    const expired = tokenDecoded.exp * 1000;
    const time = new Date().getTime()
    if(time > expired) {
        return true
    }
    return false
 }