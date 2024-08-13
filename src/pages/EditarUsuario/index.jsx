import React, { useState } from 'react';
import { Form, Input, Button, message, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/auth';
import { useAuth } from '../../hooks/useAuth';
import { storageController } from '../../services/token';
import './EditarUsuario.css';
import FormChangePassword from "../../components/FormChangePassword"; // Asegúrate de ajustar la ruta según la estructura de tu proyecto

const EditarUsuario = ({ onModalCancel }) => {
    const { user, logout, updateUser } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const onFinish = async (values) => {
        const token = await storageController.getToken();
        if (!user || !user._id) {
            //.error('ID de usuario no disponible');
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
                    if (onModalCancel) {
                        onModalCancel(); // Cerrar el modal si la función está disponible
                    }
                }, 3000); // Tiempo en milisegundos antes de cerrar sesión automáticamente
            }
        } catch (error) {
            //.error('Error actualizando el usuario:', error);
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