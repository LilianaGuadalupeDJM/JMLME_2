import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Avatar, Modal } from 'antd';
import { useAuth } from '../../hooks/useAuth';
import logo from '../../assets/log.jpeg';
import avatarImage from '../../assets/user.jpg'; // Importa la imagen del avatar
import './Nav.css'; // Importa los estilos
import ChangePassword from '../ChangePassword';
import DrawerComponent from '../Drawer';

const Nav = ({ greeting }) => {
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

    const handleClick = () => {
        navigate('/profesores');
    };

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
                <a className="profesores-button" onClick={handleClick}>Profesores</a>
                <h2 className="greeting">{greeting}</h2>
                {user ? (
                    <div className="avatar-dropdown">
                        <span className="username">Bienvenido {user.username}</span>
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

