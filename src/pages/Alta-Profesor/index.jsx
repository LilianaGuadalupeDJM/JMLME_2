import React, { useState, useEffect } from 'react';
import { AddProfesor } from '../../services/profesores';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, notification, DatePicker, Modal } from 'antd';
import './index.css';

const AddProfessor = ({ isVisible, onClose }) => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [employeeNumber, setEmployeeNumber] = useState('');

    const generateRandomNumber = () => {
        return Math.floor(10000 + Math.random() * 90000);
    };

    useEffect(() => {
        const randomNumber = generateRandomNumber();
        setEmployeeNumber(randomNumber);
        form.setFieldsValue({ numeroEmpleado: randomNumber });
    }, [form]);

    const handleFormSubmit = async (values) => {
        try {
            const response = await AddProfesor(
                values.nombre.toUpperCase(),
                values.apellidos.toUpperCase(),
                values.numeroEmpleado,
                values.correo.toUpperCase(),
                values.fechaNacimiento
            );
            console.log('Registro exitoso', response.data);
            notification.success({
                message: 'Profesor agregado',
                description: 'El nuevo profesor ha sido agregado correctamente.',
                duration: 2,
            });
            onClose();
            navigate('/profesores');
        } catch (error) {
            console.error(error);
            notification.error({
                message: 'Error al agregar profesor.',
                description: 'Ha ocurrido un error al intentar agregar al nuevo profesor.',
                duration: 2,
            });
        }
    };

    return (
        <Modal title="Agregar Profesor" visible={isVisible} onCancel={onClose} footer={null}>
                <Form form={form} onFinish={handleFormSubmit}>
                    <Form.Item name="nombre" label="Nombre" rules={[{ required: true }]}>
                        <Input className="uppercase-input" />
                    </Form.Item>
                    <Form.Item name="apellidos" label="Apellidos" rules={[{ required: true }]}>
                        <Input className="uppercase-input" />
                    </Form.Item>
                    <Form.Item name="numeroEmpleado" label="Número de Empleado" rules={[{ required: true }]}>
                        <Input disabled />
                    </Form.Item>
                    <Form.Item name="correo" label="Correo" rules={[{ required: true, type: 'email' }]}>
                        <Input className="uppercase-input" />
                    </Form.Item>
                    <Form.Item name="fechaNacimiento" label="Fecha de Nacimiento" rules={[{ required: true }]}>
                        <DatePicker />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Guardar
                        </Button>
                    </Form.Item>
                </Form>
        </Modal>
    );
};

export default AddProfessor;
