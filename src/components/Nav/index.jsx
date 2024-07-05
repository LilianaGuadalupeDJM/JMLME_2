import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button, Modal } from 'antd'; // Importa Modal
import { useAuth } from '../../hooks/useAuth';
import './Nav.css'; // Importa los estilos
import ChangePassword from '../ChangePassword';
import logo from '../../assets/logo equipo.jpg';

const Nav = ({ greeting }) => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const location = useLocation();

    const handleLogoClick = () => {
        navigate('/');
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

    return (
        <div className="header-content" style={{ backgroundColor: 'black' }}>
            <img src={logo} alt="Logo" className="logo" onClick={handleLogoClick} />
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
