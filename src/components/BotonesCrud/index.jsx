import React, { useState } from 'react';
import { Button, Space, notification, Modal } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, ReloadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { DropProfesor } from '../../services/profesores';
import AddProfessor from '../../pages/Alta-Profesor';
import EditProfessor from '../../pages/Profesor';

const BotonesCrud = ({ selectedProfessorId, refreshProfesores }) => {
    const navigate = useNavigate();
    const [isModalalta, setIsModalalta] = useState(false);
    const [isModalcambio, setIsModalcambio] = useState(false);
    const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);

    const showConfirmModal = () => {
        setIsConfirmModalVisible(true);
    };

    const handleConfirmOk = async () => {
        setIsConfirmModalVisible(false);
        if (selectedProfessorId) {
            try {
                const response = await DropProfesor(selectedProfessorId);
                console.log('Eliminación exitosa', response?.data);
                notification.success({
                    message: 'Profesor Eliminado',
                    description: 'Los datos del profesor han sido eliminados correctamente.',
                });
                window.location.reload(); 
            } catch (error) {
                console.error(error);
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
        window.location.reload(); 
    };
    

    const showAltaModal = () => {
        setIsModalalta(true);
    };

    const handleAltaClose = () => {
        setIsModalalta(false);
        window.location.reload(); 
    };

    const showCambioModal = () => {
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
        window.location.reload(); 
    };

    return (
        <>
            <Space>
                <Button
                    type="text"
                    icon={<PlusOutlined style={{ color: '#01859a' }} />}
                    onClick={showAltaModal}
                />
                <Button
                    type="text"
                    icon={<EditOutlined style={{ color: '#01859a' }} />}
                    onClick={showCambioModal}
                    disabled={!selectedProfessorId}
                />
                <Button
                    type="text"
                    icon={<DeleteOutlined style={{ color: '#01859a' }} />}
                    onClick={BajaProfessor}
                    disabled={!selectedProfessorId}
                />
                <Button
                    type="text"
                    icon={<ReloadOutlined style={{ color: '#01859a' }} />}
                    onClick={Reload}
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
