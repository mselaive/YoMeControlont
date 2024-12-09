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
  const [examData, setExamData] = useState(null);  // Guardamos los datos del examen

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
    const response = await fetch(`http://localhost:8000/getexam/${rut}`);
    if (response.ok) {
      const data = await response.json();
      setExamData(data);  // Establece los datos del examen y paciente
    } else {
      setExamData(null);  // Si no se encuentra el examen, limpia los datos
      alert("Examen no encontrado");
    }
  };

  // Función para censurar datos
  const censorData = (value, type) => {
    if (type === "name") {
      return value.charAt(0) + "****" + value.charAt(value.length - 1);  // Ej: M****s
    } else if (type === "rut") {
      return value.substring(0, 2) + "******" + value.charAt(value.length - 2);  // Ej: 20******-6
    } else if (type === "email") {
      const emailParts = value.split("@");
      return emailParts[0].substring(0, 2) + "**********" + "@" + emailParts[1];  // Ej: ma**********@gmail.com
    }
    return value;
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
              {/* Muestra los datos del examen y paciente */}
              {examData && (
                <div className="text-center">
                  <div className="text-center text-muted h2 mb-4">
                    <big>Datos de la Orden Médica "Censurados"</big>
                  </div>
                  <div className="text-center text-muted mb-4">
                  <big>Nombre del paciente: {censorData(examData.user.name, "name")}</big>
                  </div>
                  <div className="text-center text-muted mb-4">
                  <big>Rut: {censorData(examData.user.rut, "rut")}</big>
                  </div>
                  <div className="text-center text-muted mb-4">
                  <big>Edad: {examData.order.age}</big>
                  </div>
                  <div className="text-center text-muted mb-4">
                  <big>Email: {censorData(examData.user.email, "email")}</big>
                  </div>
                  <div className="text-center text-muted mb-4">
                  <big>Género: {examData.user.gender}</big>
                  </div>
                  <div className="text-center text-muted h1 mb-4">
                    <big>Exámenes</big>
                  </div>
                  <h4></h4>
                  {examData.order.exams.length > 0 ? (
                    <ul>
                      {examData.order.exams.map((exam, index) => (
                        <li key={index}>{exam}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>No se encontraron exámenes para este paciente.</p>
                  )}
                  <div className="text-center text-muted h2 mb-4">
                    <big>Fecha del Examen: {examData.order.date}</big>
                  </div>
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
