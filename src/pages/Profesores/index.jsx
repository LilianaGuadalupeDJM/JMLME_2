import { Divider, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { getProfesores } from '../../services/profesores';
import { useAuth } from '../../hooks/useAuth';
import Nav from '../../components/Nav';
import BotonesCrud from '../../components/BotonesCrud';
import { storageController } from '../../services/token';
import './index.css'

const columns = [
    {
        title: 'Nombre',
        dataIndex: 'nombre'
    },
    {
        title: 'Apellidos',
        dataIndex: 'apellidos'
    },
    {
        title: 'Número de Empleado',
        dataIndex: 'numeroEmpleado'
    },
    {
        title: 'Correo',
        dataIndex: 'correo'
    },
    {
        title: 'Fecha de Nacimiento',
        dataIndex: 'fechaNacimiento'
    },
];

const Profesores = () => {
    const { user, logout } = useAuth();
    const [profesores, setProfesores] = useState([]);
    const [selectedProfessorId, setSelectedProfessorId] = useState(null);
    const [selectionType, setSelectionType] = useState('radio');

    const token = storageController.getToken();

    const rowSelection = {
        type: selectionType,
        onChange: (selectedRowKeys, selectedRows) => {
            if (selectedRows.length > 0) {
                setSelectedProfessorId(selectedRows[0]._id);
            } else {
                setSelectedProfessorId(null);
            }
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
        <div>
            <Nav
                greeting={`Hola, ${user ? user.username : 'Visitante'}`}
                logoutButton={user ? { label: "Cerrar Sesión", onClick: logout } : { label: "Iniciar Sesión", onClick: () => navigate('/login') }}
            />
            <Divider />
            <div className='profesores-container'>
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={profesores}
                    scroll={{ y: 400 }}
                />
                {token && <BotonesCrud selectedProfessorId={selectedProfessorId} refreshProfesores={fetchProfesores} />}
            </div>
        </div>
    );
};

export default Profesores;
