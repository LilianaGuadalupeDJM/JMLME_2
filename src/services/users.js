import { jwtDecode } from "jwt-decode";
import { ENV } from "../utils/constants";
import { authFetch } from "../utils/authFetch";

const getMe = async (token) => {

    try{
        const decoded = jwtDecode(token);
        console.log('decoded: ', decoded)
        const userId = decoded.id;
        console.log('id: ',userId)
        const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USERS}/${userId}`
        const response = await authFetch(url)
        console.log('url: ', url)
        return await response.json();
        console.log('response: ',response)
        
    } catch (error){
        console.log(error)
    }
}
const changePassword = async (token, currentPassword, newPassword) => {
    try {
        const decoded = jwtDecode(token);
        const userId = decoded.id;
        const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USERS}/change-password/${userId}`;


        const response = await authFetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ currentPassword, newPassword }),
        });

        if (!response.ok) {

            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error en changePassword', error);
        throw error;
    }
}

export const usersService = {
    getMe,
    changePassword,
    
}