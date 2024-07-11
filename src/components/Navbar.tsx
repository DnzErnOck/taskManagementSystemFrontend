import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <Menu mode="horizontal" theme="dark">
      <Menu.Item key="home">
        <Link to="/">Anasayfa</Link>
      </Menu.Item>
      <Menu.Item key="tasks">
        <Link to="/tasks">Görevlerim</Link>
      </Menu.Item>
      <Menu.Item key="login">
        <Link to="/login">Giriş Yap</Link>
      </Menu.Item>
    </Menu>
  );
};

export default Navbar;
