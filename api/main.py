from fastapi import FastAPI
from routes import test, patient, exam
from fastapi.middleware.cors import CORSMiddleware
from bd import client  # Importa el cliente de MongoDB

# Create FastAPI application
app = FastAPI()

# Include CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Include routes
app.include_router(test.router)
app.include_router(patient.router)
app.include_router(exam.router)

# Root endpoint
@app.get("/")
def read_root():
    return {"message": "Welcome to my FastAPI application!"}

# Cerrar la conexión a la base de datos cuando la aplicación se detenga
@app.on_event("shutdown")
def shutdown_db_client():
    client.close()