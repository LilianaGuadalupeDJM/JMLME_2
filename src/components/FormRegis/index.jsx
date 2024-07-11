import React, { useState } from 'react';
import { Form, Input, Button, Card } from 'antd';
import './FormRegis.css';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/auth.js';
import { validatePassword, validatePasswordLength } from '../../utils/validation.js';

const FormRegis = () => {
    const navigate = useNavigate();
    const [registerError, setRegisterError] = useState(false);
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true); // Establece el estado de carga a true al enviar el formulario
        try {
            const response = await authService.register(values.username, values.email, values.password);
            console.log('Registro exitoso', response.data);
            navigate('/login');
        }
        catch (error) {
            console.error('Error en el registro', error.response.data);
            setRegisterError(true);
        }
        finally {
            setLoading(false); // Establece el estado de carga a false después de recibir la respuesta
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed', errorInfo);
        setRegisterError(true);
    };

    return (
        <div className='regis-component'>
            <Card
                title="Crea una cuenta"
                bordered={false}
                className='responsive-card'
            >
                <Form
                    name="normal_register"
                    className="register-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        name="username"
                        className="register-form-item"
                        rules={[{
                            required: true,
                            message: 'Por favor ingrese su usuario',
                        }]}
                    >
                        <Input placeholder='Usuario' />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        className="register-form-item"
                        rules={[{
                            required: true,
                            type: 'email',
                            message: 'Por favor ingrese un correo válido'
                        }]}
                    >
                        <Input placeholder='Correo electrónico' />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        className="register-form-item"
                        rules={[{
                            required: true,
                            message: 'Por favor ingrese su contraseña'
                        }, ({ getFieldValue }) => validatePasswordLength({ getFieldValue }),
                    ]}
                    >
                        <Input.Password placeholder='Contraseña' />
                    </Form.Item>
                    <Form.Item
                        name="password-repet"
                        className="register-form-item"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor confirme su contraseña',
                            },
                            ({ getFieldValue }) => validatePassword({ getFieldValue }),
                        ]}
                    >
                        <Input.Password placeholder='Confirmar contraseña' />
                    </Form.Item>
                    <Form.Item>
                        {registerError && <p className="register-form-error">Error en el registro</p>}
                        <Button type="primary" htmlType="submit" className="register-form-button" loading={loading}>
                            Registrarse
                        </Button>
                    </Form.Item>
                    <Form.Item className="register-form-register">
                        ¿Ya estás registrado? <a href="/login">Inicia sesión</a>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default FormRegis;
