import { Divider, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { getRoles } from '../../services/Roles';
import { useAuth } from '../../hooks/useAuth';
import Nav from '../../components/Nav';
import BotonesCrudRoles from '../../components/BotonesCrudRoles'; // Cambiado el nombre del componente
import { storageController } from '../../services/token';
import './index.css'

const columns = [
    {
        title: 'ID',
        dataIndex: '_id'
    },
    {
        title: 'Nombre',
        dataIndex: 'name'
    }
];

const Roles = () => {
    const { user, logout } = useAuth();
    const [roles, setRoles] = useState([]);
    const [selectedRolId, setSelectedRolId] = useState(null);
    const [selectionType] = useState('radio'); // Default to 'radio' selection

    const token = storageController.getToken();

    const rowSelection = {
        type: selectionType,
        onChange: (selectedRowKeys, selectedRows) => {
            if (selectedRows.length > 0) {
                setSelectedRolId(selectedRows[0]._id);
            } else {
                setSelectedRolId(null);
            }
        },
    };

    const fetchRoles = async () => {
        try {
            const data = await getRoles();
            const rolesWithKey = data.map(rol => ({
                ...rol,
                key: rol._id,
            }));
            setRoles(rolesWithKey);
        } catch (error) {
            console.error('Error al obtener roles: ', error);
        }
    };

    useEffect(() => {
        fetchRoles();
    }, []);

    return (
        <div>
            <Nav
                greeting={`Hola, ${user ? user.username : 'Visitante'}`}
                logoutButton={user ? { label: "Cerrar Sesión", onClick: logout } : { label: "Iniciar Sesión", onClick: () => navigate('/login') }}
            />
            <Divider />
            <div className='roles-container'>
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={roles}
                    scroll={{ y: 400 }}
                />
                {token && <BotonesCrudRoles selectedRolId={selectedRolId} refreshRoles={fetchRoles} />}
            </div>
        </div>
    );
};

export default Roles;
