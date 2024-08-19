import { Divider, Table, Tag, Layout } from 'antd';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import BotonesCrudUsuario from '../../components/BotonesCrudUsuario';
import { storageController } from '../../services/token';
import { usersService } from '../../services/users';
import Sidebar from '../../components/SiderBar';
import './index.css';

const { Content } = Layout;

const columns = [
    {
        title: 'ID',
        dataIndex: '_id',
        key: 'id',
        align: 'center',
    },
    {
        title: 'Nombre de Usuario',
        dataIndex: 'username',
        key: 'username',
        align: 'center',
    },
    {
        title: 'Correo Electrónico',
        dataIndex: 'email',
        key: 'email',
        align: 'center',
    },
    {
        title: 'Roles',
        dataIndex: 'roles',
        key: 'roles',
        align: 'center',
        render: (roles, record) => (
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
        key: 'createdAt',
        align: 'center',
    },
    {
        title: 'Fecha de Actualización',
        dataIndex: 'updatedAt',
        key: 'updatedAt',
        align: 'center',
    },
];

const Usuarios = () => {
    const { user } = useAuth();
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
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

    const fetchUsers = async () => {
        try {
            const data = await usersService.getAllUsers(token);
            const usersWithKey = data.map(user => ({
                ...user,
                key: user._id,
                roles: user.roles.map(roleId => ({
                    _id: roleId,
                    name: getRoleName(roleId)
                }))
            }));
            setUsers(usersWithKey);
        } catch (error) {
            console.error('Error al obtener usuarios', error);
        }
    };

    const fetchRoles = async () => {
        try {
            const data = await rolesService.getRoles(token);
            setRoles(data);
        } catch (error) {
            console.error('Error al obtener roles', error);
        }
    };

    useEffect(() => {
        fetchRoles();
        fetchUsers();
    }, [token]);

    const getRoleName = (roleId) => {
        const role = roles.find(role => role._id === roleId);
        return role ? role.name : 'Desconocido';
    };

    const getColor = (roleId) => {
        const role = roles.find(role => role._id === roleId);
        return role ? role.color : 'default';
    };

    return (
        <Layout>
            <Sidebar />
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
                <Divider />
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
            </Content>
        </Layout>
    );
};

export default Usuarios;
