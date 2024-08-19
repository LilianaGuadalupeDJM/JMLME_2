import React, { useState, useEffect } from 'react';
import { Button, Space, notification, Modal, Form, Input, Select } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, ReloadOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { usersService } from '../../services/users';
import { storageController } from '../../services/token';

const { Option } = Select;

const BotonesCrudUsuario = ({ selectedUserId, selectedUser }) => {
    const [isModalAlta, setIsModalAltaOpen] = useState(false);
    const [isModalCambio, setIsModalCambioOpen] = useState(false);
    const [form] = Form.useForm();
    const [roles, setRoles] = useState([]);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        roles: [],
    });
    const token = storageController.getToken();

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const rolesData = await usersService.getRoles();
                setRoles(rolesData); // Asegúrate de que rolesData sea el array de roles
            } catch (error) {
                notification.error({
                    message: 'Error al Cargar Roles',
                    description: 'No se pudo cargar la lista de roles.',
                });
            }
        };

        fetchRoles();
    }, []);

    useEffect(() => {
        if (selectedUser) {
            form.setFieldsValue({
                username: selectedUser.username,
                email: selectedUser.email,
                roles: selectedUser.roles || [],
            });
            setFormData({
                username: selectedUser.username,
                email: selectedUser.email,
                roles: selectedUser.roles || [],
                password: ''
            });
        }
    }, [selectedUser, form]);

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
                        await usersService.DropUsuario(selectedUserId);
                        notification.success({
                            message: 'Usuario Eliminado',
                            description: 'El usuario ha sido eliminado correctamente.',
                        });
                        window.location.reload();
                    } catch (error) {
                        notification.error({
                            message: 'Error al Eliminar Usuario',
                            description: 'Hubo un problema al eliminar el usuario.',
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

    const showModal = () => {
        setIsModalAltaOpen(true);
    };

    const handleOk = async () => {
        try {
            // Asegúrate de que formData esté en el formato correcto
            await usersService.createUser(token, formData);
            notification.success({
                message: 'Usuario Agregado',
                description: 'El usuario ha sido agregado correctamente.',
            });
            setIsModalAltaOpen(false);
            setFormData({
                username: '',
                email: '',
                roles: [],
                password: ''
            });
        } catch (error) {
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
        form.validateFields()
            .then(values => {
                Modal.confirm({
                    title: 'Confirmar actualización',
                    icon: <ExclamationCircleOutlined />,
                    content: '¿Estás seguro de que deseas actualizar este usuario?',
                    onOk: async () => {
                        try {
                            await usersService.updateUser(token, selectedUserId, values);
                            notification.success({
                                message: 'Usuario Actualizado',
                                description: 'Los datos del usuario han sido actualizados correctamente.',
                            });
                            setIsModalCambioOpen(false);
                            window.location.reload();
                        } catch (error) {
                            notification.error({
                                message: 'Error al Actualizar Usuario',
                                description: 'Hubo un problema al actualizar los datos del usuario.',
                            });
                        }
                    },
                });
            })
            .catch(info => {
                console.log('Validación fallida:', info);
            });
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
                            {roles.map(role => (
                                <Option key={role._id} value={role._id}>
                                    {role.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal title="Editar Usuario" open={isModalCambio} onOk={handleCambioOk} onCancel={handleCambioCancel}>
                <Form form={form} layout="vertical" name="form_in_modal">
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
                    >
                        <Select
                            placeholder="Selecciona roles"
                            mode="multiple"
                        >
                            {roles.map(role => (
                                <Option key={role._id} value={role._id}>
                                    {role.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default BotonesCrudUsuario;
