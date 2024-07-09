import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Menu, Dropdown, Avatar, Modal } from 'antd';
import { useAuth } from '../../hooks/useAuth';
import logo from '../../assets/logo.png';
import avatarImage from '../../assets/lili4.jpg'; // Importa la imagen del avatar
import './Nav.css'; // Importa los estilos
import ChangePassword from '../ChangePassword';

const Nav = ({ greeting }) => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLoginClick = () => {
        navigate('/login');
    };

    const showModal = () => {
        navigate('/contra');
    };

    const handleLogoutClick = () => {
        logout();
        navigate('/login');
    };

    const handleOpenChangePasswordModal = () => {
        Modal.info({
            title: 'Cambiar contraseña',
            content: <ChangePassword />,
            width: 650,
        });
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
                    <Dropdown overlay={menu} trigger={['click']}>
                        <div className="avatar-dropdown">
                            <Avatar size={50} src={avatarImage} />
                            <span className="username">{user.username}</span>
                        </div>
                    </Dropdown>
                ) : (
                    <Button className="login-button" onClick={handleLoginClick}>
                        Iniciar Sesión
                    </Button>
                )}
            </div>
        </div>
    );
};

export default Nav;
