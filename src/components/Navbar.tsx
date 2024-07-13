import React from 'react';
import { Menu, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import styled from 'styled-components';

const RightMenu = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  order: 3;
`;

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };


  return (
    <Menu mode="horizontal" theme="dark">
      <Menu.Item key="home">
        <Link to="/">Anasayfa</Link>
      </Menu.Item>
      <Menu.Item key="tasks">
        <Link to="/tasks">Görevlerim</Link>
      </Menu.Item>
      {user && user.role === "USER" && (
        <Menu.Item key="adminPanel">
          <Link to="/adminPanel">Admin Panel</Link>
        </Menu.Item>
      )}
      <RightMenu>
        {!user && (
          <Menu.Item key="login">
            <Link to="/login">Giriş Yap</Link>
          </Menu.Item>
        )}
        {user ? (
          <Menu.SubMenu
            key="user"
            title={<Avatar style={{ backgroundColor: '#87d068'}}>{user.name ? user.name.charAt(0) : 'K'}</Avatar>}
          >
            <Menu.Item key="profile">
              <Link to="/profile">{user.name}</Link>
            </Menu.Item>
            <Menu.Item key="logout" onClick={handleLogout}>
              Çıkış Yap
            </Menu.Item>
          </Menu.SubMenu>
        ) : (
          <Menu.Item key="register">
            <Link to="/register">Kayıt Ol</Link>
          </Menu.Item>
        )}
      </RightMenu>
    </Menu>
  );
};

export default Navbar;
