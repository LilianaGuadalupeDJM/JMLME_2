import axios from 'axios';
import { notification } from 'antd';
import { ENV } from "../utils/constants";

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

// Obtener un rol por ID
export const getRol = async (RolId) => {
    try {
        const response = await axios.get(`${ENV.API_URL}/${ENV.ENDPOINTS.ROLES}/${RolId}`);
        //.log("url rol: ", response);
        return response.data;
    } catch (error) {
        //.error('error al obtener rol: ', error);
        throw error;
    }
}

// Editar un rol existente
export const editRol = async (RolId, data, token) => {
    try {
        const response = await axios.put(
            `${ENV.API_URL}/${ENV.ENDPOINTS.ROLES}/${RolId}`,
            data, // Cambiado de { name } a data
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            }
        );

        //.log("actualizar rol: ", response);
        return response.data;
    } catch (error) {
        //.error('error al editar rol: ', error);
        throw error;
    }
}


// Agregar un nuevo rol
export const addRol = async (name, token) => {
    try {
        const response = await axios.post(
            `${ENV.API_URL}/${ENV.ENDPOINTS.ROLES}`,
            { name },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            }
        );

        //.log("add rol: ", response);
        return response.data;
    } catch (error) {
        //.error('Lo siento no se agrego el rol: ', error);
        throw error;
    }
}


// Eliminar un rol existente
export const dropRol = async (token, RolId) => {
    try {
        

        const response = await axios.delete(
            `${ENV.API_URL}/${ENV.ENDPOINTS.ROLES}/${RolId}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            }
        );
        if (response.status === 200) {
            //.log("Rol eliminado correctamente: ", response);
            notification.success({
                message: 'Rol eliminado',
                description: 'El Rol ha sido eliminado correctamente.',
            });
            return response.data;
        } else {
            throw new Error('No se pudo eliminar el Rol');
        }
    } catch (error) {
        //.error('Error al eliminar Rol: ', error);
        notification.error({
            message: 'Error al eliminar Rol',
            description: 'Hubo un problema al eliminar el Rol. Por favor, intenta nuevamente.',
        });
        throw error;
    }
}

export const rolesService = {
    getRoles,
    getRol,
    editRol,
    addRol,
    dropRol
};
