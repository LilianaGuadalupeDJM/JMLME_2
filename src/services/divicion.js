// src/services/divicion.js
import axios from 'axios';
import { ENV } from "../utils/constants";
import { storageController } from './token';

// Obtener todas las divisiones
export const getDivisions = async () => {
    try {
        const response = await axios.get(`${ENV.API_URL}/${ENV.ENDPOINTS.DIVISION}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener divisiones: ', error);
        throw error;
    }
};

// Obtener una división por su ID
export const getDivision = async (divisionId) => {
    try {
        const response = await axios.get(`${ENV.API_URL}/${ENV.ENDPOINTS.DIVISION}/${divisionId}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener división: ', error);
        throw error;
    }
};

// Crear una nueva división
export const addDivision = async (data) => {
    const tokenAccess = storageController.getToken();
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.DIVISION}`;

    try {
        const response = await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': tokenAccess,
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error al agregar división: ', error);
        throw error;
    }
};

// Actualizar una división por su ID
export const editDivision = async (divisionId, data) => {
    const token = storageController.getToken();
    try {
        const response = await axios.put(`${ENV.API_URL}/${ENV.ENDPOINTS.DIVISION}/${divisionId}`, data, {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token,
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error al editar división: ', error);
        throw error;
    }
};

// Eliminar una división por su ID
export const deleteDivision = async (divisionId) => {
    const tokenAccess = storageController.getToken();
    try {
        const response = await axios.delete(`${ENV.API_URL}/${ENV.ENDPOINTS.DIVISION}/${divisionId}`, {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': tokenAccess,
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error al eliminar división: ', error);
        throw error;
    }
};

// Obtener todas las ofertas educativas
export const getAllOfertas = async () => {
    const token = storageController.getToken();
    try {
        const response = await axios.get(`${ENV.API_URL}/${ENV.ENDPOINTS.OFERTAS}`, {
            headers: {
                'x-access-token': token,
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error al obtener ofertas educativas:', error);
        throw error;
    }
};
