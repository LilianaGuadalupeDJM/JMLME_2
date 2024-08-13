import axios from 'axios';
import { notification } from 'antd';
import { ENV } from "../utils/constants";

export const getProfesores = async () => {
    try {
        const response = await axios.get(`${ENV.API_URL}/${ENV.ENDPOINTS.PROFESORES}`);
        //.log("url profesores: ", response);
        return response.data;
    } catch (error) {
        //.error('error al obtener profesores: ', error);
        throw error;
    }
}

export const getProfesor = async (ProfesorId) => {
    try {
        const response = await axios.get(`${ENV.API_URL}/${ENV.ENDPOINTS.PROFESORES}/${ProfesorId}`);
        //.log("url profesor: ", response);
        return response.data;
    } catch (error) {
        //.error('error al obtener profesor: ', error);
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

        //.log("actualizar profesor: ", response);
        return response.data;
    } catch (error) {
        //.error('error al editar profesor: ', error);
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

        //.log("add profesor: ", response);
        return response.data;
    } catch (error) {
        //.error('Lo siento no se agrego el usuario: ', error);
        throw error;
    }
}

export const DropProfesor = async (ProfesorId) => {
    try {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este profesor?");
        if (!confirmDelete) {
            return; // Si el usuario cancela, no hacer nada
        }

        const response = await axios.delete(`${ENV.API_URL}/${ENV.ENDPOINTS.PROFESORES}/${ProfesorId}`);
        if (response.status === 200) {
            //.log("Profesor eliminado correctamente: ", response);
            notification.success({
                message: 'Profesor eliminado',
                description: 'El profesor ha sido eliminado correctamente.',
            });
            return response.data;
        } else {
            throw new Error('No se pudo eliminar el profesor');
        }
    } catch (error) {
        //.error('Error al eliminar profesor: ', error);
        notification.error({
            message: 'Error al eliminar profesor',
            description: 'Hubo un problema al eliminar el profesor. Por favor, intenta nuevamente.',
        });
        throw error;
    }
}
