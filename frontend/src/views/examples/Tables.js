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
import {
  Form,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Button,
  Input,
  Label,
  Row,
  Col,
  Card,
  CardBody,

} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";

const Tables = () => {
  return (
    <>
      <Header />
      <Row className="mt--6 d-flex justify-content-center align-items-center ">
        <Col lg="6" md="10"> 
            <Card className="bg-secondary shadow border-0">
                <CardBody className="px-lg-5 py-lg-5">
                    <div className="text-center text-muted mb-4">
                        <div className="text-center text-muted h2 mb-4">
                            <big>Verificador</big>
                            
                        </div>
                        <div className="text-center text-muted mb-4">
                            <big>Porfavor ingresar rut de la receta</big>
                            
                        </div>
      {/* Page content */}
                          <Form role="form">
                                                <FormGroup>
                                                        <InputGroup className="input-group-alternative">
                                                            <InputGroupAddon addonType="prepend">
                                                                <InputGroupText>
                                                                    <i className="ni ni-credit-card text-primary" />
                                                                </InputGroupText>
                                                            </InputGroupAddon>
                                                            <Input
                                                                placeholder="Rut (20204164-6)"
                                                                type="text"
                                                                name="rut"
                                                            />
                                                        </InputGroup>
                                                    </FormGroup>
                                                    <FormGroup>
                                                    <Button className="my-4" color="primary" type="submit">
                                                        Verificar
                                                    </Button>
                                                    </FormGroup>    

                                                </Form>
                                                </div>
                                            </CardBody>

                                        </Card>
                                    </Col>
                                </Row>

                              
                              
    </>
  );
};

export default Tables;
