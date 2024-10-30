from pymongo.mongo_client import MongoClient

uri = "mongodb+srv://admin:QaZXEnBvXvqwVhuf66F2Hp8JMAwAfTBC@cluster0.7zk6g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

# Create a new client and connect to the server
client = MongoClient(uri)

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

database = client.mqra_ymc  # Cambia 'mqra_ymc' por el nombre de tu base de datos

# Seleccionar las colecciones
exam_collection = database.exam
medic_collection = database.medic
patient_collection = database.patient
qr_code_collection = database.qr_code
