// components/Sidebar/index.jsx

import React, { useState } from 'react';
import { Layout, Menu, Avatar, Dropdown, Button } from 'antd';
import {
    ProfileOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
    SolutionOutlined,
} from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import logo from '../../assets/log.jpeg';
import DrawerComponent from '../Drawer';
import './Sidebar.css';

const { Sider } = Layout;

function getItem(label, key, icon) {
  return {
    key,
    icon,
    label,
  };
}

const items = [
  getItem('Profesor', 'profesores', <TeamOutlined />),
  getItem('Usuarios', 'usuarios', <SolutionOutlined />),
  getItem('Admisiones', 'admisiones', <ProfileOutlined />),
  getItem('Oferta Educativa', 'oferta-educativa', <PieChartOutlined />),
  getItem('Cursos', 'cursos', <PieChartOutlined />),
  getItem('Division', 'division', <PieChartOutlined />),
  getItem('Roles', 'roles', <PieChartOutlined />),
  //getItem('Files', 'files', <FileOutlined />),
];

const Sidebar = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const isAdmin = user && user.roles && user.roles.includes('666b5995e842a28618ccfc95');
  const userName = user ? user.username : '';

  const handleMenuClick = (e) => {
    navigate(`/${e.key}`);
  };

  const handleAvatarClick = () => {
    setDrawerVisible(true);
  };

  const handleDrawerClose = () => {
    setDrawerVisible(false);
  };

  const menu = (
    <Menu>
      <Menu.Item key="profile" onClick={() => navigate('/profile')}>
        Perfil
      </Menu.Item>
      <Menu.Item key="logout" onClick={() => { logout(); navigate('/'); }}>
        Cerrar Sesión
      </Menu.Item>
    </Menu>
  );

  return (
    <Sider collapsible>
      <div className="sidebar-logo">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>
      <Menu theme="dark" mode="inline" items={items} onClick={handleMenuClick} />
      <div className="user-info">
        <span>Bienvenido {isAdmin ? userName : 'visitante'}</span>
        {user ? (
          <Dropdown overlay={menu} trigger={['click']}>
            <Avatar 
              src={user.avatar || null} 
              onClick={handleAvatarClick}
            />
          </Dropdown>
        ) : (
          <Button onClick={() => navigate('/login')}>Iniciar Sesión</Button>
        )}
      </div>
      <DrawerComponent visible={drawerVisible} onClose={handleDrawerClose} />
    </Sider>
  );
};

export default Sidebar;
