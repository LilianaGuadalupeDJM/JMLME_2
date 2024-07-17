import React, { useState, useEffect } from 'react';
import { AddProfesor } from '../../services/profesores';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, notification, DatePicker } from 'antd';
import './index.css';

const AddProfessor = () => {
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
            const response = await AddProfesor(values.nombre.toUpperCase(), values.apellidos.toUpperCase(), values.numeroEmpleado, values.correo.toUpperCase(), values.fechaNacimiento);
            console.log('Registro exitoso', response.data);
            notification.success({
                message: 'Profesor agregado',
                description: 'El nuevo profesor ha sido agregado correctamente.',
            });
            navigate('/profesores');
        } catch (error) {
            console.error(error);
            notification.error({
                message: 'Error al agregar profesor.',
                description: 'Ha ocurrido un error al intentar agregar al nuevo profesor.',
            });
        }
    };

    return (
        <div className="add-professor-container">
            <h2>Agregar Profesor</h2>
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
        </div>
    );
};

export default AddProfessor;
