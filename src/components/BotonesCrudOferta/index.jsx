import React, { useState, useEffect } from 'react';
import { Button, Space, notification, Modal, Form, Input, List } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, ReloadOutlined, UserOutlined } from '@ant-design/icons';
import { ofertaService } from '../../services/oferta';
import { getProfesor } from '../../services/profesores';
import { storageController } from '../../services/token';

const BotonesCrudOferta = ({ selectedOfertaId }) => {
    const [isModalAlta, setIsModalAltaOpen] = useState(false);
    const [isModalCambio, setIsModalCambioOpen] = useState(false);
    const [isModalProfesores, setIsModalProfesoresOpen] = useState(false);
    const [form] = Form.useForm();
    const token = storageController.getToken();
    const [profesores, setProfesores] = useState([]);

    useEffect(() => {
        if (selectedOfertaId && isModalCambio) {
            const fetchOferta = async () => {
                try {
                    const oferta = await ofertaService.getOfertaById(token, selectedOfertaId);
                    form.setFieldsValue(oferta);
                } catch (error) {
                    notification.error({
                        message: 'Error al Obtener Oferta',
                        description: 'Hubo un error al obtener los datos de la oferta.',
                    });
                }
            };
            fetchOferta();
        }
    }, [selectedOfertaId, isModalCambio]);

    const showModal = () => {
        setIsModalAltaOpen(true);
    };

    const handleCreateOk = async () => {
        try {
            const values = await form.validateFields();
            await ofertaService.createOferta(token, values);
            notification.success({
                message: 'Oferta Creada',
                description: 'La oferta ha sido creada correctamente.',
            });
            setIsModalAltaOpen(false);
            form.resetFields();
            window.location.reload();
        } catch (error) {
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

    const handleCambioOk = async () => {
        try {
            const values = await form.validateFields();
            await ofertaService.updateOferta(token, selectedOfertaId, values);
            notification.success({
                message: 'Oferta Actualizada',
                description: 'Los datos de la oferta han sido actualizados correctamente.',
            });
            setIsModalCambioOpen(false);
            form.resetFields();
            window.location.reload();
        } catch (error) {
            notification.error({
                message: 'Error al Actualizar Oferta',
                description: 'Hubo un error al actualizar los datos de la oferta.',
            });
        }
    };

    const handleCambioCancel = () => {
        setIsModalCambioOpen(false);
    };

    const fetchProfesoresDetails = async (profesoresIds) => {
        const promises = profesoresIds.map(id => getProfesor(id));
        return await Promise.all(promises);
    };

    const showProfesoresModal = async () => {
        if (selectedOfertaId) {
            try {
                const oferta = await ofertaService.getOfertaById(token, selectedOfertaId);
                const profesoresDetails = await fetchProfesoresDetails(oferta.profesores);
                setProfesores(profesoresDetails);
                setIsModalProfesoresOpen(true);
            } catch (error) {
                notification.error({
                    message: 'Error al Obtener Profesores',
                    description: 'Hubo un error al obtener los datos de los profesores.',
                });
            }
        } else {
            notification.warning({
                message: 'Selecciona una oferta',
                description: 'Para ver los profesores, selecciona una oferta de la lista.',
            });
        }
    };

    const handleProfesoresModalCancel = () => {
        setIsModalProfesoresOpen(false);
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
                        window.location.reload();
                    } catch (error) {
                        notification.error({
                            message: 'Error al Eliminar Oferta',
                            description: 'Hubo un error al eliminar la oferta.',
                        });
                    }
                } else {
                    notification.warning({
                        message: 'Selecciona una oferta',
                        description: 'Para eliminar, selecciona una oferta de la lista.',
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
                <Button
                    type="text"
                    icon={<UserOutlined style={{ color: '#01859a' }} />}
                    onClick={showProfesoresModal}
                    disabled={!selectedOfertaId}
                />
            </Space>

            <Modal title="Crear Nueva Oferta" open={isModalAlta} onOk={handleCreateOk} onCancel={handleCreateCancel}>
                <Form form={form} layout="vertical" name="form_create_oferta">
                    {/* Campos específicos de la oferta */}
                    <Form.Item
                        name="nombre"
                        label="Nombre de la Oferta"
                        rules={[{ required: true, message: 'Por favor ingresa el nombre de la oferta' }]}
                    >
                        <Input />
                    </Form.Item>
                    {/* Más campos aquí */}
                </Form>
            </Modal>

            <Modal title="Editar Oferta" open={isModalCambio} onOk={handleCambioOk} onCancel={handleCambioCancel}>
                <Form form={form} layout="vertical" name="form_edit_oferta">
                    {/* Campos de edición */}
                    <Form.Item
                        name="nombre"
                        label="Nombre de la Oferta"
                        rules={[{ required: true, message: 'Por favor ingresa el nombre de la oferta' }]}
                    >
                        <Input />
                    </Form.Item>
                    {/* Más campos aquí */}
                </Form>
            </Modal>

            <Modal title="Profesores Asignados" open={isModalProfesores} onCancel={handleProfesoresModalCancel} footer={null}>
                <List
                    itemLayout="horizontal"
                    dataSource={profesores}
                    renderItem={profesor => (
                        <List.Item>
                            <List.Item.Meta
                                title={profesor.nombre}
                                description={profesor.email}
                            />
                        </List.Item>
                    )}
                />
            </Modal>
        </>
    );
};

export default BotonesCrudOferta;
