import { Divider, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { getCursos } from '../../services/Cursos';
import { useAuth } from '../../hooks/useAuth';
import Nav from '../../components/Nav';
import BotonesCrudCursos from '../../components/BotonesCrudCursos';
import { storageController } from '../../services/token';
import './index.css'

const columns = [
    {
        title: 'Nombre',
        dataIndex: 'nombre',
        key: 'nombre',
    },
    {
        title: 'Descripción',
        dataIndex: 'descripcion',
        key: 'descripcion',
    },
    {
        title: 'Duración (horas)',
        dataIndex: 'duracion',
        key: 'duracion',
    },
    {
        title: 'Profesor',
        dataIndex: 'profesor',
        key: 'profesor',
        render: (text, record) => record.profesor ? record.profesor.nombre : 'Desconocido',
    },
    // Agrega más columnas según sea necesario
];
const Cursos = () => {
    const { user, logout } = useAuth();
    const [cursos, setCursos] = useState([]);
    const [selectedCursoId, setSelectedCursoId] = useState(null);
    const [selectionType] = useState('radio');

    const token = storageController.getToken();

    const rowSelection = {
        type: selectionType,
        onChange: (selectedRowKeys, selectedRows) => {
            if (selectedRows.length > 0) {
                setSelectedCursoId(selectedRows[0]._id);
            } else {
                setSelectedCursoId(null);
            }
        },
    };

    const fetchCursos = async () => {
        try {
            const data = await getCursos();
            const cursosWithKey = data.map(curso => ({
                ...curso,
                key: curso._id,
            }));
            setCursos(cursosWithKey);
        } catch (error) {
            console.error('Error al obtener cursos: ', error);
        }
    };

    useEffect(() => {
        fetchCursos();
    }, []);

    return (
        <div>
            <Nav
                greeting={`Hola, ${user ? user.username : 'Visitante'}`}
                logoutButton={user ? { label: "Cerrar Sesión", onClick: logout } : { label: "Iniciar Sesión", onClick: () => navigate('/login') }}
            />
            <Divider />
            <div className='cursos-container'>
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={cursos}
                    scroll={{ y: 400 }}
                />
                {token && <BotonesCrudCursos selectedCursoId={selectedCursoId} refreshCursos={fetchCursos} />}
            </div>
        </div>
    );
};

export default Cursos;
