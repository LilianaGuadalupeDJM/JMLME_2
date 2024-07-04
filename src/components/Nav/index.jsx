import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Menu, Dropdown, Avatar } from 'antd';
import { useAuth } from '../../hooks/useAuth';
import logo from '../../assets/logo.png';
import avatarImage from '../../assets/lili4.jpg'; // Importa la imagen del avatar
import './Nav.css'; // Importa los estilos
import ChangePassword from '../ChangePassword';

const Nav = ({ greeting }) => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const showModal= () => {
        navigate('/contra');
    };

    const handleLogoutClick = () => {
        logout();
        navigate('/contra');
    };

    const handleLogoutProfile = () => {
        logout();
        navigate('/contra'); // Cambiado a '/profile' en minúsculas para coincidir con la ruta definida
    };

    const handleOpenChangePasswordModal = () => {
        Modal.info({
            title: 'Cambiar contraseña',
            content: <ChangePassword />,
            width: 650,
        });
    };

    const menu = (
        <Menu>
            <Menu.Item key="perfil" onClick={showModal}>
                Perfil
            </Menu.Item>
            <Menu.Item key="cerrarSesion" onClick={handleLogoutClick}>
                Cerrar Sesión
            </Menu.Item>
        </Menu>
    );

    return (
        <div className="header-content">
            <Link to="/">
                <img src={logo} alt="Logo" className="logo" />
            </Link>
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