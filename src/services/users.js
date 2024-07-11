

import { jwtDecode } from "jwt-decode";
import { ENV } from "../utils/constants";
import { authFetch } from "../utils/authFetch";
import axios from 'axios';

const getMe = async (token) => {
    try {
        const decoded = jwtDecode(token);
        console.log('decoded: ', decoded);
        const userId = decoded.id;
        console.log('id: ', userId);
        const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USERS}/${userId}`;
        const response = await authFetch(url);
        console.log('url: ', url);
        return await response.json();
    } catch (error) {
        console.log('Error al obtener el usuario actual:', error);
        throw error;
    }
};

const changePassword = async (token, currentPassword, newPassword) => {
    try {
        const decoded = jwtDecode(token);
        const userId = decoded.id;
        const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USERS}/change-password/${userId}`;

        const response = await authFetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
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
};

export const getAllUsers = async (token) => {
    try {
        const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USERS}`;
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;  // Devuelve los datos de usuarios obtenidos desde el backend
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        throw error;
    }
};

const createUser = async (token, userData) => {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USERS}`;
    console.log(userData)
    const response = await axios.post(url, userData, {
        headers: {
            'x-access-token': token
        }
    });
    return response.data;
};



export const getRoles = async () => {
    try {
        const response = await axios.get(`${ENV.API_URL}/${ENV.ENDPOINTS.ROLES}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener las roles:', error);
        throw error;
    }
};


// Exporta todas las funciones útiles como un objeto
export const usersService = {
    getMe,
    changePassword,
    getAllUsers,
    getRoles,
    createUser, 
};

