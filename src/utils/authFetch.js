import { storageController } from "../services/token"
import { tokenExpired } from "./tokenExpired"

export const authFetch = async (url, params) => {
    
    const token = await storageController.getToken()
    
    const logout = () => {
        storageController.removeToken()
    }

    if (!token){
        logout();
        throw new Error('No existe el token');
    }else{
        if(tokenExpired(token)){
            logout();
            throw new Error('token expirado');
        }else{
            const options = {
                ...params,
                headers: {
                    ...params?.headers,
                    "x-access-token": `${token}`
                }
            };
            try {
                const response = await fetch(url, options);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response;
            } catch (error) {
                //.error('Fetch error:', error);
                throw new Error("Network error or invalid response");
            }
        }
    }
}