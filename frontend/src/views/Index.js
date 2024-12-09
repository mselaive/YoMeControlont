
import { useState } from "react";
import jsPDF from "jspdf";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import axios from 'axios';
import QRCode from 'qrcode';
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
  Form,
  FormGroup,
  Label,
  Input,
  Badge,
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
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    rut: '',
    age: '',
    email: '',
    gender: ''
  });
  const [examen, setExamen] = useState({
    patient_id: '',
    exams: '',
    
  });
  const examenes = {
    customCheck1: {
      nombre: "Detección Cancer de Próstata",
      descripcion: "Examen para detectar el cáncer de próstata en sus primeras etapas.",
      exams: ['YMC095', 'YMC096', 'YMC097', 'YMC098', 'YMC099', 'YMC100']
    },
    customCheck2: {
      nombre: "Chequeo Preventivo",
      descripcion: "Chequeo general para prevenir enfermedades comunes.",
      exams: ['YMC101', 'YMC102', 'YMC103', 'YMC001', 'YMC002', 'YMC003']
    },
    customCheck3: {
      nombre: "Chequeo ETS y Salud Sexual",
      descripcion: "Examen para detectar enfermedades de transmisión sexual y evaluar la salud sexual.",
      exams: ['YMC004', 'YMC005', 'YMC006', 'YMC007', 'YMC008', 'YMC009']
    },
    customCheck4: {
      nombre: "Chequeo de Alergias",
      descripcion: "Examen para identificar alergias comunes.",
      exams: ['YMC026', 'YMC095', 'YMC096', 'YMC097', 'YMC098', 'YMC099']
    },
    customCheck5: {
      nombre: "Exámenes Preocupacionales y Evaluación Laboral",
      descripcion: "Evaluación médica para determinar la aptitud laboral.",
      exams: ['YMC100', 'YMC101', 'YMC102', 'YMC103', 'YMC001', 'YMC002']
    },
    customCheck6: {
      nombre: "Detección de Diabetes y Resistencia a la Insulina",
      descripcion: "Examen para detectar diabetes y resistencia a la insulina.",
      exams: ['YMC003', 'YMC004', 'YMC005', 'YMC006', 'YMC007', 'YMC008']
    },
    customCheck7: {
      nombre: "Detección Cancer de Mama",
      descripcion: "Examen para detectar el cáncer de mama en sus primeras etapas.",
      exams: ['YMC009', 'YMC026', 'YMC095', 'YMC096', 'YMC097', 'YMC098']
    },
    customCheck8: {
      nombre: "Chequeo General de Salud",
      descripcion: "Chequeo general para evaluar el estado de salud.",
      exams: ['YMC099', 'YMC100', 'YMC101', 'YMC102', 'YMC103', 'YMC001']
    },
    customCheck9: {
      nombre: "Pérdida de peso involuntaria",
      descripcion: "Evaluación para determinar las causas de la pérdida de peso involuntaria.",
      exams: ['YMC002', 'YMC003', 'YMC004', 'YMC005', 'YMC006', 'YMC007']
    },
    customCheck10: {
      nombre: "Hipertensión y Diabetes",
      descripcion: "Examen para detectar hipertensión y diabetes.",
      exams: ['YMC008', 'YMC009', 'YMC026', 'YMC095', 'YMC096', 'YMC097']
    },
    customCheck11: {
      nombre: "Chequeo Capilar",
      descripcion: "Evaluación de la salud capilar.",
      exams: ['YMC098', 'YMC099', 'YMC100', 'YMC101', 'YMC102', 'YMC103']
    },
    customCheck12: {
      nombre: "Exámenes de orina y perfil renal",
      descripcion: "Examen para evaluar la función renal a través de análisis de orina.",
      exams: ['YMC001', 'YMC002', 'YMC003', 'YMC004', 'YMC005', 'YMC006']
    }
  };
  
  const handleCheckboxChange = (event) => {
    const { id } = event.target;
    setSelectedCheckbox(id);
    const selectedExam = examenes[id];
    if (selectedExam) {
      setExamen({
        exams: selectedExam.exams
      });
    }
    
  };
  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleRutChange = (event) => {
    const { value } = event.target;
    const formattedRut = formatRut(value);
    setFormData({
      ...formData,
      rut: formattedRut
    });
  };

  const formatRut = (rut) => {
    // Elimina cualquier carácter que no sea un número o una 'k'
    rut = rut.replace(/[^0-9kK]/g, '');

    // Si el RUT tiene más de un dígito, añade el guion antes de los dos últimos caracteres
    if (rut.length > 1) {
      rut = rut.slice(0, -1) + '-' + rut.slice(-1);
    }
    
    return rut;
  };

  
  const handleSubmit = (event) => {
    event.preventDefault();
    setShowForm(true);
  };
  const handleSubmit2 = (event) => {
    event.preventDefault();
    setShowForm(false);
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await axios.post('http://127.0.0.1:8000/patient', formData);
      console.log('Paciente creado:', response.data);
      console.log(response.data._id);

      const examResponse = await axios.post('http://127.0.0.1:8000/exam', {
        patient_id: response.data._id,
        ...examen
      });
      console.log('Examen creado:', examResponse.data);

      // Aquí es donde se genera y descarga el PDF
      generatePDF(formData, examenes[selectedCheckbox]);

    } catch (error) {
      console.error('Error al crear el paciente:', error);
    }
  };
  const generatePDF = (formData, selectedExam) => {
    const doc = new jsPDF();
  
    // Establecer la fuente para los encabezados
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text('YoMeControlont Orden Médica', 20, 20);
  
    // Agregar una línea para separar el encabezado
    doc.setLineWidth(0.5);
    doc.line(20, 25, 190, 25); // Línea horizontal
  
    // Cambiar la fuente para el contenido
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
  
    // Nombre y datos del paciente
    doc.text(`Nombre: ${formData.name}`, 20, 40);
    doc.text(`RUT: ${formData.rut}`, 20, 50);
    doc.text(`Edad: ${formData.age}`, 20, 60);
    doc.text(`Correo: ${formData.email}`, 20, 70);
    doc.text(`Sexo: ${formData.gender}`, 20, 80);
  
    // Título de Examen
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Examen Seleccionado:', 20, 100);
  
    // Línea separadora antes de los exámenes
    doc.setLineWidth(0.5);
    doc.line(20, 105, 190, 105); // Línea horizontal
  
    // Descripción del examen
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.text(`Nombre: ${selectedExam.nombre}`, 20, 110);
    doc.text(`Descripción: ${selectedExam.descripcion}`, 20, 120);
  
    // Crear una tabla para los códigos de examen
    const startY = 130;
    doc.text('Códigos de Examen:', 20, startY);
    
    // Dibuja los códigos de los exámenes en una lista
    const examsStartY = startY + 10;
    selectedExam.exams.forEach((exam, index) => {
      doc.text(`${index + 1}. ${exam}`, 20, examsStartY + (index * 10));
    });
  
    // Generar QR con el enlace que incluye el RUT
    const qrData = `http://localhost:3000/admin/verificador?rut=${formData.rut}`;
    
    QRCode.toDataURL(qrData)
      .then(url => {
        // Subir el QR un poco para centrarlo mejor
        doc.addImage(url, 'PNG', 150, 60, 50, 50); // Ajusta la posición y tamaño del QR según sea necesario
  
        // Línea separadora después del QR
        doc.setLineWidth(0.5);
        doc.line(20, 160, 190, 160); // Línea horizontal
  
        // Agregar pie de página con información adicional
        doc.setFontSize(10);
        doc.text('Generado por: Sistema de Gestión Médica de YoMeControlo', 20, 270);
  
        // Línea separadora antes de la fecha de emisión
        doc.setLineWidth(0.5);
        doc.line(20, 275, 190, 275); // Línea horizontal
  
        // Fecha de emisión
        doc.text(`Fecha de Emisión: ${new Date().toLocaleDateString()}`, 20, 280);
  
        // Guardar el PDF
        doc.save('orden_medica.pdf');
      })
      .catch(err => {
        console.error('Error generando el QR', err);
      });
  };
  
  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleNavs = (e, index) => {
    e.preventDefault();




  };
  return (
    <>
      <Header />
      {/* Page content */}
      {!showForm && (
        <Row className="mt--6 d-flex justify-content-center align-items-center">
          <Col lg="6" md="10">
            <Card className="bg-secondary shadow border-0">
              <CardBody className="px-lg-5 py-lg-5">
                <Col>
                  <div className="text-center text-muted mb-4">
                    <div className="text-center font-weight-bold h1 mb-4">
                      <big>{'Exámenes'}</big>
                    </div>
                  </div>

                  <Row>
                    <Col sm="4">
                      <div className="custom-control custom-checkbox mb-3">
                        <input
                          className="custom-control-input"
                          id="customCheck1"
                          type="checkbox"
                          checked={selectedCheckbox === "customCheck1"}
                          onChange={handleCheckboxChange}
                        />
                        <label className="custom-control-label" htmlFor="customCheck1">
                          Detección Cancer de Próstata
                        </label>
                      </div>
                      <div className="custom-control custom-checkbox mb-3">
                        <input
                          className="custom-control-input"
                          id="customCheck2"
                          type="checkbox"
                          checked={selectedCheckbox === "customCheck2"}
                          onChange={handleCheckboxChange}
                        />
                        <label className="custom-control-label" htmlFor="customCheck2">
                          Chequeo Preventivo
                        </label>
                      </div>
                      <div className="custom-control custom-checkbox mb-3">
                        <input
                          className="custom-control-input"
                          id="customCheck3"
                          type="checkbox"
                          checked={selectedCheckbox === "customCheck3"}
                          onChange={handleCheckboxChange}
                        />
                        <label className="custom-control-label" htmlFor="customCheck3">
                          Chequeo ETS y Salud Sexual
                        </label>
                      </div>
                      <div className="custom-control custom-checkbox mb-3">
                        <input
                          className="custom-control-input"
                          id="customCheck4"
                          type="checkbox"
                          checked={selectedCheckbox === "customCheck4"}
                          onChange={handleCheckboxChange}
                        />
                        <label className="custom-control-label" htmlFor="customCheck4">
                          Chequeo de Alergias
                        </label>
                      </div>
                    </Col>

                    <Col sm="4">
                      <div className="custom-control custom-checkbox mb-3">
                        <input
                          className="custom-control-input"
                          id="customCheck5"
                          type="checkbox"
                          checked={selectedCheckbox === "customCheck5"}
                          onChange={handleCheckboxChange}
                        />
                        <label className="custom-control-label" htmlFor="customCheck5">
                          Exámenes Preocupacionales y Evaluación Laboral
                        </label>
                      </div>
                      <div className="custom-control custom-checkbox mb-3">
                        <input
                          className="custom-control-input"
                          id="customCheck6"
                          type="checkbox"
                          checked={selectedCheckbox === "customCheck6"}
                          onChange={handleCheckboxChange}
                        />
                        <label className="custom-control-label" htmlFor="customCheck6">
                          Detección de Diabetes y Resistencia a la Insulina
                        </label>
                      </div>
                      <div className="custom-control custom-checkbox mb-3">
                        <input
                          className="custom-control-input"
                          id="customCheck7"
                          type="checkbox"
                          checked={selectedCheckbox === "customCheck7"}
                          onChange={handleCheckboxChange}
                        />
                        <label className="custom-control-label" htmlFor="customCheck7">
                          Detección Cancer de Mama
                        </label>
                      </div>
                      <div className="custom-control custom-checkbox mb-3">
                        <input
                          className="custom-control-input"
                          id="customCheck8"
                          type="checkbox"
                          checked={selectedCheckbox === "customCheck8"}
                          onChange={handleCheckboxChange}
                        />
                        <label className="custom-control-label" htmlFor="customCheck8">
                          Chequeo General de Salud
                        </label>
                      </div>
                    </Col>

                    <Col sm="4">
                      <div className="custom-control custom-checkbox mb-3">
                        <input
                          className="custom-control-input"
                          id="customCheck9"
                          type="checkbox"
                          checked={selectedCheckbox === "customCheck9"}
                          onChange={handleCheckboxChange}
                        />
                        <label className="custom-control-label" htmlFor="customCheck9">
                          Pérdida de peso involuntaria
                        </label>
                      </div>
                      <div className="custom-control custom-checkbox mb-3">
                        <input
                          className="custom-control-input"
                          id="customCheck10"
                          type="checkbox"
                          checked={selectedCheckbox === "customCheck10"}
                          onChange={handleCheckboxChange}
                        />
                        <label className="custom-control-label" htmlFor="customCheck10">
                          Hipertensión y Diabetes
                        </label>
                      </div>
                      <div className="custom-control custom-checkbox mb-3">
                        <input
                          className="custom-control-input"
                          id="customCheck11"
                          type="checkbox"
                          checked={selectedCheckbox === "customCheck11"}
                          onChange={handleCheckboxChange}
                        />
                        <label className="custom-control-label" htmlFor="customCheck11">
                          Chequeo Capilar
                        </label>
                      </div>
                      <div className="custom-control custom-checkbox mb-3">
                        <input
                          className="custom-control-input"
                          id="customCheck12"
                          type="checkbox"
                          checked={selectedCheckbox === "customCheck12"}
                          onChange={handleCheckboxChange}
                        />
                        <label className="custom-control-label" htmlFor="customCheck12">
                          Exámenes de orina y perfil renal
                        </label>
                      </div>
                    </Col>
                  </Row>

                      <div className="text-center" >
                                      <Button className="my-4" color="primary" type="submit" onClick={handleSubmit}>
                                      {("Generar Receta")}
                                      </Button>
                      </div>
                      
                    </Col>

                  </CardBody>
              </Card>
          </Col>

        </Row>
        )}

      {showForm && (
        <Row className="mt-4 d-flex justify-content-center align-items-start">
        <Col lg="3" md="5">
          <Card className="bg-secondary shadow border-0 ">
          <CardBody className="px-lg-5 py-lg-4">
          <h1>
              <Badge color="primary" className="d-flex align-items-center justify-content-center">
                <i className="ni ni-ambulance"></i>
                <span className="ml-2">Generar Orden Médica</span>
              </Badge>
            </h1>
            <h2><big>{examenes[selectedCheckbox].nombre}</big></h2>
            <p>{examenes[selectedCheckbox].descripcion}</p>
            </CardBody>
          </Card>
        </Col>
        <Col lg="6" md="10">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-4">
            <h1>
            <div className="d-flex justify-content-left py-lg-3">
              <Badge color="primary" className="d-flex align-items-center justify-content-center">
                <i className="ni ni-circle-08"></i>
                <span className="ml-2 ">Datos del Paciente</span>
              </Badge>
            </div>
          </h1>
            <Form onSubmit={handleFormSubmit}>
                  <FormGroup>
                    <Label for="name">  Nombre</Label>
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Ingrese su nombre"
                      value={formData.name}
                      onChange={handleFormChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="rut">RUT</Label>
                    <Input
                      type="text"
                      name="rut"
                      id="rut"
                      placeholder="Ingrese su RUT (sin puntos y con guión)"
                      value={formData.rut}
                      onChange={handleRutChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="age">Edad</Label>
                    <Input
                      type="number"
                      name="age"
                      id="age"
                      placeholder="Ingrese su edad"
                      value={formData.age}
                      onChange={handleFormChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="email">Correo Electrónico</Label>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Ingrese su correo electrónico"
                      value={formData.email}
                      onChange={handleFormChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="gender">Sexo</Label>
                    <Input
                      type="select"
                      name="gender"
                      id="gender"
                      value={formData.gender}
                      onChange={handleFormChange}
                    >
                      <option value="" disabled selected>Seleccione su sexo</option>
                      <option value="M">Masculino</option>
                      <option value="F">Femenino</option>
                      <option value="O">Otro </option>
                    </Input>
                  </FormGroup>
                <div className="text-center">
                  <Button className="my-4" color="primary" type="button" onClick={handleSubmit2}>
                    {("Volver")}
                  </Button>
                  <Button className="my-4" color="primary" type="submit">
                      {("Generar Orden Médica")}
                    </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
      )}

    </>
  );
};

export default Index;
