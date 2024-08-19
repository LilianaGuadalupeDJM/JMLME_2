import React, { useState, useEffect } from 'react';
import { Button, Space, notification, Modal, Form, Input, Select } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, ReloadOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { usersService } from '../../services/users';
import { storageController } from '../../services/token';
import { DropUsuario } from '../../services/users';

const { Option } = Select;

const BotonesCrudUsuario = ({ selectedUserId, selectedUser }) => {
    const [isModalAlta, setIsModalAltaOpen] = useState(false);
    const [isModalCambio, setIsModalCambioOpen] = useState(false);
    const [form] = Form.useForm();
    const token = storageController.getToken();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        roles: [],
        password: ''
    });

    useEffect(() => {
        if (selectedUser) {
            form.setFieldsValue({
                username: selectedUser.username,
                email: selectedUser.email,
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
                        const response = await DropUsuario(selectedUserId);
                        //.log('Eliminación exitosa');
                        notification.success({
                            message: 'Usuario Eliminado',
                            description: 'Los datos del usuario han sido eliminados correctamente.',
                        });
                        window.location.reload();
                    } catch (error) {
                        //.error(error);
                        notification.error({
                            message: 'Usuario No Eliminado.',
                            description: 'Error al eliminar usuario.',
                        });
                    }
                } else {
                    alert("Selecciona un usuario para eliminar.");
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
            const response = await usersService.createUser(token, formData);
            //.log('Usuario agregado:', response);
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
            //.error('Error al agregar usuario:', error);
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
                            //.error('Error al actualizar usuario:', error);
                            notification.error({
                                message: 'Error al Actualizar Usuario',
                                description: 'Hubo un error al actualizar los datos del usuario.',
                            });
                        }
                    },
                });
            })
            .catch(info => {
                //.log('Validación fallida:', info);
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
                            <Option value="admin">Administrador</Option>
                            <Option value="user">Estudiante</Option>
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
                </Form>
            </Modal>
        </>
    );
};

export default BotonesCrudUsuario;
