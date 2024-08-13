import React, {useState, useEffect, createContext} from "react";
import { storageController } from "../services/token";
import { usersService } from "../services/users";
import { tokenExpired } from "../utils/tokenExpired";


export const AuthContext = createContext();

export const AuthProvider = (props) => {
    const {children} = props;
    
    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getSession();
    }, [])

    
    const getSession = async () => {
        const token = await storageController.getToken();
       if(!token){
            logout();
            setLoading(false);
            return;
       }
       if(tokenExpired(token)){
            logout();
       }else{
            login(token);
       }
    }

    const login = async (token) => {
        try{
            //.log('Obteniendo...', token);
            await storageController.setToken(token);
            const response = await usersService.getMe(token);
            //.log('Usuario obtenido:', response);
            setUser(response);
            setLoading(false);
            //.log(false);
        } catch (error){
            //.error(error);
            setLoading(false);
        }
    }

    const updateUser = (key, value) => {
        setUser({
            ...user,
            [key]: value
        });
    };

    const logout = async () => {
        try {
            await storageController.removeToken();
            setUser(null);
            setLoading(false);
        } catch (error) {
            //.log(error);
            setLoading(false);
        }
    }

    const data = {
        user,
        login,
        logout,
        updateUser,
    };

    if(loading) return null;
    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>);
};