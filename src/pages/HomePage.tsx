// components/HomePage.tsx

import React from 'react';
import { Row, Col, Typography, Button } from 'antd';
import { Link } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import AppFooter from '../components/Footer';
import styled from 'styled-components';
import home from "../assets/images/home.jpg";

const { Title, Paragraph } = Typography;

const StyledContainer = styled.div`
  padding: 50px;
  background-color: #f0f2f5;
`;

const StyledCard = styled.div`
  background-color: #ffffff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const BrandTitle = styled(Title)`
  font-size: 3rem;
  color: #1890ff;
  margin-bottom: 30px;
`;

const FeatureList = styled.ul`
  text-align: left;
  margin-bottom: 30px;
  font-size: 1.2rem;
`;

const CallToActionButton = styled(Button)`
  font-size: 1.2rem;
  padding: 0 30px;
  background-color: #1890ff;
  border-color: #1890ff;

  &:hover {
    background-color: #147cd0;
    border-color: #147cd0;
  }
`;

const HomePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <StyledContainer>
      <Row justify="center" gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <StyledCard>
            <BrandTitle level={1}>Taskify</BrandTitle>
            <Paragraph style={{ fontSize: '1.5rem', marginBottom: 30 }}>
              Hedeflerinizi daha kolay yönetin ve başarıya ulaşın! Taskify, güçlü ve kullanıcı dostu araçlarıyla görevlerinizi organize etmenize yardımcı olur.
            </Paragraph>
            <FeatureList>
              <li>Kolay Görev Yönetimi: Görevlerinizi ekleyin, düzenleyin ve silin.</li>
              <li>Verimliliği Artırın: Zamanınızı etkili bir şekilde yönetin ve hedeflerinize odaklanın.</li>
            </FeatureList>
            {!user && (
              <div>
               
                <CallToActionButton type="primary" size="large">
                  <Link to="/login" style={{ color: 'white' }}>Giriş Yap</Link>
                </CallToActionButton>
                <CallToActionButton type="default" size="large" style={{ marginLeft: 10,background: 'white' }}>
                  <Link to="/register" >Kayıt Ol</Link>
                </CallToActionButton>
              </div>
            )}
          </StyledCard>
        </Col>
        <Col xs={24} md={12}>
          <img src={home} alt="Task Management" style={{ maxWidth: '100%',height:'100%', borderRadius: 10, boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)' }} />
        </Col>
      </Row>
    </StyledContainer>
  );
};

export default HomePage;
