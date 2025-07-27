from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, validator
from typing import List, Optional
import uuid
from datetime import datetime, date
from enum import Enum
import re


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Enums
class Gender(str, Enum):
    male = "male"
    female = "female"
    other = "other"

class BloodType(str, Enum):
    A_positive = "A+"
    A_negative = "A-"
    B_positive = "B+"
    B_negative = "B-"
    AB_positive = "AB+"
    AB_negative = "AB-"
    O_positive = "O+"
    O_negative = "O-"

class PatientType(str, Enum):
    student = "Student"
    staff = "Staff"

class RecordType(str, Enum):
    consultation = "consultation"
    lab_results = "lab-results"
    follow_up = "follow-up"
    procedure = "procedure"
    emergency = "emergency"
    treatment = "treatment"


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

class VitalSigns(BaseModel):
    temperature: Optional[str] = None
    blood_pressure: Optional[str] = None
    pulse: Optional[str] = None
    weight: Optional[str] = None
    height: Optional[str] = None
    respiratory_rate: Optional[str] = None
    oxygen_saturation: Optional[str] = None

class EmergencyContact(BaseModel):
    name: str
    phone: str
    relationship: str

class Patient(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str
    date_of_birth: date
    age: Optional[int] = None
    gender: Gender
    patient_type: PatientType
    address: str
    emergency_contact: EmergencyContact
    
    # Medical Information
    blood_type: Optional[BloodType] = None
    genotype: Optional[str] = None
    allergies: Optional[List[str]] = []
    chronic_conditions: Optional[List[str]] = []
    current_medications: Optional[List[str]] = []
    medical_history: Optional[List[str]] = []
    family_medical_history: Optional[str] = None
    
    # University specific fields
    faculty: Optional[str] = None
    department: Optional[str] = None
    level: Optional[str] = None
    matric_number: Optional[str] = None
    staff_id: Optional[str] = None
    
    # Health Assessment
    height_cm: Optional[float] = None
    weight_kg: Optional[float] = None
    bmi: Optional[float] = None
    smoking_status: Optional[str] = None
    alcohol_consumption: Optional[str] = None
    exercise_frequency: Optional[str] = None
    
    # Vaccination Information
    vaccination_status: Optional[str] = None
    last_tetanus_shot: Optional[date] = None
    covid_vaccination: Optional[str] = None
    
    # System fields
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    @validator('age', always=True)
    def calculate_age(cls, v, values):
        if 'date_of_birth' in values:
            birth_date = values['date_of_birth']
            today = date.today()
            age = today.year - birth_date.year - ((today.month, today.day) < (birth_date.month, birth_date.day))
            return age
        return v
    
    @validator('bmi', always=True)
    def calculate_bmi(cls, v, values):
        if 'height_cm' in values and 'weight_kg' in values:
            height_cm = values.get('height_cm')
            weight_kg = values.get('weight_kg')
            if height_cm and weight_kg and height_cm > 0:
                height_m = height_cm / 100
                bmi = weight_kg / (height_m ** 2)
                return round(bmi, 1)
        return v
    
    @validator('email')
    def validate_email(cls, v):
        if '@' not in v:
            raise ValueError('Invalid email format')
        return v.lower()
    
    @validator('phone')
    def validate_phone(cls, v):
        # Nigerian phone number validation
        pattern = r'^(\+234|234|0)?[789]\d{9}$'
        if not re.match(pattern, v):
            raise ValueError('Invalid Nigerian phone number format')
        return v
    
    @validator('matric_number')
    def validate_matric_number(cls, v, values):
        if v and values.get('patient_type') == PatientType.student:
            # University of Jos matric number format: UJ/YYYY/FAC/NNNN
            pattern = r'^UJ/\d{4}/[A-Z]{2,4}/\d{4}$'
            if not re.match(pattern, v):
                raise ValueError('Invalid University of Jos matric number format')
        return v

class PatientCreate(BaseModel):
    name: str
    email: str
    phone: str
    date_of_birth: date
    gender: Gender
    patient_type: PatientType
    address: str
    emergency_contact: EmergencyContact
    
    # Optional fields
    blood_type: Optional[BloodType] = None
    genotype: Optional[str] = None
    allergies: Optional[List[str]] = []
    chronic_conditions: Optional[List[str]] = []
    current_medications: Optional[List[str]] = []
    medical_history: Optional[List[str]] = []
    family_medical_history: Optional[str] = None
    
    faculty: Optional[str] = None
    department: Optional[str] = None
    level: Optional[str] = None
    matric_number: Optional[str] = None
    staff_id: Optional[str] = None
    
    height_cm: Optional[float] = None
    weight_kg: Optional[float] = None
    smoking_status: Optional[str] = None
    alcohol_consumption: Optional[str] = None
    exercise_frequency: Optional[str] = None
    
    vaccination_status: Optional[str] = None
    last_tetanus_shot: Optional[date] = None
    covid_vaccination: Optional[str] = None

class PatientUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    date_of_birth: Optional[date] = None
    gender: Optional[Gender] = None
    address: Optional[str] = None
    emergency_contact: Optional[EmergencyContact] = None
    
    blood_type: Optional[BloodType] = None
    genotype: Optional[str] = None
    allergies: Optional[List[str]] = None
    chronic_conditions: Optional[List[str]] = None
    current_medications: Optional[List[str]] = None
    medical_history: Optional[List[str]] = None
    family_medical_history: Optional[str] = None
    
    faculty: Optional[str] = None
    department: Optional[str] = None
    level: Optional[str] = None
    matric_number: Optional[str] = None
    staff_id: Optional[str] = None
    
    height_cm: Optional[float] = None
    weight_kg: Optional[float] = None
    smoking_status: Optional[str] = None
    alcohol_consumption: Optional[str] = None
    exercise_frequency: Optional[str] = None
    
    vaccination_status: Optional[str] = None
    last_tetanus_shot: Optional[date] = None
    covid_vaccination: Optional[str] = None

class MedicalRecord(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    patient_id: str
    date: date
    record_type: RecordType
    doctor: str
    diagnosis: str
    treatment: str
    medications: Optional[List[str]] = []
    vitals: Optional[VitalSigns] = None
    notes: Optional[str] = None
    age_at_visit: Optional[int] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class MedicalRecordCreate(BaseModel):
    patient_id: str
    date: date
    record_type: RecordType
    doctor: str
    diagnosis: str
    treatment: str
    medications: Optional[List[str]] = []
    vitals: Optional[VitalSigns] = None
    notes: Optional[str] = None

class AgeBasedRecommendation(BaseModel):
    age_range: str
    recommendations: List[str]
    required_screenings: List[str]
    vaccination_schedule: List[str]

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
