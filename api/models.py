from pydantic import BaseModel, Field
from typing import Optional, List


class Patient(BaseModel):
    id: int = Field(..., alias="_id")
    name: str
    rut: str
    age: str
    email: str
    gender: str

    class Config:
        populate_by_name = True
        json_encoders = {int: str}

class PatientCreate(BaseModel):
    name: str
    rut: str
    age: str
    email: str
    gender: str

class Exam(BaseModel):
    id: str = Field(..., alias="_id")
    patient_id: int
    exams: List[str]
    date: str

    class Config:
        populate_by_name = True
        json_encoders = {int: str}

class ExamCreate(BaseModel):
    patient_id: str
    exams: List[str]
    
class OrderResponse(BaseModel):
    age: str
    exams: List[str]
    date: str

class UserResponse(BaseModel):
    name: str
    rut: str
    email: str
    gender: str

class ExamResponse(BaseModel):
    order: OrderResponse
    user: UserResponse