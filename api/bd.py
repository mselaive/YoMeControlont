from pymongo.mongo_client import MongoClient
from dotenv import load_dotenv
import os

# Cargar .env
load_dotenv()
user = os.getenv("MONGODB_USER")
password = os.getenv("MONGODB_PASSWORD")
host = os.getenv("MONGODB_HOST")
db_name = os.getenv("MONGODB_DB")

uri = f"mongodb+srv://{user}:{password}@{host}/?retryWrites=true&w=majority&appName=Cluster0"

# Create a new client and connect to the server
client = MongoClient(uri)

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

database = client[db_name]  # Cambia 'mqra_ymc' por el nombre de tu base de datos

# Seleccionar las colecciones
exam_collection = database.exam
medic_collection = database.medic
patient_collection = database.patient
qr_code_collection = database.qr_code
