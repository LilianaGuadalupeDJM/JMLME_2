import React, { useState } from 'react';
import { Modal, Form, Input, Switch, Button, Space, notification } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, ReloadOutlined } from '@ant-design/icons';
import './Admisiones.css';

const AdmisionesModals = ({
  isAddModalVisible, setIsAddModalVisible, handleAddAdmision,
  isViewModalVisible, setIsViewModalVisible, selectedAdmision,
  isEditModalVisible, setIsEditModalVisible, handleEditAdmision,
  isDeleteModalVisible, setIsDeleteModalVisible, handleDeleteAdmision
}) => {
  const [form] = Form.useForm();
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);

  const handleAddOk = () => {
    form.validateFields().then(values => {
      handleAddAdmision(values);
      form.resetFields();
    }).catch(info => {
      console.log('Validate Failed:', info);
    });
  };

  const handleEditOk = () => {
    form.validateFields().then(values => {
      handleEditAdmision(values);
      form.resetFields();
    }).catch(info => {
      console.log('Validate Failed:', info);
    });
  };

  const handleDeleteOk = () => {
    handleDeleteAdmision();
    setIsDeleteModalVisible(false);
  };

  const handleEditClick = () => {
    if (selectedAdmision) {
      setIsEditModalVisible(true);
    } else {
      notification.warning({
        message: 'Selección Requerida',
        description: 'Selecciona una admision para editar.',
      });
    }
  };

  const handleDeleteClick = () => {
    if (selectedAdmision) {
      setIsConfirmModalVisible(true);
    } else {
      notification.warning({
        message: 'Selección Requerida',
        description: 'Selecciona una admision para eliminar.',
      });
    }
  };

  const handleConfirmOk = () => {
    setIsConfirmModalVisible(false);
    handleDeleteOk();
  };

  const handleConfirmCancel = () => {
    setIsConfirmModalVisible(false);
  };

  return (
    <>
      <Space>
        <Button
          type="text"
          icon={<PlusOutlined style={{ color: '#01859a' }} />}
          onClick={() => setIsAddModalVisible(true)}
        />
        <Button
          type="text"
          icon={<EditOutlined style={{ color: '#01859a' }} />}
          onClick={handleEditClick}
        />
        <Button
          type="text"
          icon={<DeleteOutlined style={{ color: '#01859a' }} />}
          onClick={handleDeleteClick}
          disabled={!selectedAdmision}
        />
        <Button
          type="text"
          icon={<ReloadOutlined style={{ color: '#01859a' }} />}
          onClick={() => window.location.reload()}
        />
      </Space>

      <Modal
        className="admisiones-modal"
        title="Agregar Admision"
        open={isAddModalVisible}
        onOk={handleAddOk}
        onCancel={() => setIsAddModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="nombre" label="Nombre" rules={[{ required: true, message: 'Por favor ingrese el nombre' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="activo" label="Activo" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        className="admisiones-modal"
        title="Ver Admision"
        open={isViewModalVisible}
        onCancel={() => setIsViewModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsViewModalVisible(false)}>Cerrar</Button>
        ]}
      >
        <p><strong>Nombre:</strong> {selectedAdmision?.nombre}</p>
        <p><strong>Activo:</strong> {selectedAdmision?.activo ? 'Sí' : 'No'}</p>
      </Modal>

      <Modal
        className="admisiones-modal"
        title="Editar Admision"
        open={isEditModalVisible}
        onOk={handleEditOk}
        onCancel={() => setIsEditModalVisible(false)}
      >
        <Form form={form} layout="vertical" initialValues={{ nombre: selectedAdmision?.nombre, activo: selectedAdmision?.activo }}>
          <Form.Item name="nombre" label="Nombre" rules={[{ required: true, message: 'Por favor ingrese el nombre' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="activo" label="Activo" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        className="admisiones-modal"
        title="Eliminar Admision"
        open={isDeleteModalVisible}
        onOk={handleDeleteOk}
        onCancel={() => setIsDeleteModalVisible(false)}
        okText="Eliminar"
        okType="danger"
      >
        <p>¿Estás seguro que quieres eliminar esta admisión?</p>
        <p><strong>Nombre:</strong> {selectedAdmision?.nombre}</p>
      </Modal>

      <Modal
        title="Confirmación de Eliminación"
        visible={isConfirmModalVisible}
        onOk={handleConfirmOk}
        onCancel={handleConfirmCancel}
        okText="Sí, eliminar"
        cancelText="No, cancelar"
      >
        <p>¿Estás seguro que quieres eliminar esta admisión?</p>
      </Modal>
    </>
  );
};

export default AdmisionesModals;
