import axios from 'axios';
import { ENV } from "../utils/constants";

// Obtener todos los cursos con información del profesor
export const getCursos = async () => {
    try {
        const response = await axios.get(`${ENV.API_URL}/${ENV.ENDPOINTS.CURSOS}?populate=profesor`);
        return response.data;
    } catch (error) {
        //.error('Error al obtener cursos: ', error);
        throw error;
    }
}

// Obtener un curso por ID con información del profesor
export const getCurso = async (cursoId) => {
    try {
        const response = await axios.get(`${ENV.API_URL}/${ENV.ENDPOINTS.CURSOS}/${cursoId}?populate=profesor`);
        return response.data;
    } catch (error) {
        //.error('Error al obtener curso: ', error);
        throw error;
    }
}

// Agregar un nuevo curso
export const addCurso = async (data, token) => {
    try {
        const response = await axios.post(
            `${ENV.API_URL}/${ENV.ENDPOINTS.CURSOS}`,
            data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        //.error('Error al agregar curso: ', error);
        throw error;
    }
}

// Editar un curso existente
export const editCurso = async (cursoId, data, token) => {
    try {
        const response = await axios.put(
            `${ENV.API_URL}/${ENV.ENDPOINTS.CURSOS}/${cursoId}`,
            data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        //.error('Error al editar curso: ', error);
        throw error;
    }
}

// Eliminar un curso existente
export const deleteCurso = async (cursoId, token) => {
    try {
        const response = await axios.delete(
            `${ENV.API_URL}/${ENV.ENDPOINTS.CURSOS}/${cursoId}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        //.error('Error al eliminar curso: ', error);
        throw error;
    }
}

// Obtener la lista de profesores
export const getProfesores = async () => {
    try {
        const response = await axios.get(`${ENV.API_URL}/${ENV.ENDPOINTS.PROFESORES}`);
        return response.data;
    } catch (error) {
        //.error('Error al obtener profesores: ', error);
        throw error;
    }
}

export const cursosService = {
    getCursos,
    getCurso,
    addCurso,
    editCurso,
    deleteCurso,
    getProfesores
};
