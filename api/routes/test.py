from fastapi import APIRouter, HTTPException
from bd import medic_collection, patient_collection, qr_code_collection, exam_collection  # Importa las colecciones de la base de datos
from models import Patient  # Importa el modelo Patie
router = APIRouter()

########TEST routes########


# Route to view a medic by ID
@router.get("/medic/{medic_id}", tags=["test"])
async def read_medic(medic_id: str):
    medic = medic_collection.find_one({"_id": medic_id})
    if medic is None:
        raise HTTPException(status_code=404, detail="Medic not found")
    return medic


# Route to view a QR code by ID
@router.get("/qr_code/{qr_code_id}", tags=["test"])
async def read_qr_code(qr_code_id: str):
    qr_code = qr_code_collection.find_one({"_id": qr_code_id})
    if qr_code is None:
        raise HTTPException(status_code=404, detail="QR Code not found")
    return qr_code

# Route to view a recipe by ID
@router.get("/exam/{exam_id}", tags=["test"])
async def read_recipe(exam_id: str):
    exam = exam_collection.find_one({"_id": exam_id})
    if exam is None:
        raise HTTPException(status_code=404, detail="Recipe not found")
    return exam