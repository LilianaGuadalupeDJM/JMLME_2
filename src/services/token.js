import { ENV } from "../utils/constants";

//Funcion para almacenar el token en local storage
const setToken = (token) => {
    localStorage.setItem(ENV.STORAGE.TOKEN, token);
}

// Funcion para obtener el token de local storage
const getToken = () => {
    return localStorage.getItem(ENV.STORAGE.TOKEN);
}

// Funcion paar eliminar el token de local storage
const removeToken = () => {
    localStorage.removeItem(ENV.STORAGE.TOKEN);
}
export const storageController ={
    setToken,
    getToken,
    removeToken
}