import React from 'react';
import { useNavigate } from 'react-router-dom';
import smile from '../../assets/logo equipo.jpg';

const ImageLogin = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/profesores');
    };

    return (
        <div className="App">
            <img 
                src={smile} 
                alt="smile" 
                style={{ width: '200px', cursor: 'pointer' }} 
                onClick={handleClick}
            />
        </div>
    );
}

export default ImageLogin;
