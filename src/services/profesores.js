import axios from 'axios';
import { ENV } from "../utils/constants";

export const getProfesores = async () => {
    try {
        const response = await axios.get(`${ENV.API_URL}/${ENV.ENDPOINTS.PROFESORES}`);
        console.log("url profesores: ", response);
        return response.data;
    } catch (error) {
        console.error('error al obtener profesores: ', error);
        throw error;
    }
}

export const getProfesor = async (ProfesorId) => {
    try {
        const response = await axios.get(`${ENV.API_URL}/${ENV.ENDPOINTS.PROFESORES}/${ProfesorId}`);
        console.log("url profesor: ", response);
        return response.data;
    } catch (error) {
        console.error('error al obtener profesor: ', error);
        throw error;
    }
}

export const EditProfesor = async (ProfesorId, nombre, apellidos, numeroEmpleado, correo, fechaNacimiento) => {
    try {
        const response = await axios.put(`${ENV.API_URL}/${ENV.ENDPOINTS.PROFESORES}/${ProfesorId}`, {
            nombre,
            apellidos,
            numeroEmpleado,
            correo,
            fechaNacimiento
        });

        console.log("actualizar profesor: ", response);
        return response.data;
    } catch (error) {
        console.error('error al editar profesor: ', error);
        throw error;
    }
}

export const AddProfesor = async (nombre, apellidos, numeroEmpleado, correo, fechaNacimiento) => {
    try {
        const response = await axios.post(`${ENV.API_URL}/${ENV.ENDPOINTS.PROFESORES}`, {
            nombre,
            apellidos,
            numeroEmpleado,
            correo,
            fechaNacimiento
        });

        console.log("add profesor: ", response);
        return response.data;
    } catch (error) {
        console.error('Lo siento no se agrego el usuario: ', error);
        throw error;
    }
}

export const DropProfesor = async (ProfesorId) => {
    try {
        const response = await axios.delete(`${ENV.API_URL}/${ENV.ENDPOINTS.PROFESORES}/${ProfesorId}`);
        console.log("borrar profesor profesor: ", response);
        return response.data;

    } catch (error) {
        console.error('error al agregar profesor: ', error);
        throw error;
    }
}