import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Avatar, Modal, Menu } from 'antd';
import { useAuth } from '../../hooks/useAuth';
import logo from '../../assets/log.jpeg';
import avatarImage from '../../assets/user.jpg'; // Importa la imagen del avatar
import './Nav.css'; // Importa los estilos
import ChangePassword from '../ChangePassword';
import DrawerComponent from '../Drawer';

const Nav = () => {
    const [drawerVisible, setDrawerVisible] = useState(false); // Estado para controlar el drawer
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const showModal = () => {
        navigate('/contra');
    };

    const handleLogoutClick = () => {
        logout();
        navigate('/login');
    };

    const handleLogoutProfile = () => {
        logout();
        navigate('/profile'); // Cambiado a '/profile' en minúsculas para coincidir con la ruta definida
    };

    const handleClick = (path) => {
        navigate(path);
    };

    const handleAvatarClick = () => {
        setDrawerVisible(true); // Abre el drawer
    };

    const handleDrawerClose = () => {
        setDrawerVisible(false); // Cierra el drawer
    };

    const isAdmin = user && user.roles && user.roles.includes('666b5995e842a28618ccfc95');
    const userName = user ? user.username : '';

    const tabNames = [
        // { key: 'home', label: 'Home', path: '/' },
        { key: 'profesores', label: 'Profesor', path: '/profesores' },
        { key: 'usuario', label: 'Usuario', path: '/usuarios' },
        { key: 'admisiones', label: 'Admisiones', path: '/admisiones' },
        { key: 'oferta', label: 'Oferta', path: '/oferta-educativa' },
    ];

    const tabNamesMenu = [
        { key: 'perfil', label: 'Perfil', onClick: showModal },
        // { key: 'cambiarContrasena', label: 'Cambiar Contraseña', onClick: handleOpenChangePasswordModal },
        { key: 'cerrarSesion', label: 'Cerrar Sesión', onClick: handleLogoutClick },
    ];

    const menu = (
        <Menu>
            {tabNamesMenu.map(tab => (
                <Menu.Item key={tab.key} onClick={tab.onClick}>
                    {tab.label}
                </Menu.Item>
            ))}
        </Menu>
    );

    return (
        <div className="header-content">
            <Link to="/">
                <img src={logo} alt="Logo" className="logo" />
            </Link>
            <div className="header-center">
                {tabNames.map(tab => (
                    <Link key={tab.key} to={tab.path} className="nav-link">
                        {tab.label}
                    </Link>
                ))}
            </div>
            <div className="header-right">
                <h2 className="greeting">
                    {isAdmin ? `Bienvenido ${userName}` : 'Bienvenido visitante'}
                </h2>
                {user ? (
                    <div className="avatar-dropdown">
                      
                        <DrawerComponent
                            visible={drawerVisible}
                            onClose={handleDrawerClose}
                        />
                    </div>
                ) : (
                    <Button className="login-button" onClick={() => navigate('/login')}>
                        Iniciar Sesión
                    </Button>
                )}
            </div>
        </div>
    );
};

export default Nav;
