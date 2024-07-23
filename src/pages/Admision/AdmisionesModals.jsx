import React from 'react';
import { Modal, Form, Input, Switch, Button, Space } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, ReloadOutlined } from '@ant-design/icons';
import './Admisiones.css';

const AdmisionesModals = ({
  isAddModalVisible, setIsAddModalVisible, handleAddAdmision,
  isViewModalVisible, setIsViewModalVisible, selectedAdmision,
  isEditModalVisible, setIsEditModalVisible, handleEditAdmision,
  isDeleteModalVisible, setIsDeleteModalVisible, handleDeleteAdmision
}) => {
  const [form] = Form.useForm();

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
          onClick={() => selectedAdmision ? setIsEditModalVisible(true) : alert("Selecciona una admision para editar.")}
        />
        <Button
          type="text"
          icon={<DeleteOutlined style={{ color: '#01859a' }} />}
          onClick={() => setIsDeleteModalVisible(true)}
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
    </>
  );
};

export default AdmisionesModals;
