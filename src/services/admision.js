import axios from 'axios';
import { ENV } from "../utils/constants";
import { storageController } from './token';

// Obtener todas las admisiones
export const getAdmisiones = async () => {
    try {
        const response = await axios.get(`${ENV.API_URL}/${ENV.ENDPOINTS.ADMISIONES}`);
        console.log("url admisiones: ", response);
        return response.data;
    } catch (error) {
        console.error('Error al obtener admisiones: ', error);
        throw error;
    }
};

// Obtener una admisión por su ID
export const getAdmision = async (admisionId) => {
    try {
        const response = await axios.get(`${ENV.API_URL}/${ENV.ENDPOINTS.ADMISIONES}/${admisionId}`);
        console.log("url admision: ", response);
        return response.data;
    } catch (error) {
        console.error('Error al obtener admisión: ', error);
        throw error;
    }
};

// Crear una nueva admisión
export const addAdmision = async (nombre, activo) => {
    
    // Traer el token de localstorage
    const tokenAccess = storageController.getToken()
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ADMISIONES}` // URL de la api
    const data = {
        nombre,
        activo
    }

    try {
        const response = await axios.post(url, data , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': tokenAccess,
                
            }
        });

        console.log("add admision: ", response);
        return response.data;
    } catch (error) {
        console.error('Error al agregar admisión: ', error);
        throw error;
    }
};

// Actualizar una admisión por su ID
export const editAdmision = async (admisionId, nombre, activo) => {
    const token = storageController.getToken()
    const data = {
        nombre, activo
    }
    try {
        const response = await axios.put(`${ENV.API_URL}/${ENV.ENDPOINTS.ADMISIONES}/${admisionId}`, data,{
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token,
                
            }
        });
        console.log("actualizar admision: ", response);
        return response.data;
    } catch (error) {
        console.error('Error al editar admisión: ', error);
        throw error;
    }
};

// Eliminar una admisión por su ID
export const deleteAdmision = async (admisionId) => {
    const tokenAccess = storageController.getToken()
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ADMISIONES}` // URL de la api
    
    try {
        const response = await axios.delete(`${ENV.API_URL}/${ENV.ENDPOINTS.ADMISIONES}/${admisionId}`, {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': tokenAccess,
                
            }
        });
        console.log("borrar admision: ", response);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar admisión: ', error);
        throw error;
        //cambio
    }
};


