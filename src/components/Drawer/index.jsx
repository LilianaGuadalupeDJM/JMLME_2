import React, { useState } from "react";
import { Drawer, Avatar, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./index.css"; // Asegúrate de importar el archivo CSS
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import avatarImage from '../../assets/user.jpg'; // Importa la imagen del avatar

const DrawerComponent = () => {
    const { user, logout } = useAuth();

    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Avatar
                onClick={showDrawer}
                size={44}
                style={{ backgroundColor: '#040404', cursor: 'pointer' }}
                icon={<UserOutlined />}
            />
            <Drawer title="Mi Perfil" onClose={onClose} open={open} >
                <div className="drawer-content">
                    <div className="drawer-main">
                        <p><span className="label">Nombre:</span> {user.username}</p>
                        <p><span className="label">Email:</span> {user.email}</p>
                        <Button
                            type="secondary"
                            className="modify-button"
                            onClick={() => window.location.href='/contra'}
                        >
                            Modificar datos
                        </Button>
                    </div>
                    <Button
                        type="secondary"
                        className="logout-button"
                        onClick={logout}
                    >
                        Cerrar sesión
                    </Button>
                </div>
            </Drawer>
        </>
    );
};

export default DrawerComponent;

