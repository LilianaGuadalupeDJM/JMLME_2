import React, { useEffect, useState, useContext } from 'react';
import { Modal, notification, Form, Input, Select, Button } from 'antd';
import usersService from '../../services/users'; // Aquí

import { AuthContext } from '../../context/AuthContext';

const CreateUserModal = ({ isVisible, handleCancel, fetchUsers }) => {
    const [roles, setRoles] = useState([]);
    const [form] = Form.useForm();
    const { token } = useContext(AuthContext);

    useEffect(() => {
        fetchRoles();
    }, []);

    const fetchRoles = async () => {
        try {
            const rolesData = await usersService.getRoles();
            setRoles(rolesData);
        } catch (error) {
            console.error('Error al obtener los roles:', error);
        }
    };

    const handleAddUser = async (newUser) => {
        try {
            await usersService.createUser(newUser, token);
            fetchUsers();
            handleCancel();
            form.resetFields();
            notification.success({
                message: 'Usuario Agregado',
                description: 'Usuario agregado correctamente.',
            });
        } catch (error) {
            console.error('Error al agregar el usuario:', error);
            notification.error({
                message: 'Error',
                description: 'Error al agregar el usuario.',
            });
        }
    };

    const validateEmail = (rule, value) => {
        if (!value) {
            return Promise.resolve();
        }
        const existingUser = users.find(u => u.email === value);
        if (existingUser) {
            return Promise.reject('El correo electrónico ya está registrado');
        }
        return Promise.resolve();
    };

    return (
        <Modal
            title="Agregar Usuario"
            visible={isVisible}
            onCancel={handleCancel}
            footer={null}
        >
            <Form
                form={form}
                onFinish={handleAddUser}
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Por favor ingrese el nombre de usuario' }]}
                >
                    <Input placeholder="Nombre de usuario" />
                </Form.Item>
                <Form.Item
                    name="email"
                    rules={[
                        { required: true, message: 'Por favor ingrese el correo electrónico' },
                        { validator: validateEmail }
                    ]}
                >
                    <Input type="email" placeholder="Correo electrónico" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Por favor ingrese la contraseña' }]}
                >
                    <Input.Password placeholder="Contraseña" />
                </Form.Item>
                <Form.Item
                    name="roles"
                    rules={[{ required: true, message: 'Por favor seleccione al menos un rol' }]}
                >
                    <Select mode="multiple" placeholder="Seleccionar roles">
                        {roles.map(role => (
                            <Select.Option key={role.name} value={role.name}>
                                {role.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Agregar
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateUserModal;
