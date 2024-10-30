from fastapi import APIRouter, HTTPException
from bd import medic_collection, patient_collection, qr_code_collection, exam_collection  # Importa las colecciones de la base de datos
from models import Patient, PatientCreate  # Importa el modelo Patie
router = APIRouter()

@router.get("/getpatient/{patient_id}", response_model=Patient, tags=["patient"])
async def read_patient(patient_id: str):
    patient = patient_collection.find_one({"rut": patient_id})
    if patient is None:
        raise HTTPException(status_code=404, detail="Patient not found")
    return patient

@router.post("/patient", response_model=Patient, tags=["patient"])
async def create_or_update_patient(patient: PatientCreate):
    # Verificar si el paciente ya existe
    existing_patient = patient_collection.find_one({"rut": patient.rut})
    if existing_patient:
        # Actualizar los datos del paciente existente
        updated_patient = {**existing_patient, **patient.dict()}
        result = patient_collection.update_one({"rut": patient.rut}, {"$set": updated_patient})
        if result.matched_count == 0:
            raise HTTPException(status_code=500, detail="Failed to update patient")
        return updated_patient

    # Generar un nuevo ID para el paciente
    new_id = patient_collection.count_documents({}) + 1
    new_patient = Patient(id=new_id, **patient.dict())
    result = patient_collection.insert_one(new_patient.dict(by_alias=True))
    if not result.acknowledged:
        raise HTTPException(status_code=500, detail="Failed to create patient")
    return new_patient