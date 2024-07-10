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
const getAllUsers = async (token) => {
    try {
        const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USERS}`;
        const response = await authFetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}` // Corregido aquí
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error al traer los usuarios', error); // Corregido aquí
        throw error;
    }
};

const updateUser = async (token, userId, data) => {
    try {
        const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USERS}/${userId}`;
        const response = await authFetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error al actualizar el usuario', error);
        throw error;
    }
};

export const usersService = {
    getMe,
    changePassword,
    getAllUsers,
    updateUser, 
};