import React, { useState } from 'react';
import { Button, Space, notification, Modal } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, ReloadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { DropUsuario } from '../../services/users';

const BotonesCrudUsuario = ({ selectedUserId }) => {
    const navigate = useNavigate();
    const [isModalAlta, setIsModalAltaOpen] = useState(false);
    const [isModalCambio, setIsModalCambioOpen] = useState(false);

    const showModal = () => {
        setIsModalAltaOpen(true);
    };

    const handleOk = () => {
        setIsModalAltaOpen(false);
    };

    const handleCancel = () => {
        setIsModalAltaOpen(false);
    };

    const showCambioModal = () => {
        setIsModalCambioOpen(true);
    };

    const handleCambioOk = () => {
        setIsModalCambioOpen(false);
    };

    const handleCambioCancel = () => {
        setIsModalCambioOpen(false);
    };

    const BajaUsuario = async () => {
        if (selectedUserId) {
            try {
                const response = await DropUsuario(selectedUserId);
                console.log('Eliminación exitosa');
                notification.success({
                    message: 'Usuario Eliminado',
                    description: 'Los datos del usuario han sido eliminados correctamente.',
                });
                window.location.reload();
            } catch (error) {
                console.error(error);
                notification.error({
                    message: 'Usuario No Eliminado.',
                    description: 'Error al eliminar usuario.',
                });
            }
        } else {
            alert("Selecciona un usuario para eliminar.");
        }
    };

    const Reload = () => {
        window.location.reload();
    };

    return (
        <>
            <Space>
                <Button
                    type="text"
                    icon={<PlusOutlined style={{ color: '#01859a' }} />}
                    onClick={showModal}
                    disabled={!!selectedUserId}
                />
                <Button
                    type="text"
                    icon={<EditOutlined style={{ color: '#01859a' }} />}
                    onClick={showCambioModal}
                    disabled={!selectedUserId}
                />
                <Button
                    type="text"
                    icon={<DeleteOutlined style={{ color: '#01859a' }} />}
                    onClick={BajaUsuario}
                    disabled={!selectedUserId}
                />
                <Button
                    type="text"
                    icon={<ReloadOutlined style={{ color: '#01859a' }} />}
                    onClick={Reload}
                />
            </Space>

            <Modal title="Alta de Usuario" open={isModalAlta} onOk={handleOk} onCancel={handleCancel}>
                {/* Contenido del modal para alta de usuario */}
            </Modal>
            <Modal title="Editar Usuario" open={isModalCambio} onOk={handleCambioOk} onCancel={handleCambioCancel}>
                {/* Contenido del modal para editar usuario */}
            </Modal>
        </>
    );
};

export default BotonesCrudUsuario;
