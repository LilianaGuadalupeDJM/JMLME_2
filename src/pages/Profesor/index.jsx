import React, { useEffect, useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { getProfesor, EditProfesor } from '../../services/profesores';
import { useNavigate } from 'react-router-dom';
import './index.css';

const EditProfessor = ({ id, onClose }) => {
    const [professorData, setProfessorData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfessorData = async () => {
            try {
                const data = await getProfesor(id);
                setProfessorData(data);
            } catch (error) {
                notification.error({
                    message: 'Error al obtener profesor',
                    description: error.message,
                });
            } finally {
                setLoading(false);
            }
        };

        fetchProfessorData();
    }, [id]);

    const handleFormSubmit = async (values) => {
        try {
            const response = await EditProfesor(
                id,
                values.nombre.toUpperCase(),
                values.apellidos.toUpperCase(),
                values.numeroEmpleado,
                values.correo.toUpperCase(),
                values.fechaNacimiento
            );
            console.log('Registro exitoso', response.data);
            notification.success({
                message: 'Profesor actualizado',
                description: 'Los datos del profesor han sido actualizados correctamente.',
            });
            onClose();  // Cierra el modal después de guardar
            navigate('/profesores');
        } catch (error) {
            console.error(error);
            notification.error({
                message: 'Profesor no actualizado.',
                description: 'Error al actualizar profesor.',
            });
        }
    };

    if (loading) {
        return <p>Cargando datos del profesor...</p>;
    }

    return (
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
            <h2>Editar Profesor</h2>
            {professorData ? (
                <Form initialValues={professorData} onFinish={handleFormSubmit}>
                    <Form.Item name="nombre" label="Nombre" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="apellidos" label="Apellidos" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="numeroEmpleado" label="Número de Empleado" rules={[{ required: true }]}>
                        <Input disabled />
                    </Form.Item>
                    <Form.Item name="correo" label="Correo" rules={[{ required: true, type: 'email' }]}>
                        <Input disabled />
                    </Form.Item>
                    <Form.Item name="fechaNacimiento" label="Fecha de Nacimiento" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Guardar
                        </Button>
                    </Form.Item>
                </Form>
            ) : (
                <p>No se encontraron datos del profesor.</p>
            )}
        </div>
    );
};

export default EditProfessor;
