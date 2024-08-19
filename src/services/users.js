import { jwtDecode } from "jwt-decode";
import { ENV } from "../utils/constants";
import { authFetch } from "../utils/authFetch";
import axios from 'axios';


const getMe = async (token) => {

    try{
        const decoded = jwtDecode(token);
        //.log('decoded: ', decoded)
        const userId = decoded.id;
        //.log('id: ',userId)
        const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USERS}/${userId}`
        const response = await authFetch(url)
        //.log('url: ', url)
        return await response.json();
        //.log('response: ',response)
        
    } catch (error){
        //.log(error)
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
        //.error('Error en changePassword', error);
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
        //.error('Error al traer los usuarios', error); // Corregido aquí
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
        //.error('Error al actualizar el usuario', error);
        throw error;
    }
};

export const DropUsuario = async (UsuarioId) => {
    try {
        const response = await axios.delete(`${ENV.API_URL}/${ENV.ENDPOINTS.USERS}/${UsuarioId}`);
        //.log("usuario borrasdo: ", response);
        return response.data;

    } catch (error) {
        //.error('error al borrar usuario: ', error);
        throw error;
    }
}
 export const createUser = async (token, userData ) => {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USERS}`;
    return authFetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userData)
    });
}
// Obtener todos los roles
export const getRoles = async () => {
    try {
        const response = await axios.get(`${ENV.API_URL}/${ENV.ENDPOINTS.ROLES}`);
        //.log("url roles: ", response);
        return response.data;
    } catch (error) {
        //.error('error al obtener roles: ', error);
        throw error;
    }
}




export const usersService = {
    getMe,
    changePassword,
    getAllUsers,
    updateUser, 
    createUser,
    getRoles,
};