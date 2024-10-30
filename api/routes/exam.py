from fastapi import APIRouter, HTTPException
from bd import medic_collection, patient_collection, qr_code_collection, exam_collection  # Importa las colecciones de la base de datos
from models import Exam, ExamCreate, Patient, ExamResponse, OrderResponse, UserResponse  # Importa el modelo Patie
from datetime import datetime

router = APIRouter()
from bson import ObjectId


@router.post("/exam", tags=["exam"])
async def create_or_update_exam(exam: ExamCreate):

    # Generar un nuevo ID para el examen
    new_id = str(ObjectId())

    # Asignar la fecha actual al campo date
    exam_date = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    # Convertir patient_id a entero
    exam_dict = exam.dict()
    exam_dict['patient_id'] = int(exam_dict['patient_id'])
    exam_dict['date'] = exam_date  # Asegúrate de agregar el campo date

    new_exam = Exam(id=new_id, **exam_dict)
    result = exam_collection.insert_one(new_exam.dict(by_alias=True))

    if not result.acknowledged:
        raise HTTPException(status_code=500, detail="Failed to create exam")
    return new_exam

@router.get("/getexam/{exam_id}", tags=["exam"], response_model=ExamResponse)
async def get_exam_details(exam_id: str):
    # Obtener el examen por ID
    exam = exam_collection.find_one({"_id": exam_id})
    if not exam:
        raise HTTPException(status_code=404, detail="Exam not found")

    # Obtener el paciente por ID
    patient_id = exam.get("patient_id")
    patient = patient_collection.find_one({"_id": patient_id})
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")

    # Formatear la respuesta
    response = ExamResponse(
        order=OrderResponse(
            age=patient.get("age", "N/A"),
            exams=exam.get("exams", []),
            date=exam.get("date", "N/A")
        ),
        user=UserResponse(
            name=patient.get("name", "N/A"),
            rut=patient.get("rut", "N/A"),
            email=patient.get("email", "N/A"),
            gender=patient.get("gender", "N/A")
        )
    )

    return response