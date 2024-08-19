import React, { useState, useEffect } from 'react';
import { Table, Divider, notification, Layout } from 'antd';
import { getDivisions, getAllOfertas } from '../../services/divicion'; // Asegúrate de que la ruta del servicio sea correcta
import BotonesCrudDivision from '../../components/BotonesCrudDivision'; // Asegúrate de que la ruta del componente sea correcta
import Nav from '../../components/SiderBar'; // Asegúrate de que la ruta del componente de navegación sea correcta
import { storageController } from '../../services/token'; // Asegúrate de que la ruta del token sea correcta

const { Content } = Layout;

const DivisionesPage = () => {
    const [divisions, setDivisions] = useState([]);
    const [ofertasMap, setOfertasMap] = useState(new Map());
    const [selectedDivisionId, setSelectedDivisionId] = useState(null);
    const [selectionType] = useState('radio'); // Selección de tipo por radio

    const token = storageController.getToken();

    // Configuración de selección de filas
    const rowSelection = {
        type: selectionType,
        onChange: (selectedRowKeys, selectedRows) => {
            if (selectedRows.length > 0) {
                setSelectedDivisionId(selectedRows[0]._id);
            } else {
                setSelectedDivisionId(null);
            }
        },
    };

    // Función para obtener divisiones y ofertas
    const fetchDivisionsAndOfertas = async () => {
        try {
            // Obtener divisiones y ofertas
            const [divisionsData, ofertasData] = await Promise.all([getDivisions(), getAllOfertas()]);
            
            // Crear un mapa de ID a nombre para las ofertas educativas
            const ofertasMap = new Map(ofertasData.map(oferta => [oferta._id, oferta.nombre]));
            setOfertasMap(ofertasMap);

            // Mapear las divisiones y reemplazar IDs de ofertas por nombres
            const divisionsWithNames = divisionsData.map(division => ({
                ...division,
                ofertas: division.ofertasEducativas.map(id => ofertasMap.get(id) || 'Desconocida'),
                key: division._id,
            }));

            setDivisions(divisionsWithNames);
        } catch (error) {
            notification.error({
                message: 'Error al cargar divisiones',
                description: 'Hubo un problema al intentar obtener las divisiones.',
            });
        }
    };

    useEffect(() => {
        fetchDivisionsAndOfertas();
    }, []);

    return (
        <Layout>
            <Nav /> {/* Componente de navegación */}
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
                <Divider />
                <h1>Division</h1>  {/* Aquí cambiamos el título */}
                <div className='divisiones-container'>
                    <Table
                        rowSelection={rowSelection}
                        columns={columns}
                        dataSource={divisions}
                        scroll={{ y: 400 }}
                        pagination={{ pageSize: 10 }}
                    />
                    {token && <BotonesCrudDivision selectedDivisionId={selectedDivisionId} refreshDivisions={fetchDivisionsAndOfertas} />}
                </div>
            </Content>
        </Layout>
    );
};

// Columnas para la tabla
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
        title: 'Ofertas',
        dataIndex: 'ofertas',
        key: 'ofertas',
        render: (ofertas) => {
            if (!Array.isArray(ofertas) || ofertas.length === 0) return 'Sin ofertas';
            return ofertas.join(', ');
        },
    },
];

export default DivisionesPage;
