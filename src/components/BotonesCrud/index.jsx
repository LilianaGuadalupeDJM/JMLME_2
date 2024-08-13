import React, { useState } from 'react';
import { Button, Space, notification, Modal } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, ReloadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { DropProfesor } from '../../services/profesores';
import AddProfessor from '../../pages/Alta-Profesor';
import EditProfessor from '../../pages/Profesor';
import { storageController } from '../../services/token'; // Importamos el storageController para verificar el token

const BotonesCrud = ({ selectedProfessorId, refreshProfesores }) => {
    const navigate = useNavigate();
    const [isModalalta, setIsModalalta] = useState(false);
    const [isModalcambio, setIsModalcambio] = useState(false);
    const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);

    const token = storageController.getToken(); // Obtenemos el token

    const showConfirmModal = () => {
        if (!token) return; // Si no hay token, no hacer nada
        setIsConfirmModalVisible(true);
    };

    const handleConfirmOk = async () => {
        setIsConfirmModalVisible(false);
        if (selectedProfessorId && token) { // Verificamos que haya un token
            try {
                const response = await DropProfesor(selectedProfessorId);
                notification.success({
                    message: 'Profesor Eliminado',
                    description: 'Los datos del profesor han sido eliminados correctamente.',
                });
                refreshProfesores(); // Refresca la lista de profesores en lugar de recargar la página
            } catch (error) {
                notification.error({
                    message: 'Error de Eliminación',
                    description: 'Error al eliminar el profesor.',
                });
            }
        } else {
            notification.warning({
                message: 'Selección Requerida',
                description: 'Selecciona un profesor para eliminar.',
            });
        }
    };

    const handleConfirmCancel = () => {
        setIsConfirmModalVisible(false);
    };

    const BajaProfessor = async () => {
        if (!token) return; // Si no hay token, no hacer nada
        if (selectedProfessorId) {
            showConfirmModal();
        } else {
            notification.warning({
                message: 'Selección Requerida',
                description: 'Selecciona un profesor para eliminar.',
            });
        }
    };

    const Reload = () => {
        if (!token) return; // Si no hay token, no hacer nada
        refreshProfesores(); // Refresca la lista de profesores en lugar de recargar la página
    };

    const showAltaModal = () => {
        if (!token) return; // Si no hay token, no hacer nada
        setIsModalalta(true);
    };

    const handleAltaClose = () => {
        setIsModalalta(false);
        refreshProfesores(); // Refresca la lista de profesores en lugar de recargar la página
    };

    const showCambioModal = () => {
        if (!token) return; // Si no hay token, no hacer nada
        if (selectedProfessorId) {
            setIsModalcambio(true);
        } else {
            notification.warning({
                message: 'Selección Requerida',
                description: 'Selecciona un profesor para editar.',
            });
        }
    };

    const handleCambioClose = () => {
        setIsModalcambio(false);
        refreshProfesores(); // Refresca la lista de profesores en lugar de recargar la página
    };

    return (
        <>
            <Space>
                <Button
                    type="text"
                    icon={<PlusOutlined style={{ color: '#01859a' }} />}
                    onClick={showAltaModal}
                    disabled={!token} // Deshabilita el botón si no hay token
                />
                <Button
                    type="text"
                    icon={<EditOutlined style={{ color: '#01859a' }} />}
                    onClick={showCambioModal}
                    disabled={!selectedProfessorId || !token} // Deshabilita el botón si no hay selección o token
                />
                <Button
                    type="text"
                    icon={<DeleteOutlined style={{ color: '#01859a' }} />}
                    onClick={BajaProfessor}
                    disabled={!selectedProfessorId || !token} // Deshabilita el botón si no hay selección o token
                />
                <Button
                    type="text"
                    icon={<ReloadOutlined style={{ color: '#01859a' }} />}
                    onClick={Reload}
                    disabled={!token} // Deshabilita el botón si no hay token
                />
            </Space>

            <AddProfessor isVisible={isModalalta} onClose={handleAltaClose} />
            {selectedProfessorId && <EditProfessor isVisible={isModalcambio} onClose={handleCambioClose} id={selectedProfessorId} />}

            <Modal
                title="Confirmación de Eliminación"
                visible={isConfirmModalVisible}
                onOk={handleConfirmOk}
                onCancel={handleConfirmCancel}
                okText="Sí, eliminar"
                cancelText="No, cancelar"
            >
                <p>¿Estás seguro de que deseas eliminar este profesor?</p>
            </Modal>
        </>
    );
};

export default BotonesCrud;
