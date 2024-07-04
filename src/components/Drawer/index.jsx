import React, { useState } from "react";
import { Drawer, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./index.css"; // Asegúrate de importar el archivo CSS
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";

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
                style={{ backgroundColor: '#87d068', cursor: 'pointer' }}
                icon={<UserOutlined />}
            />
            <Drawer title="Mi Perfil" onClose={onClose} open={open} >
                <div className="drawer-content">
                    <p>nombre: {user.username} </p>
                    <p>correo: {user.email} </p>
                    <p><Link to="/cambiar-datos">Modificar</Link></p>
                </div>
            </Drawer>
        </>
    );
};

export default DrawerComponent;
