import { Card, Col, Row } from 'antd';
import './Cards.css'; // Archivo CSS para las imágenes de fondo
import investigacion from '../../assets/investigacion.jpg';
import lili1234 from '../../assets/lili1234.jpg';
import programa from '../../assets/progra.jpg';

const Cards = () => (
  <Row gutter={[16, 16]} justify="center">
    <Col span={12}>
      <Card bordered={false} className="card-lili" style={{ backgroundImage: `url(/path-to-your-image3.jpg)` }}>
        <h1>Objetivo</h1>
        <p>
          Nuestro objetivo es ser reconocidos como una institución líder en educación tecnológica, que se distingue por su
          excelencia académica y su compromiso con el desarrollo integral de sus estudiantes. Buscamos:
        </p>
        <ul>
          <li>Impulsar la innovación y la investigación aplicada para resolver problemas reales.</li>
          <li>Establecer alianzas estratégicas con empresas e instituciones para ofrecer oportunidades de aprendizaje práctico.</li>
          <li>Fomentar un ambiente inclusivo y diverso que potencie el talento y las capacidades de todos los estudiantes.</li>
          <li>Contribuir al desarrollo sostenible y al bienestar de la sociedad a través de proyectos y actividades que tengan un impacto positivo.</li>
        </ul>
      </Card>
    </Col>
    <Col span={12}>
      <Card bordered={false} className="card-background" style={{ backgroundImage: `url(${investigacion})` }}>
      </Card>
    </Col>
    <Col span={12}>
      <Card bordered={false} className="card-background" style={{ backgroundImage: `url(${lili1234})` }}>
      </Card>
    </Col>
    <Col span={12}>
      <Card bordered={false} className="card-lili" style={{ backgroundImage: `url(/path-to-your-image3.jpg)` }}>
        <h1>Misión</h1>
        <p>
          Nuestra misión es formar líderes innovadores y éticos en el ámbito tecnológico, proporcionando una educación de
          excelencia que integra conocimientos avanzados, habilidades prácticas y valores humanos. Nos comprometemos a
          fomentar la creatividad, la investigación y el desarrollo tecnológico, preparando a nuestros estudiantes para
          enfrentar los desafíos globales y contribuir al progreso sostenible de la sociedad. A través de alianzas
          estratégicas con la industria y la comunidad, buscamos impulsar el impacto positivo de la tecnología en la vida de
          las personas y en el desarrollo económico y social.
        </p>
      </Card>
    </Col>
    <Col span={12}>
      <Card bordered={false} className="card-lili2" style={{ backgroundImage: `url(${programa})` }}>
      </Card>
    </Col>
  </Row>
);

export default Cards;
