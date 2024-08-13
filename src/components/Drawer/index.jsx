import React, { useState } from "react";
import { Drawer, Avatar, Button, Modal } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./index.css";
import { useAuth } from "../../hooks/useAuth";
import EditarUsuario from "../../pages/EditarUsuario";
import FormChangePassword from "../FormChangePassword";
import avatarImage from '../../assets/user.jpg'; 

const DrawerComponent = () => {
    const { user, logout } = useAuth();
    const [open, setOpen] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [isChangePasswordModalVisible, setIsChangePasswordModalVisible] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    
    const onClose = () => {
        setOpen(false);
    };

    const showEditModal = () => {
        setIsEditModalVisible(true);
    };

    const showChangePasswordModal = () => {
        setIsChangePasswordModalVisible(true);
    };

    const handleEditModalCancel = () => {
        setIsEditModalVisible(false);
    };

    const handleChangePasswordModalCancel = () => {
        setIsChangePasswordModalVisible(false);
    };

    return (
        <>
            <Avatar
                onClick={showDrawer}
                size={44}
                style={{ backgroundColor: '#040404', cursor: 'pointer' }}
                icon={<UserOutlined />}
            />
            <Drawer
                title="Mi Perfil"
                onClose={onClose}
                open={open}
                headerStyle={{ backgroundColor: '#000', color: '#fff' }} 
                bodyStyle={{ backgroundColor: '#000', color: '#fff' }} 
            >
                <div className="drawer-content">
                    <div className="drawer-main">
                        <p><span className="label">Nombre:</span> {user.username}</p>
                        <p><span className="label">Email:</span> {user.email}</p>
                        <p><Button
                            type="primary"
                            className="a-button"
                            onClick={showEditModal}
                        >
                            Editar usuario
                        </Button></p>

                        <p><Button
                            type="primary"
                            className="a-button"
                            onClick={showChangePasswordModal}
                        >
                            Cambiar contraseña
                        </Button></p>
                    </div>
                    <Button
                        type="secondary"
                        className="logout-button"
                        onClick={() => { logout(); navigate('/login'); }}
                    >
                        Cerrar sesión
                    </Button>
                </div>
            </Drawer>
            <Modal
                title="Editar Usuario"
                visible={isEditModalVisible}
                onCancel={handleEditModalCancel}
                footer={null} 
            >
                <EditarUsuario onModalCancel={handleEditModalCancel} />
            </Modal>
            <Modal
                title="Cambiar Contraseña"
                visible={isChangePasswordModalVisible}
                onCancel={handleChangePasswordModalCancel}
                footer={null} l
            >
                <FormChangePassword closeModal={handleChangePasswordModalCancel} />
            </Modal>
        </>
    );
};

export default DrawerComponent;
