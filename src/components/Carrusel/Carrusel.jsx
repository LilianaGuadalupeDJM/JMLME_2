import React from 'react';
import { Carousel } from 'antd';
import './carrusel.css';
import img1 from '../assets/a.jpg'; // Ajusta la ruta según tu estructura
import img2 from '../assets/b.jpg'; // Ajusta la ruta según tu estructura
import img3 from '../assets/c.jpg'; // Ajusta la ruta según tu estructura

const Carrusel = () => (
    <div className="carousel-container">
        <Carousel autoplay>
            <div className="carousel-item">
                <img src={img1} alt="Imagen 1" />
            </div>
            <div className="carousel-item">
                <img src={img2} alt="Imagen 2" />
            </div>
            <div className="carousel-item">
                <img src={img3} alt="Imagen 3" />
            </div>           
        </Carousel>                 
    </div>
);

export default Carrusel;
