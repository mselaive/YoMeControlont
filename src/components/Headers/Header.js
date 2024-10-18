/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col, CardText, CardImg, Button } from "reactstrap";
import cardImage from "../../assets/img/brand/MaleTabRight.png";
import cardImage2 from "../../assets/img/brand/top-banner.png";
import cardImage3 from "../../assets/img/brand/try1.png";


const Header = () => {
  return (
    <>
      <div className="bg-gradient-purple header pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>

            <Col lg="6" xl="4">
                <Card className="card-stats mb-xl-0"> 
                  <CardImg
                      alt="..."
                      src={cardImage2}
                      top
                          />
                  <CardBody>
                    <CardTitle>Encuentra pack de exámenes por categoria</CardTitle>
                    <CardText className="pt-3 pb-4">
                    Hemos diseñado diferentes packs de exámenes útiles para detectar precozmente las enfermedades más comunes de la población, elige entre ellos el que más se acomode a tus necesidades.
                    </CardText>
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={e => e.preventDefault()}

                    >
                      Pedir Examenes
                    </Button>
                   </CardBody>
                </Card>
              </Col>
              
              <Col lg="6" xl="4">
                <Card className="card-stats mb-4"> 
                  <CardImg
                      alt="..."
                      src={cardImage}
                      top
                          />
                  <CardBody>
                    <CardTitle>Para vivir más y mejor, Chequea tu corazón</CardTitle>
                    <CardText>
                    Las enfermedades cardiovasculares son una las principales causas de muerte en Chile, representando más de una cuarta parte de todos los fallecimientos registrados cada año.
                    Durante todo agosto, te daremos acceso gratuito a la orden médica con los exámenes de laboratorio y procedimientos médicos necesarios para que te realices un chequeo cardiovascular preventivo básico. Hazlo por ti y tu familia.
                    </CardText>
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      Pedir Examenes
                    </Button>
                   </CardBody>
                </Card>
              </Col>

               
              <Col lg="6" xl="4">
                <Card className="card-stats mb-4 "> 
                  <CardImg
                      alt="..."
                      src={cardImage3}
                      top
                          />
                  <CardBody>
                    <CardTitle>¿Cuál es la edad de tu corazón?</CardTitle>
                    <CardText>
                    La edad vascular te da una idea de la salud de tu corazón. 
                    Para que puedas conocerla hemos habilitado una calculadora para averiguarlo en cuestión de minutos.
                    Funciona comparando tu edad real con tu edad cardíaca haciéndote preguntas sobre tu salud
                    </CardText>
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      Pedir Examenes
                    </Button>
                   </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
