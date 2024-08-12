import React, { useState } from 'react';
import { Button, Space, notification, Modal, Form, Input, Switch } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, ReloadOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { rolesService } from '../../services/Roles'; // Asegúrate de que este servicio esté bien configurado
import { storageController } from '../../services/token';

const BotonesCrudRoles = ({ selectedRolId, selectedRol }) => {
    const [isModalAlta, setIsModalAltaOpen] = useState(false);
    const [isModalCambio, setIsModalCambioOpen] = useState(false);
    const [form] = Form.useForm();
    const token = storageController.getToken();

    const showModal = () => {
        setIsModalAltaOpen(true);
    };

    const handleCreateOk = async () => {
        try {
            const values = await form.validateFields();
            const name = values.name; // Extrae el nombre del rol
            const response = await rolesService.addRol(name, token); // Pasa el nombre y el token
            notification.success({
                message: 'Rol Creado',
                description: 'El rol ha sido creado correctamente.',
            });
            setIsModalAltaOpen(false);
            window.location.reload();
            form.resetFields();
        } catch (error) {
            console.error('Error al crear el rol:', error);
            notification.error({
                message: 'Error al Crear Rol',
                description: 'Hubo un error al crear el rol.',
            });
        }
    };
    

    const handleCreateCancel = () => {
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
                    content: '¿Estás seguro de que deseas actualizar este rol?',
                    onOk: async () => {
                        try {
                            await rolesService.editRol(selectedRolId, values, token);
                            notification.success({
                                message: 'Rol Actualizado',
                                description: 'Los datos del rol han sido actualizados correctamente.',
                            });
                            setIsModalCambioOpen(false);
                            window.location.reload();
                        } catch (error) {
                            console.error('Error al actualizar el rol:', error);
                            notification.error({
                                message: 'Error al Actualizar Rol',
                                description: 'Hubo un error al actualizar los datos del rol.',
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

    const confirmDeletion = () => {
        Modal.confirm({
            title: '¿Está seguro que desea eliminar este rol?',
            content: 'Esta acción no se puede deshacer.',
            okText: 'Sí, eliminar',
            okType: 'danger',
            cancelText: 'Cancelar',
            onOk: async () => {
                if (selectedRolId) {
                    try {
                        await rolesService.dropRol(token, selectedRolId);
                        notification.success({
                            message: 'Rol Eliminado',
                            description: 'El rol ha sido eliminado correctamente.',
                        });
                        window.location.reload();
                    } catch (error) {
                        console.error('Error al eliminar el rol:', error);
                        notification.error({
                            message: 'Error al Eliminar Rol',
                            description: 'Hubo un error al eliminar el rol.',
                        });
                    }
                } else {
                    alert("Selecciona un rol para eliminar.");
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
                    disabled={!selectedRolId}
                />
                <Button
                    type="text"
                    icon={<DeleteOutlined style={{ color: '#01859a' }} />}
                    onClick={confirmDeletion}
                    disabled={!selectedRolId}
                />
                <Button
                    type="text"
                    icon={<ReloadOutlined style={{ color: '#01859a' }} />}
                    onClick={Reload}
                />
            </Space>

            <Modal title="Crear Nuevo Rol" open={isModalAlta} onOk={handleCreateOk} onCancel={handleCreateCancel}>
                <Form form={form} layout="vertical" name="form_create_role">
                    <Form.Item
                        name="name"
                        label="Nombre del Rol"
                        rules={[{ required: true, message: 'Por favor ingresa el nombre del rol' }]}
                    >
                        <Input />
                    </Form.Item>
                    
                </Form>
            </Modal>

            <Modal title="Editar Rol" open={isModalCambio} onOk={handleCambioOk} onCancel={handleCambioCancel}>
                <Form form={form} layout="vertical" name="form_edit_role">
                    <Form.Item
                        name="name"
                        label="Nombre del Rol"
                        rules={[{ required: true, message: 'Por favor ingresa el nombre del rol' }]}
                    >
                        <Input />
                    </Form.Item>
                    
                </Form>
            </Modal>
        </>
    );
};

export default BotonesCrudRoles;
