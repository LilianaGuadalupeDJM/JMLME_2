import React from 'react';
import { Layout, theme, Card, Col, Row } from 'antd';
import { useAuth } from "../../hooks/useAuth";
import Nav from "../../components/Nav";
import { useNavigate } from 'react-router-dom';
import './index.css';
import Carrusel from '../../components/Carrusel/Carrusel';
import l from '../../assets/lili6.jpg';
import lili6 from '../../assets/l.jpg';
import Cards from '../../components/Card/Cards'; // Asegúrate de que la ruta sea correcta

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
            <Content style={{ padding: '0 48px', overflow: 'hidden' }}>
                <div style={{ maxHeight: '80vh', overflowY: 'scroll', padding: 24, background: colorBgContainer, borderRadius: borderRadiusLG, '-webkit-overflow-scrolling': 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    <h1 className="h1">Bienvenido a Tecnología JMLM</h1>
                    <p className="p">
                        Somos una institución de educación superior comprometida con la excelencia académica y el desarrollo
                        integral de nuestros estudiantes.
                    </p>
                    <div style={{ padding: 24, background: colorBgContainer, borderRadius: borderRadiusLG }}>
                        <Carrusel />
                    </div>
                    <br/>
                    <Cards />
                    <br/>
                    <h2>Noticias y Eventos</h2>
                    <p className='p2'>
                      Mantente al tanto de las últimas noticias y eventos que tienen lugar en nuestra universidad.
                    </p>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Card bordered={false} className="card-background" style={{ backgroundImage: `url(${l})`, height: '300px', backgroundSize: 'cover' }}>
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card bordered={false} className="card-background" style={{ backgroundImage: `url(${lili6})`, height: '300px', backgroundSize: 'cover' }}>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                Ant Design ©{new Date().getFullYear()} Created by Ant UED
            </Footer>
        </Layout>
    );
};

export default App;
