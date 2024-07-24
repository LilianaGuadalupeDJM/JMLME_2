import React from "react";
import { useRoutes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import EditarUsuario from "../pages/EditarUsuario";
import Profesores from "../pages/Profesores";
import EditProfessor from "../pages/Profesor";
import AddProfessor from "../pages/Alta-Profesor";
import ChangePassword from "../components/ChangePassword";
import Usuarios from "../pages/Users";
import Oferta from "../pages/Oferta";
import AdmisionesPage from "../pages/Admision/AdmisionesPage";


import { useAuth } from "../hooks/useAuth";

const AppRoutes = () => {
    const { user } = useAuth();
    let routes = useRoutes([
        { path: '/', element: user ? <Home /> : <Login /> },
        { path: '/login', element: <Login /> },
        { path: '/register', element: <Register /> },
        { path: '/cambiar-datos', element: user ? <EditarUsuario /> : <Login /> },
        { path: '/profesores', element: <Profesores /> },
        { path: '/edit-professor/:id', element: <EditProfessor /> },
        { path: '/alta-professor', element: <AddProfessor /> },
        { path: '/contra', element: user ? <ChangePassword  /> : <Login /> },
        { path: '/usuarios', element: <Usuarios /> },
        { path: '/oferta-educativa', element: <Oferta /> },
        { path: '/admisiones', element: <AdmisionesPage />},

      // Asegúrate de que la ruta y la protección de ruta sean correctas
    ]);
    return routes;
}

export default AppRoutes;
