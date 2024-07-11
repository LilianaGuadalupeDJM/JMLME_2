import React, { useState, useEffect } from 'react';
import { Button, Space, notification, Modal, Form, Input } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, ReloadOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { usersService } from '../../services/users';
import { storageController } from '../../services/token';

const BotonesCrudUsuario = ({ selectedUserId, selectedUser }) => {
    const [isModalAlta, setIsModalAltaOpen] = useState(false);
    const [isModalCambio, setIsModalCambioOpen] = useState(false);
    const [form] = Form.useForm();
    const token = storageController.getToken();

    useEffect(() => {
        if (selectedUser) {
            form.setFieldsValue({
                username: selectedUser.username,
                email: selectedUser.email,
            });
        }
    }, [selectedUser, form]);

    const BajaUser = async () => {
        if (selectedUserId) {
            try {
                // const response = await DropUser(selectedUserId);
                console.log('Eliminación exitosa'); // , response.data);
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

    const handleOk = () => {
        setIsModalAltaOpen(false);
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
                            console.error('Error al actualizar usuario:', error);
                            notification.error({
                                message: 'Error al Actualizar Usuario',
                                description: 'Hubo un error al actualizar los datos del usuario.',
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

    const BajaUsuario = async () => {
        if (selectedUserId) {
            try {
                const response = await DropUsuario(selectedUserId);
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
                    onClick={BajaUsuario}
                    disabled={!selectedUserId}
                />
                <Button
                    type="text"
                    icon={<ReloadOutlined style={{ color: '#01859a' }} />}
                    onClick={Reload}
                />
            </Space>

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
                            {
                                validator: (_, value) =>
                                    value && value.endsWith('@example.com')
                                        ? Promise.resolve()
                                        : Promise.reject('El correo electrónico debe ser del dominio @example.com')
                            }
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
