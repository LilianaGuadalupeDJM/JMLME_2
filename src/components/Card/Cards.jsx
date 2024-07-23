import { Card, Col, Row } from 'antd';

const Cards = () => (
  <Row gutter={16}>
    <Col span={8}>
      <Card title="Acreditaciones" bordered={false}>
      Nuestra universidad cuenta con las más altas acreditaciones a nivel nacional e internacional.
      </Card>
    </Col>
    <Col span={8}>
      <Card title="Investigación" bordered={false}>
      Nuestros programas de investigación lideran innovaciones en diversas áreas del conocimiento.      </Card>
    </Col>
    <Col span={8}>
      <Card title="Empleabilidad" bordered={false}>
      Nuestros egresados se destacan por su alta empleabilidad en el mercado laboral.      </Card>
    </Col>
  </Row>
);
export default Cards;