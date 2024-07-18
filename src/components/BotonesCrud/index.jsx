import React, { useState } from 'react';
import { Button, Space, notification, Modal } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, ReloadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { DropProfesor } from '../../services/profesores';
import AddProfessor from '../../pages/Alta-Profesor';
import EditProfessor from '../../pages/Profesor';

const BotonesCrud = ({ selectedProfessorId }) => {
    const navigate = useNavigate();

    const AltaClick = () => {
        navigate('/alta-professor');
    };

    const handleEditClick = () => {
        if (selectedProfessorId) {
            navigate(`/edit-professor/${selectedProfessorId}`);
        } else {
            alert("Selecciona un profesor para editar.");
        }
    };

    const BajaProfessor = async () => {
        if (selectedProfessorId) {
            try {
                const response = await DropProfesor(selectedProfessorId);
                console.log('Eliminacion exitosa', response.data);
                notification.success({
                    message: 'Profesor Eliminado',
                    description: 'Los datos del profesor han sido eliminados correctamente.',
                });
                window.location.reload();
            } catch (error) {
                console.error(error);
                notification.error({
                    message: 'Profesor No Eliminado.',
                    description: 'Error al Eliminar Profesor.',
                });
            }
        } else {
            alert("Selecciona un profesor para eliminar.");
        }
    };

    const Reload = () => {
        window.location.reload();
    }

    const [isModalalta, setIsModalOpen] = useState(false);
    const [isModalcambio, setIsModalcambio] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const showcambioModal = () => {
        setIsModalcambio(true);
    };

    const handlcambioeOk = () => {
        setIsModalcambio(false);
    };

    const handlecambioCancel = () => {
        setIsModalcambio(false);
    };

    return (
        <>
            <Space>
                <Button
                    type="text"
                    icon={<PlusOutlined style={{ color: '#01859a' }} />}
                    onClick={showModal}
                    disabled={!!selectedProfessorId}
                />
                <Button
                    type="text"
                    icon={<EditOutlined style={{ color: '#01859a' }} />}
                    onClick={showcambioModal}
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

            <Modal title="Agregar nuevo profesor" open={isModalalta} onOk={handleOk} onCancel={handleCancel}>
                <AddProfessor />
            </Modal>
            <Modal title="Editar Profesor" open={isModalcambio} onOk={handlcambioeOk} onCancel={handlecambioCancel}>
                {selectedProfessorId && <EditProfessor id={selectedProfessorId} onClose={handleCancel} />}
            </Modal>
        </>
    );
};

export default BotonesCrud;
