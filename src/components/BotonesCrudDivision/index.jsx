// src/components/BotonesCrudDivision.jsx
import React, { useState, useEffect } from 'react';
import { Button, Space, notification, Modal, Form, Input, Select, Switch } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, ReloadOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { addDivision, editDivision, deleteDivision, getAllOfertas, getDivision } from '../../services/divicion'; // Asegúrate de que la ruta del servicio sea correcta

const { Option } = Select;

const BotonesCrudDivision = ({ selectedDivisionId, refreshDivisions }) => {
    const [isModalAlta, setIsModalAltaOpen] = useState(false);
    const [isModalCambio, setIsModalCambioOpen] = useState(false);
    const [form] = Form.useForm();
    const [ofertas, setOfertas] = useState([]);

    useEffect(() => {
        const fetchOfertas = async () => {
            try {
                const data = await getAllOfertas();
                setOfertas(data);
            } catch (error) {
                //.error('Error al obtener ofertas educativas:', error);
            }
        };
        fetchOfertas();
    }, []);

    useEffect(() => {
        if (selectedDivisionId) {
            const fetchDivision = async () => {
                try {
                    const division = await getDivision(selectedDivisionId);
                    form.setFieldsValue({
                        nombre: division.nombre,
                        descripcion: division.descripcion,
                        ofertasEducativas: division.ofertasEducativas,
                    });
                } catch (error) {
                    //.error('Error al obtener la división:', error);
                }
            };
            fetchDivision();
        }
    }, [selectedDivisionId, form]);

    const confirmDeletion = () => {
        Modal.confirm({
            title: '¿Está seguro que desea eliminar esta división?',
            content: 'Esta acción no se puede deshacer.',
            okText: 'Sí, eliminar',
            okType: 'danger',
            cancelText: 'Cancelar',
            onOk: async () => {
                if (selectedDivisionId) {
                    try {
                        await deleteDivision(selectedDivisionId);
                        notification.success({
                            message: 'División Eliminada',
                            description: 'Los datos de la división han sido eliminados correctamente.',
                        });
                        refreshDivisions(); // Actualiza la lista de divisiones
                    } catch (error) {
                        notification.error({
                            message: 'División No Eliminada',
                            description: 'Error al eliminar división.',
                        });
                    }
                } else {
                    notification.warning({
                        message: 'Selección Necesaria',
                        description: 'Selecciona una división para eliminar.',
                    });
                }
            },
        });
    };

    const showModal = () => {
        setIsModalAltaOpen(true);
    };

    const handleOk = async () => {
        try {
            const values = form.getFieldsValue();
            await addDivision(values);
            notification.success({
                message: 'División Agregada',
                description: 'La división ha sido agregada correctamente.',
            });
            setIsModalAltaOpen(false);
            form.resetFields();
            refreshDivisions(); // Actualiza la lista de divisiones
        } catch (error) {
            notification.error({
                message: 'Error al Agregar División',
                description: 'Hubo un problema al intentar agregar la división.',
            });
        }
    };

    const handleCancel = () => {
        setIsModalAltaOpen(false);
    };

    const showCambioModal = () => {
        setIsModalCambioOpen(true);
    };

    const handleCambioOk = async () => {
        form.validateFields()
            .then(async values => {
                Modal.confirm({
                    title: 'Confirmar actualización',
                    icon: <ExclamationCircleOutlined />,
                    content: '¿Estás seguro de que deseas actualizar esta división?',
                    onOk: async () => {
                        try {
                            await editDivision(selectedDivisionId, values);
                            notification.success({
                                message: 'División Actualizada',
                                description: 'Los datos de la división han sido actualizados correctamente.',
                            });
                            setIsModalCambioOpen(false);
                            refreshDivisions(); // Actualiza la lista de divisiones
                        } catch (error) {
                            notification.error({
                                message: 'Error al Actualizar División',
                                description: 'Hubo un error al actualizar los datos de la división.',
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
                    disabled={!selectedDivisionId}
                />
                <Button
                    type="text"
                    icon={<DeleteOutlined style={{ color: '#01859a' }} />}
                    onClick={confirmDeletion}
                    disabled={!selectedDivisionId}
                />
                <Button
                    type="text"
                    icon={<ReloadOutlined style={{ color: '#01859a' }} />}
                    onClick={refreshDivisions}
                />
            </Space>

            <Modal
                title="Agregar Nueva División"
                visible={isModalAlta}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form
                    form={form}
                    layout="vertical"
                >
                    <Form.Item
                        name="nombre"
                        label="Nombre"
                        rules={[{ required: true, message: 'Por favor ingrese el nombre de la división.' }]}
                    >
                        <Input placeholder="Nombre de la división" />
                    </Form.Item>
                    <Form.Item
                        name="descripcion"
                        label="Descripción"
                    >
                        <Input.TextArea placeholder="Descripción de la división" />
                    </Form.Item>
                    <Form.Item
                        name="ofertasEducativas"
                        label="Ofertas Educativas"
                        rules={[{ required: true, message: 'Por favor seleccione al menos una oferta educativa.' }]}
                    >
                        <Select mode="multiple" placeholder="Seleccione ofertas educativas">
                            {ofertas.map( oferta => (
                                <Option key={oferta._id} value={oferta._id}>{oferta.nombre}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title="Editar División"
                visible={isModalCambio}
                onOk={handleCambioOk}
                onCancel={handleCambioCancel}
            >
                <Form
                    form={form}
                    layout="vertical"
                >
                    <Form.Item
                        name="nombre"
                        label="Nombre"
                        rules={[{ required: true, message: 'Por favor ingrese el nombre de la división.' }]}
                    >
                        <Input placeholder="Nombre de la división" />
                    </Form.Item>
                    <Form.Item
                        name="descripcion"
                        label="Descripción"
                    >
                        <Input.TextArea placeholder="Descripción de la división" />
                    </Form.Item>
                    <Form.Item
                        name="ofertasEducativas"
                        label="Ofertas Educativas"
                        rules={[{ required: true, message: 'Por favor seleccione al menos una oferta educativa.' }]}
                    >
                        <Select mode="multiple" placeholder="Seleccione ofertas educativas">
                            {ofertas.map(oferta => (
                                <Option key={oferta._id} value={oferta._id}>{oferta.nombre}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default BotonesCrudDivision;
