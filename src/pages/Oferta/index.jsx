import { Layout, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import BotonesCrudOferta from '../../components/BotonesCrudOferta';
import { storageController } from '../../services/token';
import { ofertaService } from '../../services/oferta';
import Sidebar from '../../components/SiderBar';

const { Content } = Layout;

const Oferta = () => {
    const { user, logout } = useAuth();
    const [ofertas, setOfertas] = useState([]);
    const [selectedOfertaId, setSelectedOfertaId] = useState(null);
    const [selectedOferta, setSelectedOferta] = useState(null);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
    const [filteredOfertas, setFilteredOfertas] = useState([]);
    const token = storageController.getToken();

    // Cargar ofertas con profesor asignado
    const fetchOfertas = async () => {
        try {
            const data = await ofertaService.getAllOferta(token); // Asegúrate de que los datos incluyan todos los campos necesarios
            if (data && Array.isArray(data)) {
                setOfertas(data);
                const { current, pageSize } = pagination;
                const startIndex = (current - 1) * pageSize;
                const endIndex = current * pageSize;
                setFilteredOfertas(data.slice(startIndex, endIndex));
            } else {
                console.error('Datos de ofertas inválidos', data);
            }
        } catch (error) {
            console.error('Error al obtener ofertas', error);
        }
    };

    useEffect(() => {
        fetchOfertas();
    }, [pagination]);

    const handleTableChange = (pagination) => {
        const { current, pageSize } = pagination;
        setPagination({ current, pageSize });

        const startIndex = (current - 1) * pageSize;
        const endIndex = current * pageSize;
        setFilteredOfertas(ofertas.slice(startIndex, endIndex));
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
            key: '_id',
        },
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
            title: 'Profesor Asignado',
            dataIndex: 'profesor', // Asegúrate de que este sea el campo correcto
            key: 'profesor',
            render: (profesor) => profesor ? `${profesor.nombre} ${profesor.apellido}` : 'Sin asignar',
        },
        {
            title: 'Activo',
            dataIndex: 'activo',
            key: 'activo',
            render: (activo) => (
                <Tag color={activo ? 'green' : 'red'}>
                    {activo ? 'Activo' : 'Inactivo'}
                </Tag>
            ),
        },
        {
            title: 'Fecha de Creación',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date) => new Date(date).toLocaleDateString(),
        },
        {
            title: 'Fecha de Actualización',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            render: (date) => new Date(date).toLocaleDateString(),
        },
    ];

    const rowSelection = {
        type: 'radio',
        onChange: (selectedRowKeys, selectedRows) => {
            if (selectedRows.length > 0) {
                setSelectedOfertaId(selectedRows[0]._id);
                setSelectedOferta(selectedRows[0]);
            } else {
                setSelectedOfertaId(null);
                setSelectedOferta(null);
            }
        },
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sidebar />
            <Layout className="oferta-layout">
                <Content className="oferta-content">
                    <h1>Gestión de oferta educativa</h1>
                    {<BotonesCrudOferta selectedOfertaId={selectedOfertaId} selectedOferta={selectedOferta} />}
                    <Table
                        rowSelection={rowSelection}
                        columns={columns}
                        dataSource={filteredOfertas}
                        pagination={pagination}
                        onChange={handleTableChange}
                        scroll={{ y: 400 }}
                        rowKey="_id"
                    />
                </Content>
            </Layout>
        </Layout>
    );
};

export default Oferta;
