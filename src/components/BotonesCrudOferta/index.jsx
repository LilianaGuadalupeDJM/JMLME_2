import React, { useState } from 'react';
import { Button, Space, notification, Modal, Form, Input, Switch } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, ReloadOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { ofertaService } from '../../services/oferta';
import { storageController } from '../../services/token';

const BotonesCrudOferta = ({ selectedOfertaId, selectedOferta }) => {
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
            const response = await ofertaService.createOferta(token, values);
            notification.success({
                message: 'Oferta Creada',
                description: 'La oferta ha sido creada correctamente.',
            });
            setIsModalAltaOpen(false);
            form.resetFields();
            // Opcional: Recargar la lista de ofertas aquí si es necesario
            // fetchOfertas();
        } catch (error) {
            console.error('Error al crear la oferta:', error);
            notification.error({
                message: 'Error al Crear Oferta',
                description: 'Hubo un error al crear la oferta.',
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
                    content: '¿Estás seguro de que deseas actualizar esta oferta?',
                    onOk: async () => {
                        try {
                            await ofertaService.updateOferta(token, selectedOfertaId, values);
                            notification.success({
                                message: 'Oferta Actualizada',
                                description: 'Los datos de la oferta han sido actualizados correctamente.',
                            });
                            setIsModalCambioOpen(false);
                            // Opcional: Recargar la lista de ofertas aquí si es necesario
                            // fetchOfertas();
                        } catch (error) {
                            console.error('Error al actualizar la oferta:', error);
                            notification.error({
                                message: 'Error al Actualizar Oferta',
                                description: 'Hubo un error al actualizar los datos de la oferta.',
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

    const Reload = () => {
        window.location.reload();
    };

    
    const confirmDeletion = () => {
        Modal.confirm({
            title: '¿Está seguro que desea eliminar esta oferta?',
            content: 'Esta acción no se puede deshacer.',
            okText: 'Sí, eliminar',
            okType: 'danger',
            cancelText: 'Cancelar',
            onOk: async () => {
                if (selectedOfertaId) {
                    try {
                        await ofertaService.deleteOferta(token, selectedOfertaId);
                        notification.success({
                            message: 'Oferta Eliminada',
                            description: 'La oferta ha sido eliminada correctamente.',
                        });
                        // Opcional: Recargar la lista de ofertas aquí si es necesario
                        // fetchOfertas();
                    } catch (error) {
                        console.error('Error al eliminar la oferta:', error);
                        notification.error({
                            message: 'Error al Eliminar Oferta',
                            description: 'Hubo un error al eliminar la oferta.',
                        });
                    }
                } else {
                    alert("Selecciona una oferta para eliminar.");
                }
            },
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
                    disabled={!selectedOfertaId}
                />
                <Button
                    type="text"
                    icon={<DeleteOutlined style={{ color: '#01859a' }} />}
                    onClick={confirmDeletion}
                    disabled={!selectedOfertaId}
                />
               <Button
                    type="text"
                    icon={<ReloadOutlined style={{ color: '#01859a' }} />}
                    onClick={Reload}
                />
            </Space>

            <Modal title="Crear Nueva Oferta" open={isModalAlta} onOk={handleCreateOk} onCancel={handleCreateCancel}>
                <Form form={form} layout="vertical" name="form_create_oferta">
                    <Form.Item
                        name="nombre"
                        label="Nombre de la Oferta"
                        rules={[{ required: true, message: 'Por favor ingresa el nombre de la oferta' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="activo"
                        label="Activo"
                        valuePropName="checked"
                        initialValue={true}
                    >
                        <Switch />
                    </Form.Item>
                </Form>
            </Modal>

            <Modal title="Editar Oferta" open={isModalCambio} onOk={handleCambioOk} onCancel={handleCambioCancel}>
                <Form form={form} layout="vertical" name="form_edit_oferta">
                    <Form.Item
                        name="nombre"
                        label="Nombre de la Oferta"
                        rules={[{ required: true, message: 'Por favor ingresa el nombre de la oferta' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="activo"
                        label="Activo"
                        valuePropName="checked"
                    >
                        <Switch />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default BotonesCrudOferta;
