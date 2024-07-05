import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/auth';
import { useAuth } from '../../hooks/useAuth';
import Nav from '../../components/Nav';
import { storageController } from '../../services/token';
import './EditarUsuario.css';

const EditarUsuario = () => {
    const { user, logout, updateUser } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        const token = await storageController.getToken();
        if (!user || !user._id) {
            console.error('ID de usuario no disponible');
            return;
        }
        setLoading(true);
        try {
            const response = await authService.updateUser(token, user._id, values.username, values.email);
            if (response.data) {
                updateUser({ username: values.username, email: values.email });
                message.success('Los cambios se han guardado correctamente. Por favor, inicia sesión nuevamente para aplicarlos.');
                setTimeout(() => {
                    setLoading(false);
                    navigate('/');
                    logout(); // Cerrar sesión automáticamente después de unos segundos
                }, 3000); // Tiempo en milisegundos antes de cerrar sesión automáticamente
            }
        } catch (error) {
            console.error('Error actualizando el usuario:', error);
            setLoading(false);
            message.error('Hubo un problema al guardar los cambios. Por favor, intenta nuevamente.');
        }
    };
   

    return (
        <>
       
           
            
            <div className="change-user-form">
            <h2 style={{ color: 'black' }}>Editar Usuario</h2>
            <Form
                    name="edit_user"
                    initialValues={{ username: user.username, email: user.email }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Por favor ingrese su nuevo nombre de usuario' }]}
                    >
                        <Input placeholder="Nuevo nombre de usuario" />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Por favor ingrese su nuevo correo electrónico' }]}
                    >
                        <Input placeholder="Nuevo correo electrónico" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Guardar cambios
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
   
};


export default EditarUsuario;
