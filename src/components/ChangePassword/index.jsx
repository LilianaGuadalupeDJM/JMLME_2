import React, { useState } from "react";
import { Modal, Button } from "antd";
import FormChangePassword from "../FormChangePassword";
import EditarUsuario from "../../pages/EditarUsuario";

const ChangePassword = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f0f0f0'
    }}>
      <EditarUsuario/>
      <Button type="primary" onClick={showModal}>
        Cambiar contraseña
      </Button>
      <Modal
        title="Cambiar contraseña"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={650}
      >
        <FormChangePassword closeModal={handleCancel} />
      </Modal>
      </div>

    </>
  );
};

export default ChangePassword;
