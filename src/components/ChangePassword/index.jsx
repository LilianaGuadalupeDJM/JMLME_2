import React, { useState } from "react";
import { Modal, Button } from "antd";
import FormChangePassword from "../FormChangePassword";

const ChangePassword = ({ onModalCancel }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        if (onModalCancel) {
            onModalCancel();
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        if (onModalCancel) {
            onModalCancel();
        }
    };

    return (
        <>
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
        </>
    );
};

export default ChangePassword;
