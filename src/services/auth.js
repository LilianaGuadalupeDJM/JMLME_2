import axios from "axios";
import { ENV } from "../utils/constants";

const register = async (username, email, password) => {
    return axios.post(`${ENV.API_URL}/${ENV.ENDPOINTS.REGISTER}`,{
        username,
        email,
        password,
        roles: ['user'],
    });
};

const loginF = async (email, password) => {
    return axios.post(`${ENV.API_URL}/${ENV.ENDPOINTS.LOGIN}`,{
        email,
        password,
    });
};

const updateUser = async (token, userId, username, email) => {
    return axios.put(`${ENV.API_URL}/${ENV.ENDPOINTS.USERS}/${userId}`, {
        username,
        email,
    }, {
        headers: {
            "x-access-token": `${token}`
        }
    });
};

export default {
    register,
    loginF,
    updateUser,
};