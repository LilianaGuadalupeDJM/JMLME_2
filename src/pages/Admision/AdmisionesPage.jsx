import React, { useState, useEffect } from 'react';
import { Layout, Table, Button, Space } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { getAdmisiones, addAdmision, editAdmision, deleteAdmision } from '../../services/admision';
import AdmisionesModals from './AdmisionesModals';
import Sidebar from '../../components/SiderBar';
import './AdmisionesPage.css';

const { Content } = Layout;

const AdmisionesPage = () => {
    const user = JSON.parse(localStorage.getItem('user')); 
    const isAdmin = user && user.roles && user.roles.includes('666b5995e842a28618ccfc95'); 

    const [admisiones, setAdmisiones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedAdmision, setSelectedAdmision] = useState(null);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isViewModalVisible, setIsViewModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

    useEffect(() => {
        fetchAdmisiones();
    }, []);

    const fetchAdmisiones = async () => {
        try {
            const data = await getAdmisiones();
            setAdmisiones(data.map(admision => ({ ...admision, key: admision._id })));
            setLoading(false);
        } catch (error) {
            //.error('Error al obtener admisiones', error);
            setLoading(false);
        }
    };

    const handleAddAdmision = async (values) => {
        try {
            await addAdmision(values.nombre, values.activo);
            fetchAdmisiones();
            setIsAddModalVisible(false);
        } catch (error) {
            //.error('Error al agregar admision', error);
        }
    };

    const handleEditAdmision = async (values) => {
        try {
            await editAdmision(selectedAdmision._id, values.nombre, values.activo);
            fetchAdmisiones();
            setIsEditModalVisible(false);
        } catch (error) {
            //.error('Error al editar admision', error);
        }
    };

    const handleDeleteAdmision = async () => {
        try {
            await deleteAdmision(selectedAdmision._id);
            fetchAdmisiones();
            setIsDeleteModalVisible(false);
        } catch (error) {
            //.error('Error al eliminar admision', error);
        }
    };

    const columns = [
        { title: 'Nombre', dataIndex: 'nombre', key: 'nombre' },
        { title: 'Activo', dataIndex: 'activo', key: 'activo', render: (activo) => (activo ? 'Sí' : 'No') },
        {
            title: 'Acciones',
            key: 'acciones',
            render: (text, record) => (
                <Space size="small">
                    <Button onClick={() => { setSelectedAdmision(record); setIsViewModalVisible(true); }}>Ver</Button>
                    {isAdmin && (
                        <>
                            <Button onClick={() => { setSelectedAdmision(record); setIsEditModalVisible(true); }}>Editar</Button>
                            <Button onClick={() => { setSelectedAdmision(record); setIsDeleteModalVisible(true); }}>Eliminar</Button>
                        </>
                    )}
                </Space>
            )
        }
    ];

    const rowSelection = {
        type: 'radio',
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedAdmision(selectedRows[0]);
        },
        selectedRowKeys: selectedAdmision ? [selectedAdmision._id] : [],
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sidebar />
            <Layout className="admisiones-layout">
                <Content className="admisiones-content">
                    {isAdmin && (
                        <div className="action-buttons">
                            <Space size="small">
                                <Button
                                    type="text"
                                    icon={<PlusOutlined />}
                                    onClick={() => setIsAddModalVisible(true)}
                                >
                                    Agregar
                                </Button>
                                <Button
                                    type="text"
                                    icon={<EditOutlined />}
                                    onClick={() => selectedAdmision ? setIsEditModalVisible(true) : alert("Selecciona una admision para editar.")}
                                    disabled={!selectedAdmision}
                                >
                                    Editar
                                </Button>
                                <Button
                                    type="text"
                                    icon={<DeleteOutlined />}
                                    onClick={() => setIsDeleteModalVisible(true)}
                                    disabled={!selectedAdmision}
                                >
                                    Eliminar
                                </Button>
                            </Space>
                        </div>
                    )}
                    <Table
                        dataSource={admisiones}
                        columns={columns}
                        rowKey="_id"
                        loading={loading}
                        rowSelection={rowSelection}
                        className="custom-table"
                        pagination={false} // Desactiva la paginación para simplificar la vista
                        scroll={{ y: 400 }} // Ajusta el tamaño del contenedor para que la tabla sea más pequeña
                    />
                    <AdmisionesModals
                        isAddModalVisible={isAddModalVisible}
                        setIsAddModalVisible={setIsAddModalVisible}
                        handleAddAdmision={handleAddAdmision}
                        isViewModalVisible={isViewModalVisible}
                        setIsViewModalVisible={setIsViewModalVisible}
                        selectedAdmision={selectedAdmision}
                        isEditModalVisible={isEditModalVisible}
                        setIsEditModalVisible={setIsEditModalVisible}
                        handleEditAdmision={handleEditAdmision}
                        isDeleteModalVisible={isDeleteModalVisible}
                        setIsDeleteModalVisible={setIsDeleteModalVisible}
                        handleDeleteAdmision={handleDeleteAdmision}
                    />
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdmisionesPage;
