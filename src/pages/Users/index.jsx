import { Divider, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import BotonesCrudUsuario from '../../components/BotonesCrudUsuario';
import { storageController } from '../../services/token';
import { usersService } from '../../services/users';
import Sidebar from '../../components/SiderBar';
import './index.css';

const Usuarios = () => {
    const { user } = useAuth();
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);

    const token = storageController.getToken();
    const isAdmin = user?.roles?.includes('666b5995e842a28618ccfc95');

    const rowSelection = {
        type: 'radio',
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedUserId(selectedRows.length > 0 ? selectedRows[0]._id : null);
        },
        getCheckboxProps: record => ({
            disabled: !isAdmin, // Deshabilitar selección para no administradores
        }),
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
            align: 'center',
        },
        {
            title: 'Nombre de Usuario',
            dataIndex: 'username',
            align: 'center',
        },
        {
            title: 'Correo Electrónico',
            dataIndex: 'email',
            align: 'center',
        },
        {
            title: 'Roles',
            dataIndex: 'roles',
            align: 'center',
            render: (roles) => (
                <span>
                    {roles.length > 0 ? (
                        roles.map(role => (
                            <Tag color={getColor(role._id)} key={role._id}>
                                {getRoleName(role._id)}
                            </Tag>
                        ))
                    ) : (
                        <Tag color="blue">Customer</Tag>
                    )}
                </span>
            ),
        },
        {
            title: 'Fecha de Creación',
            dataIndex: 'createdAt',
            align: 'center',
        },
        {
            title: 'Fecha de Actualización',
            dataIndex: 'updatedAt',
            align: 'center',
        },
    ];

    const getRoleName = (roleId) => {
        switch (roleId) {
            case '666b5995e842a28618ccfc94':
                return 'Customer';
            case '666b5995e842a28618ccfc95':
                return 'Administrador';
            default:
                return 'Desconocido';
        }
    };

    const getColor = (roleId) => {
        switch (roleId) {
            case '666b5995e842a28618ccfc94':
                return 'blue';
            case '666b5995e842a28618ccfc95':
                return 'yellow';
            default:
                return 'default';
        }
    };

    const fetchUsers = async () => {
        try {
            const data = await usersService.getAllUsers(token);
            const usersWithKey = data.map(user => ({
                ...user,
                key: user._id,
                roles: user.roles.map(role => ({ _id: role, name: getRoleName(role) })) // Asegúrate de que roles sea un array de objetos con `_id` y `name`
            }));
            setUsers(usersWithKey);
        } catch (error) {
            console.error('Error al obtener usuarios', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [token]);

    return (
        <div className="usuarios-page">
            <Sidebar />
            <div className="usuarios-content">
                <h1>Usuarios</h1>
                <div className='usuarios-container'>
                    <Table
                        rowSelection={isAdmin ? rowSelection : null}
                        columns={columns}
                        dataSource={users}
                        pagination={{ position: ['bottomCenter'] }}
                        scroll={{ x: true, y: 400 }}
                        size="small"
                    />
                    {token && (
                        <BotonesCrudUsuario selectedUserId={selectedUserId} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Usuarios;
