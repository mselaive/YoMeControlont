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
import { useState } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";

import Header from "components/Headers/Header.js";

const Index = (props) => {
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };
  return (
    <>
      <Header />
      {/* Page content */}

      <Row className=" mt--6 d-flex justify-content-center align-items-center ">
        <Col lg="6" md="10"> 

            <Card className="bg-secondary shadow border-0">
                <CardBody className="px-lg-5 py-lg-5">

                <Col>

                    <div className="text-center text-muted mb-4">
                        <div className="text-center font-weight-bold h2 mb-4">
                            <big>{'Formulario'}</big>
                        </div>
                    </div>

                    <Row>
                      <Col className="col-sm">

                        <div className="custom-control custom-checkbox mb-3">
                          <input
                            className="custom-control-input"
                            id="customCheck1"
                            type="checkbox"
                          />
                          <label className="custom-control-label" htmlFor="customCheck1">
                            Diabetes
                          </label>
                        </div>
                        <div className="custom-control custom-checkbox mb-3">
                          <input
                            className="custom-control-input"
                            id="customCheck2"
                            type="checkbox"
                          />
                          <label className="custom-control-label" htmlFor="customCheck2">
                            Dolor de Cabeza
                          </label>
                        </div>
                        <div className="custom-control custom-checkbox mb-3">
                          <input
                            className="custom-control-input"
                            id="customCheck3"
                            type="checkbox"
                          />
                          <label className="custom-control-label" htmlFor="customCheck3">
                            Presion Alta
                          </label>
                        </div>
                        <div className="custom-control custom-checkbox mb-3">
                          <input
                            className="custom-control-input"
                            id="customCheck4"
                            type="checkbox"
                          />
                          <label className="custom-control-label" htmlFor="customCheck4">
                            Temperatura Alta o fiebre
                          </label>
                        </div>
                      </Col>

                      <Col className="col-sm">

                        <div className="custom-control custom-checkbox mb-3">
                          <input
                            className="custom-control-input"
                            id="customCheck1"
                            type="checkbox"
                          />
                          <label className="custom-control-label" htmlFor="customCheck1">
                          Dolor en el pecho
                          </label>
                        </div>
                        <div className="custom-control custom-checkbox mb-3">
                          <input
                            className="custom-control-input"
                            id="customCheck2"
                            type="checkbox"
                          />
                          <label className="custom-control-label" htmlFor="customCheck2">
                          Dificultad para respirar
                          </label>
                        </div>
                        <div className="custom-control custom-checkbox mb-3">
                          <input
                            className="custom-control-input"
                            id="customCheck3"
                            type="checkbox"
                          />
                          <label className="custom-control-label" htmlFor="customCheck3">
                          Dolor muscular o articular
                          </label>
                        </div>
                        <div className="custom-control custom-checkbox mb-3">
                          <input
                            className="custom-control-input"
                            id="customCheck4"
                            type="checkbox"
                          />
                          <label className="custom-control-label" htmlFor="customCheck4">
                          Fatiga o cansancio extremo
                          </label>
                        </div>
                        </Col>
                        <Col className="col-sm">

                          <div className="custom-control custom-checkbox mb-3">
                            <input
                              className="custom-control-input"
                              id="customCheck1"
                              type="checkbox"
                            />
                            <label className="custom-control-label" htmlFor="customCheck1">
                            Pérdida de peso involuntaria
                            </label>
                          </div>
                          <div className="custom-control custom-checkbox mb-3">
                            <input
                              className="custom-control-input"
                              id="customCheck2"
                              type="checkbox"
                            />
                            <label className="custom-control-label" htmlFor="customCheck2">
                            Náuseas o vómitos
                            </label>
                          </div>
                          <div className="custom-control custom-checkbox mb-3">
                            <input
                              className="custom-control-input"
                              id="customCheck3"
                              type="checkbox"
                            />
                            <label className="custom-control-label" htmlFor="customCheck3">
                            Diarrea o estreñimiento
                            </label>
                          </div>
                          <div className="custom-control custom-checkbox mb-3">
                            <input
                              className="custom-control-input"
                              id="customCheck4"
                              type="checkbox"
                            />
                            <label className="custom-control-label" htmlFor="customCheck4">
                            Erupciones en la piel o urticaria
                            </label>
                          </div>
                          </Col>
                    </Row>


                    <div className="text-center" >
                                    <Button className="my-4" color="primary" type="submit" >
                                    {("Generar Receta")}
                                    </Button>
                    </div>
                    
                    </Col>

                </CardBody>
            </Card>
        </Col>

      </Row>
    </>
  );
};

export default Index;
