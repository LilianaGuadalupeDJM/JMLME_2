import React, { useState } from 'react';
import { Button, Space, notification, Modal } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, ReloadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
//import { DropUser } from '../../services/users'; 

const BotonesCrudUsuario = ({ selectedUserId }) => {

    

    const BajaUser = async () => {
        if (selectedUserId) {
            try {
                //const response = await DropUser(selectedUserId);
                console.log('Eliminación exitosa', response.data);
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
                    onClick={BajaUser}
                    disabled={!selectedUserId}
                />
                <Button
                    type="text"
                    icon={<ReloadOutlined style={{ color: '#01859a' }} />}
                    onClick={Reload}
                />
            </Space>

            <Modal title="Alta de Usuario" open={isModalAlta} onOk={handleOk} onCancel={handleCancel}>
            </Modal>
            <Modal title="Editar Usuario" open={isModalCambio} onOk={handleCambioOk} onCancel={handleCambioCancel}>
                {selectedUserId && <EditUser id={selectedUserId} onClose={handleCancel} />}
            </Modal>
        </>
    );
};

export default BotonesCrudUsuario;
