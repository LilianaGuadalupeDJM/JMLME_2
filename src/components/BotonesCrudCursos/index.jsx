import React, { useState, useEffect } from 'react';
import { Button, Space, notification, Modal, Form, Input, InputNumber, Select } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, ReloadOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { cursosService } from '../../services/Cursos';
import { storageController } from '../../services/token';

const BotonesCrudCursos = ({ selectedCursoId }) => {
    const [isModalAlta, setIsModalAltaOpen] = useState(false);
    const [isModalCambio, setIsModalCambioOpen] = useState(false);
    const [form] = Form.useForm();
    const [profesores, setProfesores] = useState([]);
    const [selectedCurso, setSelectedCurso] = useState(null);
    const token = storageController.getToken();

    useEffect(() => {
        const fetchProfesores = async () => {
            try {
                const data = await cursosService.getProfesores();
                setProfesores(data);
            } catch (error) {
                console.error('Error al obtener profesores: ', error);
            }
        };

        fetchProfesores();
    }, []);

    useEffect(() => {
        if (selectedCurso && isModalCambio) {
            console.log('Configurando valores del formulario:', selectedCurso);
            form.setFieldsValue({
                nombre: selectedCurso.nombre,
                descripcion: selectedCurso.descripcion,
                duracion: selectedCurso.duracion,
                profesor: selectedCurso.profesor?._id
            });
        }
    }, [selectedCurso, isModalCambio]);

    const showModal = () => {
        setIsModalAltaOpen(true);
    };

    const handleCreateOk = async () => {
        try {
            const values = await form.validateFields();
            const { nombre, descripcion, duracion, profesor } = values;
            await cursosService.addCurso({ nombre, descripcion, duracion, profesor }, token);
            notification.success({
                message: 'Curso Creado',
                description: 'El curso ha sido creado correctamente.',
            });
            setIsModalAltaOpen(false);
            form.resetFields();
            // Call refreshCursos to refresh the list
        } catch (error) {
            console.error('Error al crear el curso:', error);
            notification.error({
                message: 'Error al Crear Curso',
                description: 'Hubo un error al crear el curso.',
            });
        }
    };

    const handleCreateCancel = () => {
        setIsModalAltaOpen(false);
    };

    const showCambioModal = async () => {
        if (selectedCursoId) {
            try {
                const curso = await cursosService.getCurso(selectedCursoId);
                setSelectedCurso(curso);
                setIsModalCambioOpen(true);
            } catch (error) {
                console.error('Error al obtener el curso:', error);
                notification.error({
                    message: 'Error al Obtener Curso',
                    description: 'Hubo un error al obtener los datos del curso.',
                });
            }
        } else {
            notification.warning({
                message: 'Selecciona un curso',
                description: 'Para editar, selecciona un curso de la lista.',
            });
        }
    };

    const handleCambioOk = async () => {
        try {
            const values = await form.validateFields();
            Modal.confirm({
                title: 'Confirmar actualización',
                icon: <ExclamationCircleOutlined />,
                content: '¿Estás seguro de que deseas actualizar este curso?',
                onOk: async () => {
                    try {
                        await cursosService.editCurso(selectedCursoId, values, token);
                        notification.success({
                            message: 'Curso Actualizado',
                            description: 'Los datos del curso han sido actualizados correctamente.',
                        });
                        setIsModalCambioOpen(false);
                        form.resetFields(); // Limpiar campos del formulario después de la actualización
                        // Call refreshCursos to refresh the list
                    } catch (error) {
                        console.error('Error al actualizar el curso:', error);
                        notification.error({
                            message: 'Error al Actualizar Curso',
                            description: 'Hubo un error al actualizar los datos del curso.',
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
            title: '¿Está seguro que desea eliminar este curso?',
            content: 'Esta acción no se puede deshacer.',
            okText: 'Sí, eliminar',
            okType: 'danger',
            cancelText: 'Cancelar',
            onOk: async () => {
                if (selectedCursoId) {
                    try {
                        await cursosService.deleteCurso(selectedCursoId, token);
                        notification.success({
                            message: 'Curso Eliminado',
                            description: 'El curso ha sido eliminado correctamente.',
                        });
                        // Call refreshCursos to refresh the list
                    } catch (error) {
                        console.error('Error al eliminar el curso:', error);
                        notification.error({
                            message: 'Error al Eliminar Curso',
                            description: 'Hubo un error al eliminar el curso.',
                        });
                    }
                } else {
                    notification.warning({
                        message: 'Selecciona un curso',
                        description: 'Para eliminar, selecciona un curso de la lista.',
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
                    disabled={!selectedCursoId}
                />
                <Button
                    type="text"
                    icon={<DeleteOutlined style={{ color: '#01859a' }} />}
                    onClick={confirmDeletion}
                    disabled={!selectedCursoId}
                />
                <Button
                    type="text"
                    icon={<ReloadOutlined style={{ color: '#01859a' }} />}
                    onClick={Reload}
                />
            </Space>

            <Modal title="Crear Nuevo Curso" open={isModalAlta} onOk={handleCreateOk} onCancel={handleCreateCancel}>
                <Form form={form} layout="vertical" name="form_create_curso">
                    <Form.Item
                        name="nombre"
                        label="Nombre del Curso"
                        rules={[{ required: true, message: 'Por favor ingresa el nombre del curso' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="descripcion"
                        label="Descripción"
                        rules={[{ required: true, message: 'Por favor ingresa la descripción del curso' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="duracion"
                        label="Duración"
                        rules={[{ required: true, message: 'Por favor ingresa la duración del curso' }]}
                    >
                        <InputNumber />
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
                </Form>
            </Modal>

            <Modal title="Editar Curso" open={isModalCambio} onOk={handleCambioOk} onCancel={handleCambioCancel}>
                <Form form={form} layout="vertical" name="form_edit_curso">
                    <Form.Item
                        name="nombre"
                        label="Nombre del Curso"
                        rules={[{ required: true, message: 'Por favor ingresa el nombre del curso' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="descripcion"
                        label="Descripción"
                        rules={[{ required: true, message: 'Por favor ingresa la descripción del curso' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="duracion"
                        label="Duración"
                        rules={[{ required: true, message: 'Por favor ingresa la duración del curso' }]}
                    >
                        <InputNumber />
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
                </Form>
            </Modal>
        </>
    );
};

export default BotonesCrudCursos;
