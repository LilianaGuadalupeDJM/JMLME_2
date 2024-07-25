import React, { useState } from 'react';
import { Button, Space, notification } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, ReloadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { DropProfesor } from '../../services/profesores';
import AddProfessor from '../../pages/Alta-Profesor';
import EditProfessor from '../../pages/Profesor';

const BotonesCrud = ({ selectedProfessorId, refreshProfesores }) => {
    const navigate = useNavigate();

    const handleEditClick = () => {
        if (selectedProfessorId) {
            navigate(`/edit-professor/${selectedProfessorId}`);
        } else {
            notification.warning({
                message: 'Selección Requerida',
                description: 'Selecciona un profesor para editar.',
            });
        }
    };

    const BajaProfessor = async () => {
        if (selectedProfessorId) {
            try {
                const response = await DropProfesor(selectedProfessorId);
                console.log('Eliminación exitosa', response.data);
                notification.success({
                    message: 'Profesor Eliminado',
                    description: 'Los datos del profesor han sido eliminados correctamente.',
                });
                refreshProfesores(); // Actualizar la lista de profesores
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

    const Reload = () => {
        refreshProfesores(); // Actualizar la lista de profesores
    };

    const [isModalalta, setIsModalalta] = useState(false);
    const [isModalcambio, setIsModalcambio] = useState(false);

    const showAltaModal = () => {
        setIsModalalta(true);
    };

    const handleAltaClose = () => {
        setIsModalalta(false);
        refreshProfesores(); // Actualizar la lista de profesores
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
        refreshProfesores(); // Actualizar la lista de profesores
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
        </>
    );
};

export default BotonesCrud;
