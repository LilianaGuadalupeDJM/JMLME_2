import React, { useState, useEffect } from 'react';
import { Button, Space, notification, Modal, Form, Input, Select, Switch } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, ReloadOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { ofertaService } from '../../services/oferta';
import { profesoresService } from '../../services/profesores'; 
import { storageController } from '../../services/token';

const BotonesCrudOferta = ({ selectedOfertaId }) => {
    const [isModalAlta, setIsModalAltaOpen] = useState(false);
    const [isModalCambio, setIsModalCambioOpen] = useState(false);
    const [form] = Form.useForm();
    const token = storageController.getToken();
    const [profesores, setProfesores] = useState([]);
    const [selectedOferta, setSelectedOferta] = useState(null);

    useEffect(() => {
        const fetchProfesores = async () => {
            try {
                const data = await profesoresService.getProfesores();
                setProfesores(data);
            } catch (error) {
                notification.error({
                    message: 'Error al Obtener Profesores',
                    description: 'Hubo un error al obtener los datos de los profesores.',
                });
            }
        };

        fetchProfesores();
    }, []);

    useEffect(() => {
        if (selectedOfertaId && isModalCambio) {
            const fetchOferta = async () => {
                try {
                    const oferta = await ofertaService.getOfertaById(token, selectedOfertaId);
                    setSelectedOferta(oferta);
                    form.setFieldsValue({
                        nombre: oferta.nombre,
                        descripcion: oferta.descripcion,
                        profesor: oferta.profesor?._id,
                        activo: oferta.activo, // Cargar el valor de "activo" en el formulario
                    });
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
        if (selectedOfertaId) {
            setIsModalCambioOpen(true);
        } else {
            notification.warning({
                message: 'Selecciona una oferta',
                description: 'Para editar, selecciona una oferta de la lista.',
            });
        }
    };

    const handleCambioOk = async () => {
        try {
            const values = await form.validateFields();
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
                        form.resetFields();
                        window.location.reload();
                    } catch (error) {
                        notification.error({
                            message: 'Error al Actualizar Oferta',
                            description: 'Hubo un error al actualizar los datos de la oferta.',
                        });
                    }
                },
            });
        } catch (error) {
            notification.error({
                message: 'Error en la Validación',
                description: 'Hubo un error en la validación de los campos.',
            });
        }
    };

    const handleCambioCancel = () => {
        setIsModalCambioOpen(false);
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
                    onClick={() => window.location.reload()}
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
                        name="descripcion"
                        label="Descripción"
                        rules={[{ required: true, message: 'Por favor ingresa la descripción de la oferta' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="profesor"
                        label="Profesor"
                        rules={[{ required: true, message: 'Por favor selecciona un profesor' }]}
                    >
                        <Select placeholder="Selecciona un profesor">
                            {profesores.map(profesor => (
                                <Select.Option key={profesor._id} value={profesor._id}>
                                    {profesor.nombre}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="activo"
                        label="Activo"
                        valuePropName="checked"
                        initialValue={true}
                    >
                        <Switch defaultChecked />
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
                        name="descripcion"
                        label="Descripción"
                        rules={[{ required: true, message: 'Por favor ingresa la descripción de la oferta' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="profesor"
                        label="Profesor"
                        rules={[{ required: true, message: 'Por favor selecciona un profesor' }]}
                    >
                        <Select placeholder="Selecciona un profesor">
                            {profesores.map(profesor => (
                                <Select.Option key={profesor._id} value={profesor._id}>
                                    {profesor.nombre}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="activo"
                        label="Activo"
                        valuePropName="checked"
                        initialValue={selectedOferta?.activo}
                    >
                        <Switch defaultChecked={selectedOferta?.activo} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default BotonesCrudOferta;
