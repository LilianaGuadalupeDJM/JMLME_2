import React, { useState, useRef } from "react";
import { Form, Input, Button, message } from "antd";
import { validatePassword } from "../../utils/validation";
import { usersService } from "../../services/users";
import { storageController } from "../../services/token";

const ChangePasswordForm = ({ userId, closeModal }) => {
    const [loading, setLoading] = useState(false);
    const [changeError, setChangeError] = useState(false);
    const formRef = useRef(null);

    const onFinish = async (values) => {
        setLoading(true);
        setChangeError(false);

        try {
            const token = await storageController.getToken();

            const { "password-actual": currentPassword, "password-repet": newPassword } = values;
            console.log('Values form', values)

            const response = await usersService.changePassword(token, currentPassword, newPassword);
            console.log('Password changed successfully', response);
            message.success('Contraseña cambiada correctamente');
            closeModal()
            formRef.current.resetFields();

        } catch (error) {
            console.error('Error changing password', error);
            setChangeError(true);
        } finally {
            setLoading(false);
        }
    };



    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
        setChangeError(true);
    };

    return (
        <Form
        ref={formRef}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={{}}
        style={{ maxWidth: 800, marginTop: 40 }}
    >
        <Form.Item
            name="password-actual"
            label="Contraseña actual"
            rules={[{ required: true, message: 'Por favor ingresa tu contraseña actual' }]}
        >
            <Input.Password

                type="password"

            />
        </Form.Item>
        <Form.Item
            name="password-new"
            label="Contraseña nueva"
            rules={[
                {
                    required: true,
                    message: 'Por favor ingrese su contraseña',
                },
            ]}
        >
            <Input.Password

                type="password"

            />
        </Form.Item>

        <Form.Item
            name="password-repet"
            label="Repetir contraseña nueva"
            rules={[
                {
                    required: true,
                    message: 'Por favor repita su contraseña',
                },
               
            ]}
        >
            <Input.Password

                type="password"

            />
        </Form.Item>
        {changeError && (
            <Form.Item wrapperCol={{ offset: 8, span: 14 }}>
                <div style={{ color: 'red' }}>Error al cambiar la contraseña. Por favor, inténtelo de nuevo.</div>
            </Form.Item>
        )}
        <Form.Item

            style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}
        >
            <Button type="primary" htmlType="submit" style={{ width: 250, fontSize: 16, height: 35 }} loading={loading}>
                Guardar
            </Button>
        </Form.Item>
    </Form>
    );
};

export default ChangePasswordForm;