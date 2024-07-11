import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Menu, Dropdown, Avatar, Modal } from 'antd';
import { useAuth } from '../../hooks/useAuth';
import './Nav.css'; // Importa los estilos
import ChangePassword from '../ChangePassword';
import logo from '../../assets/logo equipo.jpg';

const Nav = ({ greeting }) => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

   

    const showModal = () => {
        navigate('/contra');
    };

    const handleLogoutClick = () => {
        logout();
        navigate('/login');
    };

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleClick = (path) => {
        navigate(path);
    };

    const tabNames = [
       // { key: 'home', label: 'Home', path: '/' },
        { key: 'profesores', label: 'Profesor', path: '/profesores'},
        { key: 'usuario', label: 'Usuario', path: '/usuarios' },
    ];

    const tabNamesMenu = [
        { key: 'perfil', label: 'Perfil', onClick: showModal },
        //{ key: 'cambiarContrasena', label: 'Cambiar Contraseña', onClick: handleOpenChangePasswordModal },
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
                <h2>{greeting}</h2>
                {user ? (
                    <div className="avatar-dropdown">
                        <Button
                            className={`nav-button ${location.pathname === '/cambiar-datos' ? 'active' : ''}`}
                            onClick={() => handleClick('/cambiar-datos')}
                        >
                            Perfil
                        </Button>
                        <Button
                            className={`profesores ${location.pathname === '/profesores' ? 'active' : ''}`}
                            onClick={() => handleClick('/profesores')}
                        >
                            Profesores
                        </Button>
                        <Button
                            className="nav-button"
                            onClick={handleLogoutClick}
                        >
                            Cerrar Sesión
                        </Button>
                    </div>
                ) : (
                    <Button
                        className={`nav-button ${location.pathname === '/login' ? 'active' : ''}`}
                        onClick={handleLoginClick}
                    >
                        Iniciar Sesión
                    </Button>
                )}
            </div>
        </div>
    );
};

export default Nav;
