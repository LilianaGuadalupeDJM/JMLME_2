import { authFetch } from "../utils/authFetch";
import { ENV } from "../utils/constants";
import axios from 'axios';

// Obtener todas las ofertas
const getAllOferta = async (token) => {
    try {
        const url = `${ENV.API_URL}/${ENV.ENDPOINTS.OFERTAS}`;
        const response = await authFetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        //.error('Error al traer las ofertas', error);
        throw error;
    }
};

// Actualizar una oferta existente
const updateOferta = async (token, ofertaId, data) => {
    try {
        const url = `${ENV.API_URL}/${ENV.ENDPOINTS.OFERTAS}/${ofertaId}`;
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
        //.error('Error al actualizar la oferta', error);
        throw error;
    }
};

// Eliminar una oferta
const deleteOferta = async (token, ofertaId) => {
    try {
        const url = `${ENV.API_URL}/${ENV.ENDPOINTS.OFERTAS}/${ofertaId}`;
        const response = await authFetch(url, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        //.error('Error al eliminar oferta', error);
        throw error;
    }
};

const createOferta = async (token, data) => {
    try {
        const url = `${ENV.API_URL}/${ENV.ENDPOINTS.OFERTAS}`;
        const response = await authFetch(url, {
            method: 'POST',
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
        //.error('Error al crear oferta', error);
        throw error;
    }
};

// Obtener una oferta por ID
const getOfertaById = async (token, ofertaId) => {
    try {
        const url = `${ENV.API_URL}/${ENV.ENDPOINTS.OFERTAS}/${ofertaId}`;
        const response = await authFetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        //.error(`Error al obtener la oferta con ID ${ofertaId}`, error);
        throw error;
    }
};
export const ofertaService = {
    getAllOferta,
    updateOferta,
    deleteOferta,
    createOferta,
    getOfertaById,
};
