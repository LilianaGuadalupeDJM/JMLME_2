import React, { useState, useEffect } from 'react';
import { Button, Table, message } from 'antd';
import { getAdmisiones, addAdmision, editAdmision, deleteAdmision } from '../../services/admision';
import AdmisionesModals from './AdmisionesModals';
import './AdmisionesPage.css';

const AdmisionesPage = () => {
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
    { title: 'Nombre', dataIndex: 'nombre', key: 'nombre' },
    { title: 'Activo', dataIndex: 'activo', key: 'activo', render: (activo) => (activo ? 'Sí' : 'No') },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (text, record) => (
        <span>
          <Button onClick={() => { setSelectedAdmision(record); setIsViewModalVisible(true); }}>Ver</Button>
          <Button onClick={() => { setSelectedAdmision(record); setIsEditModalVisible(true); }}>Editar</Button>
          <Button onClick={() => { setSelectedAdmision(record); setIsDeleteModalVisible(true); }}>Borrar</Button>
        </span>
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
      <h1>Admisiones</h1>
     
      <Table 
        dataSource={admisiones} 
        columns={columns} 
        rowKey="_id" 
        loading={loading} 
        rowSelection={rowSelection} 
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
    </div>
  );
};

export default AdmisionesPage;
