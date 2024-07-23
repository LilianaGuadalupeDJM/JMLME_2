
import React from 'react';
import { Carousel } from 'antd';
import './carrusel.css'; // Asegúrate de tener este archivo para los estilos

const Carrusel = () => (
    <div className="carousel-container"> {/* Contenedor del carrusel */}
        <Carousel autoplay>
            <div className="carousel-item">
                <img src="src/assets/a.jpg" alt="Imagen 1" />
            </div>
            <div className="carousel-item">
                <img src="src/assets/c.jpg" alt="Imagen 2" />
            </div>
            <div className="carousel-item">
                <img src="src/assets/b.jpg" alt="Imagen 3" />
            </div>           
        </Carousel>                 
    </div>
);

export default Carrusel;


