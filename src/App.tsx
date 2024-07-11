import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';
import Navbar from './components/Navbar';
import AppFooter from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import TaskListPage from './pages/TaskListPage';
import Register from './pages/Register';

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Header>
          <Navbar />
        </Header>
        <Content style={{ padding: '0 50px', marginTop: 64 }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/tasks" element={<TaskListPage />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          <AppFooter />
        </Footer>
      </Layout>
    </Router>
  );
};

export default App;
