import React from "react";
import { Button, Carousel } from "antd";
import { useAuth } from "../../hooks/useAuth";
import Nav from "../../components/Nav";
import { useNavigate } from 'react-router-dom';
import './index.css'; // Importa los estilos

const Home = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    const handleClick = () => {
        // Aquí puedes navegar a la ruta deseada
        navigate('/profesores');
    };

    return (
        <>
            <Nav     />
            <div className="home-layout">
                <header className="home-header">
                    <h1 className="home-greeting">Bienvenido {user.username}</h1>
                </header>

                <div className="home-content">
                    {/* Carousel (Carrusel) */}
                    <Carousel className="carousel" autoplay>
                        <div>
                            <img src="src/assets/lili6.jpg" alt="Imagen 1" />
                        </div>
                        <div>
                            <img src="src/assets/lili3.jpg" alt="Imagen 2" />
                        </div>
                        <div>
                            <img src="src/assets/lili1.jpg" alt="Imagen 3" />
                        </div>
                    </Carousel>

                </div>
            </div>
        </>
    );
};

export default Home;
