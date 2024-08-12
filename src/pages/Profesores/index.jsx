import { Divider, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { getProfesores } from '../../services/profesores';
import BotonesCrud from '../../components/BotonesCrud';
import { storageController } from '../../services/token';
import './index.css';
import Sidebar from '../../components/SiderBar';

const columns = [
    {
        title: 'Nombre',
        dataIndex: 'nombre',
        align: 'center',
    },
    {
        title: 'Apellidos',
        dataIndex: 'apellidos',
        align: 'center',
    },
    {
        title: 'Número de Empleado',
        dataIndex: 'numeroEmpleado',
        align: 'center',
    },
    {
        title: 'Correo',
        dataIndex: 'correo',
        align: 'center',
    },
    {
        title: 'Fecha de Nacimiento',
        dataIndex: 'fechaNacimiento',
        align: 'center',
        render: (text) => {
            const date = new Date(text);
            return date.toLocaleDateString('es-ES', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
        },
    },
];

const Profesores = () => {
    const [profesores, setProfesores] = useState([]);
    const [selectedProfessorId, setSelectedProfessorId] = useState(null);

    const token = storageController.getToken();

    const rowSelection = {
        type: 'radio',
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedProfessorId(selectedRows.length > 0 ? selectedRows[0]._id : null);
        },
    };

    const fetchProfesores = async () => {
        try {
            const data = await getProfesores();
            const profesoresWithKey = data.map(profesor => ({
                ...profesor,
                key: profesor._id,
            }));
            setProfesores(profesoresWithKey);
        } catch (error) {
            console.error('Error al obtener profesores: ', error);
        }
    };

    useEffect(() => {
        fetchProfesores();
    }, []);

    return (
        <div className="profesores-page">
            <Sidebar />
            <div className="profesores-content">
                <h3></h3>
                <div className='profesores-container'>
                    {token && <BotonesCrud selectedProfessorId={selectedProfessorId} refreshProfesores={fetchProfesores} />}
                    <Table
                        rowSelection={rowSelection}
                        columns={columns}
                        dataSource={profesores}
                        pagination={{ position: ['bottomCenter'] }}
                        scroll={{ x: true, y: 400 }}
                        size="small"
                    />
                </div>
            </div>
        </div>
    );
};

export default Profesores;