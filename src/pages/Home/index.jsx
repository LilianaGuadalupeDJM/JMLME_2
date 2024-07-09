
import React from 'react';
import { Layout, theme } from 'antd';
import { useAuth } from "../../hooks/useAuth";
import Nav from "../../components/Nav";
import { useNavigate } from 'react-router-dom';
import './index.css';
import Carrusel from "../../components/Carrusel";
import Cards from "../../components/Card";

const { Header, Content, Footer } = Layout;

const App = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    const handleClick = () => {
        navigate('/profesores');
    };
    
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout style={{ minHeight: '100vh' }}> 
            <Nav />
            <Content style={{ padding: '0 48px', overflowY: 'auto' }}> 
                <h1 className="h1">Bienvenido a Tecnología JMLM</h1>
                <p className="p">
                    Somos una institución de educación superior comprometida con la excelencia académica y el desarrollo
                    integral de nuestros estudiantes.
                </p>
                <div style={{
                    padding: 24,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}>
                    <Carrusel />
                </div>
                <br/>
                <Cards />
                <h2>Noticias y Eventos</h2>
                <p className='p2' >
                  Mantente al tanto de las últimas noticias y eventos que tienen lugar en nuestra universidad.
                </p>
                
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                Ant Design ©{new Date().getFullYear()} Created by Ant UED
            </Footer>
        </Layout>
    );
};

export default App;




