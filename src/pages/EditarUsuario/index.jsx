import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/auth';
import { useAuth } from '../../hooks/useAuth';
import Nav from '../../components/Nav';
import { storageController } from '../../services/token';

const EditarUsuario = () => {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    const token = await storageController.getToken();
    if (!user || !user._id) {
      console.error('ID de usuario no disponible');
      return;
    }
    setLoading(true);
    try {
      const response = await authService.updateUser(token, user._id, values.username, values.email);
      if (response.data) {
        updateUser({ username: values.username, email: values.email });
        message.success('Los cambios se han guardado correctamente');
        setTimeout(() => {
          setLoading(false);
          navigate('/'); // Alternativa: Redirigir a la página de inicio
          navigate(0); // Recarga la página actual
        }, 1000); // Tiempo en milisegundos antes de cerrar sesión automáticamente

      }
    } catch (error) {
      console.error('Error actualizando el usuario:', error);
      setLoading(false);
      message.error('Hubo un problema al guardar los cambios. Por favor, intenta nuevamente.');
    }
  };

  const handleChangePassword = () => {
    navigate('/cambiar-contraseña');
  };

  const handleCancel = () => {
    navigate(-1); // Regresar a la página anterior
  };

  return (
    <>
      <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <h2 style={{ color: 'black' }}>Editar Usuario</h2>
        <Form
          name="edit_user"
          initialValues={{ username: user.username, email: user.email }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Nombre de Usuario"
            name="username"
            rules={[{ required: true, message: 'Por favor ingrese su nuevo nombre de usuario' }]}
          >
            <Input placeholder="Nuevo nombre de usuario" />
          </Form.Item>
          <Form.Item
            label="Correo Electrónico"
            name="email"
            rules={[{ required: true, message: 'Por favor ingrese su nuevo correo electrónico' }]}
          >
            <Input placeholder="Nuevo correo electrónico" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} style={{ backgroundColor: 'green', borderColor: 'green' }}>
              Guardar cambios
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="default" onClick={handleChangePassword} style={{ backgroundColor: 'red', borderColor: 'red', color: 'white' }}>
              Cambiar Contraseñaa
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="default" onClick={handleCancel}>
              Cancelar
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default EditarUsuario;
