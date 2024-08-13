import { Divider, Table,Layout } from 'antd';
import React, { useEffect, useState } from 'react';
import { getRoles } from '../../services/Roles';
import { useAuth } from '../../hooks/useAuth';
import SiderBar from '../../components/SiderBar';
import BotonesCrudRoles from '../../components/BotonesCrudRoles'; // Cambiado el nombre del componente
import { storageController } from '../../services/token';
import './index.css'

const { Content } = Layout;
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
        <Layout>
            <SiderBar/>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
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
                </Content>
        </Layout>
    );
};

export default Roles;
