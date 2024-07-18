import { Divider, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Nav from '../../components/Nav';
import BotonesCrudUsuario from '../../components/BotonesCrudUsuario';
import { storageController } from '../../services/token';

import { usersService } from '../../services/users';



const { Search } = Input;

const Usuarios = () => {
    const { user, logout } = useAuth();
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]); // Estado para usuarios filtrados
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectionType] = useState('radio');
    const [searchText, setSearchText] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const token = storageController.getToken();

    const rowSelection = {
        type: selectionType,
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            if (selectedRows.length > 0) {
                setSelectedUserId(selectedRows[0]._id);
                setSelectedUser(selectedRows[0]);
            } else {
                setSelectedUserId(null);
                setSelectedUser(null);
            }
        },
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: '_id'
        },
        {
            title: 'Nombre de Usuario',
            dataIndex: 'username'
        },
        {
            title: 'Correo Electrónico',
            dataIndex: 'email'
        },
        {
            title: 'Roles',
            dataIndex: 'roles',
            render: (roles) => (
                <span>
                    {roles.length > 0 ? (
                        roles.map(role => (
                            <Tag color={getColor(role._id)} key={role._id}>
                                {getRoleName(role._id)}
                            </Tag>
                        ))
                    ) : (
                        <Tag color="red">sin usuario</Tag>
                    )}
                </span>
            ),
        },
        {
            title: 'Fecha de Creación',
            dataIndex: 'createdAt'
        },
        {
            title: 'Fecha de Actualización',
            dataIndex: 'updatedAt'
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
                roles: user.roles.map(role => ({ _id: role, name: getRoleName(role) }))
            }));
            setUsers(usersWithKey);
            setFilteredUsers(usersWithKey); // Inicializar usuarios filtrados con todos los usuarios
        } catch (error) {
            console.error('Error al obtener usuarios', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        const filteredData = users.filter(user =>
            user.username.toLowerCase().includes(searchText.toLowerCase()) ||
            user.email.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredUsers(filteredData);
        setCurrentPage(1); // Resetear la página actual al filtrar
    }, [searchText, users]);

    return (
        <div>
            <Nav
                greeting={`Hola, ${user ? user.username : 'Visitante'}`}
                logoutButton={user ? { label: "Cerrar Sesión", onClick: logout } : { label: "Iniciar Sesión", onClick: () => navigate('/login') }}
            />
            <Divider />
            <div className='usuarios-container'>
                <Row justify="center" style={{ marginBottom: 16 }}>
                    <Col span={12}>
                        <Search
                            placeholder="Buscar por nombre o correo electrónico"
                            enterButton
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                    </Col>
                </Row>
                <BotonesCrudUsuario selectedUserId={selectedUserId} selectedUser={selectedUser} />
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={filteredUsers}
                    pagination={{ 
                        pageSize: 10, 
                        current: currentPage,
                        onChange: (page) => setCurrentPage(page),
                    }}
                    scroll={{ y: 400 }}
                />
            </div>
        </div>
    );
};

export default Usuarios;
