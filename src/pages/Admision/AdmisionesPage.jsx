import React, { useState, useEffect } from 'react';
import { message, Button, Space, Table } from 'antd';
import { getAdmisiones, addAdmision, editAdmision, deleteAdmision } from '../../services/admision';
import AdmisionesModals from './AdmisionesModals';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import './AdmisionesPage.css';
import Nav from '../../components/Nav';

const AdmisionesPage = () => {
  const user = JSON.parse(localStorage.getItem('user')); // Asumiendo que los datos del usuario están en localStorage
  const isAdmin = user && user.roles && user.roles.includes('666b5995e842a28618ccfc95'); // Verifica si el usuario es admin

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
      setAdmisiones(data);
      setLoading(false);
    } catch (error) {
      message.error('Error al obtener admisiones');
      setLoading(false);
    }
  };

  const handleAddAdmision = async (values) => {
    try {
      await addAdmision(values.nombre, values.activo);
      message.success('Admision agregada exitosamente');
      fetchAdmisiones(); // Actualiza la lista después de agregar
      setIsAddModalVisible(false);
    } catch (error) {
      message.error('Error al agregar admision');
    }
  };

  const handleEditAdmision = async (values) => {
    try {
      await editAdmision(selectedAdmision._id, values.nombre, values.activo);
      message.success('Admision editada exitosamente');
      fetchAdmisiones(); // Actualiza la lista después de editar
      setIsEditModalVisible(false);
    } catch (error) {
      message.error('Error al editar admision');
    }
  };

  const handleDeleteAdmision = async () => {
    try {
      await deleteAdmision(selectedAdmision._id);
      message.success('Admision eliminada exitosamente');
      fetchAdmisiones(); // Actualiza la lista después de eliminar
      setIsDeleteModalVisible(false);
    } catch (error) {
      message.error('Error al eliminar admision');
    }
  };

  const columns = [
    { title: 'Nombre', dataIndex: 'nombre', key: 'nombre', align: 'center' },
    { title: 'Activo', dataIndex: 'activo', key: 'activo', align: 'center', render: (activo) => (activo ? 'Sí' : 'No') },
    {
      title: 'Acciones',
      key: 'acciones',
      align: 'center',
      render: (text, record) => (
        <Space>
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
    <div>
      <Nav />
      <h1>Admisiones</h1>

      {isAdmin && (
        <Space className="action-buttons">
          <Button
            type="text"
            icon={<PlusOutlined style={{ color: '#01859a' }} />}
            onClick={() => setIsAddModalVisible(true)}
          />
          <Button
            type="text"
            icon={<EditOutlined style={{ color: '#01859a' }} />}
            onClick={() => selectedAdmision ? setIsEditModalVisible(true) : alert("Selecciona una admision para editar.")}
            disabled={!selectedAdmision}
          />
          <Button
            type="text"
            icon={<DeleteOutlined style={{ color: '#01859a' }} />}
            onClick={() => setIsDeleteModalVisible(true)}
            disabled={!selectedAdmision}
          />
        </Space>
      )}

      <div className="scrollable-table-container">
        <Table
          dataSource={admisiones}
          columns={columns}
          rowKey="_id"
          loading={loading}
          rowSelection={rowSelection}
          className="custom-table"
        />
      </div>

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
    </div>
  );
};

export default AdmisionesPage;
