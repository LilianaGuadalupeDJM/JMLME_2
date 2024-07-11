import React, { useState } from 'react';
import { Button, Space, notification, Modal, Form, Input, Select } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, ReloadOutlined } from '@ant-design/icons';
import { usersService } from '../../services/users';  // Asegúrate de que la ruta sea correcta



const { Option } = Select;

const BotonesCrudUsuario = ({ selectedUserId, token }) => {
    const [isModalAlta, setIsModalAltaOpen] = useState(false);
    const [isModalCambio, setIsModalCambioOpen] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        roles: [],
        password: ''
    });

    const BajaUser = async () => {
        if (selectedUserId) {
            try {
                // const response = await DropUser(selectedUserId);
                console.log('Eliminación exitosa');
                notification.success({
                    message: 'Usuario Eliminado',
                    description: 'Los datos del usuario han sido eliminados correctamente.',
                });
                window.location.reload();
            } catch (error) {
                console.error(error);
                notification.error({
                    message: 'Usuario No Eliminado.',
                    description: 'Error al eliminar usuario.',
                });
            }
        } else {
            alert("Selecciona un usuario para eliminar.");
        }
    };

    const Reload = () => {
        window.location.reload();
    };

    const showModal = () => {
        setIsModalAltaOpen(true);
    };

    const handleOk = async () => {
        try {
            const response = await usersService.createUser(token, formData);
            console.log('Usuario agregado:', response);
            notification.success({
                message: 'Usuario Agregado',
                description: 'El usuario ha sido agregado correctamente.',
            });
            setIsModalAltaOpen(false);
            setFormData({
                username: '',
                email: '',
                roles: [],
            });
        } catch (error) {
            console.error('Error al agregar usuario:', error);
            notification.error({
                message: 'Error al Agregar Usuario',
                description: 'Hubo un problema al intentar agregar el usuario.',
            });
        }
    };
    const handleCancel = () => {
        setIsModalAltaOpen(false);
    };

    const showCambioModal = () => {
        setIsModalCambioOpen(true);
    };

    const handleCambioOk = () => {
        setIsModalCambioOpen(false);
    };

    const handleCambioCancel = () => {
        setIsModalCambioOpen(false);
    };

    const handleChange = (value) => {
        setFormData({
            ...formData,
            roles: value,
        });
    };

    return (
        <>
            <Space>
                <Button
                    type="text"
                    icon={<PlusOutlined style={{ color: '#01859a' }} />}
                    onClick={showModal}
                    disabled={!!selectedUserId}
                />
                <Button
                    type="text"
                    icon={<EditOutlined style={{ color: '#01859a' }} />}
                    onClick={showCambioModal}
                    disabled={!selectedUserId}
                />
                <Button
                    type="text"
                    icon={<DeleteOutlined style={{ color: '#01859a' }} />}
                    onClick={BajaUser}
                    disabled={!selectedUserId}
                />
                <Button
                    type="text"
                    icon={<ReloadOutlined style={{ color: '#01859a' }} />}
                    onClick={Reload}
                />
            </Space>

            <Modal title="Alta de Usuario" open={isModalAlta} onOk={handleOk} onCancel={handleCancel}>
                <Form layout="vertical">
                    <Form.Item label="Nombre de Usuario">
                        <Input
                            placeholder="Nombre de usuario"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        />
                    </Form.Item>
                    <Form.Item label="Correo Electrónico">
                        <Input
                            placeholder="Correo electrónico"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </Form.Item>
                    <Form.Item label="Contraseña">
                        <Input.Password
                            placeholder="Contraseña"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </Form.Item>
                    <Form.Item label="Roles">
                        <Select
                            placeholder="Selecciona roles"
                            mode="multiple"
                            value={formData.roles}
                            onChange={handleChange}
                        >
                            <Option value="admin">Administrador</Option>
                            <Option value="user">Estudiante</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal title="Editar Usuario" open={isModalCambio} onOk={handleCambioOk} onCancel={handleCambioCancel}>
                {/* Aquí se podría añadir la lógica para editar usuario */}
            </Modal>
        </>
    );
};

export default BotonesCrudUsuario;
