import React, { useState, useEffect } from 'react';
import { Button, Space, notification, Modal, Form, Input, Select } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, ReloadOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { usersService } from '../../services/users';
import { storageController } from '../../services/token';

const { Option } = Select;

const BotonesCrudUsuario = ({ selectedUserId }) => {
    const [isModalAlta, setIsModalAltaOpen] = useState(false);
    const [isModalCambio, setIsModalCambioOpen] = useState(false);
    const [form] = Form.useForm();
    const [roles, setRoles] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const token = storageController.getToken();

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const data = await usersService.getRoles();
                setRoles(data);
            } catch (error) {
                console.error('Error al obtener roles:', error);
            }
        };

        fetchRoles();
    }, []);

    useEffect(() => {
        if (selectedUser && isModalCambio) {
            form.setFieldsValue({
                username: selectedUser.username,
                email: selectedUser.email,
                roles: selectedUser.roles.map(role => role._id),
            });
        }
    }, [selectedUser, isModalCambio]);

    const showModal = () => {
        setIsModalAltaOpen(true);
    };

    const handleCreateOk = async () => {
        try {
            const values = await form.validateFields();
            await usersService.createUser(token, values);
            notification.success({
                message: 'Usuario Creado',
                description: 'El usuario ha sido creado correctamente.',
            });
            setIsModalAltaOpen(false);
            form.resetFields();
            // Lógica para refrescar la lista de usuarios
        } catch (error) {
            console.error('Error al crear el usuario:', error);
            notification.error({
                message: 'Error al Crear Usuario',
                description: 'Hubo un error al crear el usuario.',
            });
        }
    };

    const handleCreateCancel = () => {
        setIsModalAltaOpen(false);
    };

    const showCambioModal = async () => {
        if (selectedUserId) {
            try {
                const user = await usersService.getUser(selectedUserId);
                setSelectedUser(user);
                setIsModalCambioOpen(true);
            } catch (error) {
                console.error('Error al obtener el usuario:', error);
                notification.error({
                    message: 'Error al Obtener Usuario',
                    description: 'Hubo un error al obtener los datos del usuario.',
                });
            }
        } else {
            notification.warning({
                message: 'Selecciona un usuario',
                description: 'Para editar, selecciona un usuario de la lista.',
            });
        }
    };

    const handleCambioOk = async () => {
        try {
            const values = await form.validateFields();
            Modal.confirm({
                title: 'Confirmar actualización',
                icon: <ExclamationCircleOutlined />,
                content: '¿Estás seguro de que deseas actualizar este usuario?',
                onOk: async () => {
                    try {
                        await usersService.updateUser(selectedUserId, values, token);
                        notification.success({
                            message: 'Usuario Actualizado',
                            description: 'Los datos del usuario han sido actualizados correctamente.',
                        });
                        setIsModalCambioOpen(false);
                        form.resetFields();
                        // Lógica para refrescar la lista de usuarios
                    } catch (error) {
                        console.error('Error al actualizar el usuario:', error);
                        notification.error({
                            message: 'Error al Actualizar Usuario',
                            description: 'Hubo un error al actualizar los datos del usuario.',
                        });
                    }
                },
            });
        } catch (error) {
            console.error('Error en la validación:', error);
        }
    };

    const handleCambioCancel = () => {
        setIsModalCambioOpen(false);
    };

    const confirmDeletion = () => {
        Modal.confirm({
            title: '¿Está seguro que desea eliminar este usuario?',
            content: 'Esta acción no se puede deshacer.',
            okText: 'Sí, eliminar',
            okType: 'danger',
            cancelText: 'Cancelar',
            onOk: async () => {
                if (selectedUserId) {
                    try {
                        await usersService.deleteUser(selectedUserId, token);
                        notification.success({
                            message: 'Usuario Eliminado',
                            description: 'El usuario ha sido eliminado correctamente.',
                        });
                        // Lógica para refrescar la lista de usuarios
                    } catch (error) {
                        console.error('Error al eliminar el usuario:', error);
                        notification.error({
                            message: 'Error al Eliminar Usuario',
                            description: 'Hubo un error al eliminar el usuario.',
                        });
                    }
                } else {
                    notification.warning({
                        message: 'Selecciona un usuario',
                        description: 'Para eliminar, selecciona un usuario de la lista.',
                    });
                }
            },
        });
    };

    const Reload = () => {
        window.location.reload();
    };

    return (
        <>
            <Space>
                <Button
                    type="text"
                    icon={<PlusOutlined style={{ color: '#01859a' }} />}
                    onClick={showModal}
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
                    onClick={confirmDeletion}
                    disabled={!selectedUserId}
                />
                <Button
                    type="text"
                    icon={<ReloadOutlined style={{ color: '#01859a' }} />}
                    onClick={Reload}
                />
            </Space>

            <Modal title="Alta de Usuario" open={isModalAlta} onOk={handleCreateOk} onCancel={handleCreateCancel}>
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="username"
                        label="Nombre de Usuario"
                        rules={[{ required: true, message: 'Por favor ingresa el nombre de usuario' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Correo Electrónico"
                        rules={[
                            { required: true, message: 'Por favor ingresa el correo electrónico' },
                            { type: 'email', message: 'Por favor ingresa un correo electrónico válido' },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Contraseña"
                        rules={[{ required: true, message: 'Por favor ingresa la contraseña' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name="roles"
                        label="Roles"
                        rules={[{ required: true, message: 'Por favor selecciona al menos un rol' }]}
                    >
                        <Select mode="multiple" placeholder="Selecciona roles">
                            {roles.map(role => (
                                <Option key={role._id} value={role._id}>{role.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal title="Editar Usuario" open={isModalCambio} onOk={handleCambioOk} onCancel={handleCambioCancel}>
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="username"
                        label="Nombre de Usuario"
                        rules={[{ required: true, message: 'Por favor ingresa el nombre de usuario' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Correo Electrónico"
                        rules={[
                            { required: true, message: 'Por favor ingresa el correo electrónico' },
                            { type: 'email', message: 'Por favor ingresa un correo electrónico válido' },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="roles"
                        label="Roles"
                        rules={[{ required: true, message: 'Por favor selecciona al menos un rol' }]}
                    >
                        <Select mode="multiple" placeholder="Selecciona roles">
                            {roles.map(role => (
                                <Option key={role._id} value={role._id}>{role.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default BotonesCrudUsuario;
