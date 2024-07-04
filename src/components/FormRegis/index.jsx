// components/FormRegis/index.jsx
import React from 'react';
import { Form, Input, Button, Card, Select } from 'antd';
import './FormRegis.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import authService from '../../services/auth.js'
import { validatePassword } from '../../utils/validation.js';
import { validatePasswordLength } from '../../utils/validation.js';

const FormRegis = () => {

    const navigate = useNavigate();

    const onFinish = async (values) => {
        setLoading(true); //Establece el estado de carga a true al enviar el formulario
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
            setLoading(false); //Establece el estado de carga a false despues de recibir la respuesta
        }
    };

    //estado de error
    const [registerError, setRegisterError] = useState(false);

    //Estado de carga
    const [loading, setLoading] = useState(false);

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
                        rules={[{
                            required: true,
                            message: 'Por favor ingrese su usuario',
                        },
                        ]}
                    >
                        <Input placeholder='Usuario' />
                    </Form.Item>
                    <Form.Item
                        name="email"
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

                    {/*     <Form.Item
                    name="roles"
                    rules={[{
                        required: true,
                        message: 'Por favor seleccione su rol'
                    }]}
                >
                    <Select mode="multiple" placeholder="Seleccione un rol">
                        <Select.Option value="user">user</Select.Option>
                        <Select.Option value="moderator">moderator</Select.Option>
                    </Select>
                </Form.Item>
            <*/}
                    <Form.Item>
                        {registerError && <p style={{ color: 'red' }}>error en el registro</p>}
                        <Button type="primary" htmlType="submit" className="register-form-button" loading={loading}>
                            Registrarse
                        </Button>
                    </Form.Item>
                    Ya estás registrado? <a href="/login">Inicia sesión</a>
                </Form>
            </Card>
        </div>
    );
};

export default FormRegis;
