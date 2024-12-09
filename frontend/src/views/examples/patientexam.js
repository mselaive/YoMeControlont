import React, { useState, useEffect } from "react";
import {
  Form,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Button,
  Input,
  Card,
  CardBody,
  Row,
  Col,
} from "reactstrap";
import Header from "components/Headers/Header.js";
import { useLocation } from "react-router-dom"; // Importa useLocation para leer la URL

const Tables = () => {
  const [rut, setRut] = useState("");  // Guardamos el RUT ingresado
  const [patientData, setPatientData] = useState(null);  // Guardamos los datos del paciente

  // Usamos useLocation para obtener los parámetros de la URL
  const location = useLocation();

  // Leer el parámetro "rut" de la URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const rutFromUrl = queryParams.get("rut");
    if (rutFromUrl) {
      setRut(rutFromUrl);  // Si encontramos el RUT en la URL, lo seteamos en el estado
    }
  }, [location]);

  // Función para hacer la solicitud al servidor
  const handleSearch = async (e) => {
    e.preventDefault();

    // Hacer la solicitud al servidor con el RUT ingresado
    const response = await fetch(`http://localhost:8000/getpatient/${rut}`);
    if (response.ok) {
      const data = await response.json();
      setPatientData(data);  // Establece los datos del paciente
    } else {
      setPatientData(null);  // Si no se encuentra al paciente, limpia los datos
      alert("Paciente no encontrado");
    }
  };

  return (
    <>
      <Header />
      <Row className="mt--6 d-flex justify-content-center align-items-center">
        <Col lg="6" md="10">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <div className="text-center text-muted h2 mb-4">
                  <big>Verificador</big>
                </div>
                <div className="text-center text-muted mb-4">
                  <big>Por favor ingresar RUT de la receta</big>
                </div>
                {/* Formulario para ingresar el RUT */}
                <Form role="form" onSubmit={handleSearch}>
                  <FormGroup>
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-credit-card text-primary" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="RUT (20204164-6)"
                        type="text"
                        value={rut}
                        onChange={(e) => setRut(e.target.value)}  // Actualiza el RUT en el estado
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
              {/* Muestra los datos del paciente */}
              {patientData && (
                <div className="text-center">
                  <h3>Datos del Paciente</h3>
                  <p><strong>Nombre:</strong> {patientData.name}</p>
                  <p><strong>RUT:</strong> {patientData.rut}</p>
                  <p><strong>Edad:</strong> {patientData.age}</p>
                  <p><strong>Email:</strong> {patientData.email}</p>
                  <p><strong>Género:</strong> {patientData.gender}</p>
                </div>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Tables;
