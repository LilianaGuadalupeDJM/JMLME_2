import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography  } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './FormLogin.css';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/auth.js';
import { useAuth } from '../../hooks/useAuth.js';

const FormLogin = () => {
    const [loginError, setLoginError] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const onFinish = async (values) => {
        setLoading(true);
        setLoginError(false);
        try {
            const response = await authService.loginF(values.username, values.password);
            console.log('Response:', response);
            if (response && response.data && response.data.generatedToken) {
                const token = response.data.generatedToken;
                console.log("inicio correcto");
                localStorage.setItem('token', response.data.generatedToken);
                login(response.data.generatedToken);
                navigate('/');
            } else {
                console.log('Error de inicio inesperado');
                setLoginError(true);
            }
        } catch (error) {
            console.error('Error en el login', error.response ? error.response.data : error.message);
            setLoginError(true);
        } finally {
            setLoading(false);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed: ', errorInfo);
        setLoginError(true);
    };

    return (
        <div className="login-component">
            <Card 
                title="Bienvenido a JMLM"
                bordered={false}
                className='responsive-card'
            >
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        name="username"
                        className="login-form-item"
                        rules={[{
                            required: true,
                            message: 'Por favor ingrese su usuario'
                        }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder='Usuario' />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        className="login-form-item"
                        rules={[{
                            required: true,
                            message: 'Por favor ingrese su contraseña'
                        }]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder='Contraseña' />
                    </Form.Item>
                    <Form.Item>
                        {loginError && <p className="login-form-error">Credenciales incorrectas, intenta de nuevo</p>}
                        <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
                            Iniciar Sesión
                        </Button>
                    </Form.Item>
                    <Form.Item className="login-form-register">
                        ¿Aún no tienes cuenta? <a href="/register">Regístrate</a>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}

export default FormLogin;
