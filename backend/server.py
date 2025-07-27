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

# Utility functions for age-based recommendations
def get_age_based_recommendations(age: int) -> AgeBasedRecommendation:
    """Get age-based medical recommendations for university students and staff."""
    
    if age < 18:
        return AgeBasedRecommendation(
            age_range="Under 18",
            recommendations=[
                "Regular growth monitoring",
                "Nutritional counseling",
                "Mental health support",
                "Preventive care education"
            ],
            required_screenings=[
                "Annual physical examination",
                "Vision and hearing screening",
                "Dental checkup twice yearly"
            ],
            vaccination_schedule=[
                "HPV vaccine series",
                "Meningococcal vaccine",
                "Annual flu vaccine"
            ]
        )
    elif 18 <= age <= 25:
        return AgeBasedRecommendation(
            age_range="18-25 years",
            recommendations=[
                "Stress management techniques",
                "Healthy lifestyle counseling",
                "Sexual health education",
                "Substance abuse prevention"
            ],
            required_screenings=[
                "Annual physical examination",
                "Mental health screening",
                "Blood pressure monitoring",
                "Cholesterol screening (if risk factors present)"
            ],
            vaccination_schedule=[
                "COVID-19 vaccination",
                "Annual flu vaccine",
                "Tetanus booster every 10 years"
            ]
        )
    elif 26 <= age <= 35:
        return AgeBasedRecommendation(
            age_range="26-35 years",
            recommendations=[
                "Career stress management",
                "Family planning counseling",
                "Preventive health maintenance",
                "Work-life balance guidance"
            ],
            required_screenings=[
                "Annual physical examination",
                "Blood pressure monitoring",
                "Cholesterol screening every 5 years",
                "Cervical cancer screening (women)",
                "Testicular self-examination (men)"
            ],
            vaccination_schedule=[
                "COVID-19 vaccination",
                "Annual flu vaccine",
                "Tetanus booster every 10 years"
            ]
        )
    elif 36 <= age <= 50:
        return AgeBasedRecommendation(
            age_range="36-50 years",
            recommendations=[
                "Cardiovascular health monitoring",
                "Diabetes prevention",
                "Weight management",
                "Stress reduction techniques"
            ],
            required_screenings=[
                "Annual physical examination",
                "Blood pressure monitoring",
                "Cholesterol screening every 5 years",
                "Diabetes screening every 3 years",
                "Mammography (women 40+)",
                "Prostate screening (men 50+)"
            ],
            vaccination_schedule=[
                "COVID-19 vaccination",
                "Annual flu vaccine",
                "Tetanus booster every 10 years"
            ]
        )
    else:  # 50+ years
        return AgeBasedRecommendation(
            age_range="50+ years",
            recommendations=[
                "Comprehensive health monitoring",
                "Chronic disease management",
                "Bone health maintenance",
                "Cognitive health assessment"
            ],
            required_screenings=[
                "Annual physical examination",
                "Blood pressure monitoring",
                "Cholesterol screening annually",
                "Diabetes screening annually",
                "Mammography annually (women)",
                "Prostate screening annually (men)",
                "Colonoscopy every 10 years",
                "Bone density scan"
            ],
            vaccination_schedule=[
                "COVID-19 vaccination",
                "Annual flu vaccine",
                "Tetanus booster every 10 years",
                "Pneumococcal vaccine (65+)",
                "Shingles vaccine (60+)"
            ]
        )

def validate_medical_consistency(patient: Patient) -> List[str]:
    """Validate medical information consistency and return warnings."""
    warnings = []
    
    # Age-based validations
    if patient.age:
        if patient.age < 16 and patient.patient_type == PatientType.student:
            warnings.append("Student age is below typical university age. Please verify.")
        
        if patient.age > 70 and patient.patient_type == PatientType.student:
            warnings.append("Student age is above typical university age. Please verify.")
    
    # Blood type and genotype consistency
    if patient.blood_type and patient.genotype:
        if patient.genotype in ["SS", "SC"] and patient.blood_type in [BloodType.A_negative, BloodType.B_negative]:
            warnings.append("Sickle cell genotype with rare blood type requires special attention.")
    
    # Medication and allergy consistency
    if patient.current_medications and patient.allergies:
        common_drug_allergies = ["penicillin", "aspirin", "nsaids", "codeine", "sulfa"]
        for medication in patient.current_medications:
            for allergy in patient.allergies:
                if any(drug in medication.lower() for drug in common_drug_allergies 
                       if drug in allergy.lower()):
                    warnings.append(f"Potential medication-allergy conflict: {medication} vs {allergy}")
    
    # Age and chronic conditions
    if patient.age and patient.chronic_conditions:
        if patient.age < 25 and any(condition.lower() in ["hypertension", "diabetes", "heart disease"] 
                                   for condition in patient.chronic_conditions):
            warnings.append("Young age with serious chronic conditions requires careful monitoring.")
    
    return warnings

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "UNIJOS Health Management System API"}

# Patient Management Endpoints
@api_router.post("/patients", response_model=Patient)
async def create_patient(patient_data: PatientCreate):
    """Create a new patient with age calculation and medical validation."""
    try:
        # Create patient object with calculated age
        patient_dict = patient_data.dict()
        patient_obj = Patient(**patient_dict)
        
        # Validate medical consistency
        warnings = validate_medical_consistency(patient_obj)
        
        # Insert into database
        patient_dict = patient_obj.dict()
        # Convert date objects to strings for MongoDB
        if 'date_of_birth' in patient_dict and hasattr(patient_dict['date_of_birth'], 'isoformat'):
            patient_dict['date_of_birth'] = patient_dict['date_of_birth'].isoformat()
        if 'last_tetanus_shot' in patient_dict and patient_dict['last_tetanus_shot'] and hasattr(patient_dict['last_tetanus_shot'], 'isoformat'):
            patient_dict['last_tetanus_shot'] = patient_dict['last_tetanus_shot'].isoformat()
        
        result = await db.patients.insert_one(patient_dict)
        
        # Return created patient with warnings if any
        response_data = patient_dict
        if warnings:
            response_data["warnings"] = warnings
        
        return response_data
        
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@api_router.get("/patients", response_model=List[Patient])
async def get_patients(
    patient_type: Optional[PatientType] = None,
    faculty: Optional[str] = None,
    min_age: Optional[int] = None,
    max_age: Optional[int] = None,
    limit: int = 100
):
    """Get patients with optional filtering by type, faculty, and age range."""
    query = {}
    
    if patient_type:
        query["patient_type"] = patient_type
    if faculty:
        query["faculty"] = faculty
    if min_age is not None:
        query["age"] = {"$gte": min_age}
    if max_age is not None:
        if "age" in query:
            query["age"]["$lte"] = max_age
        else:
            query["age"] = {"$lte": max_age}
    
    patients = await db.patients.find(query).limit(limit).to_list(limit)
    return [Patient(**patient) for patient in patients]

@api_router.get("/patients/{patient_id}", response_model=Patient)
async def get_patient(patient_id: str):
    """Get a specific patient by ID."""
    patient = await db.patients.find_one({"id": patient_id})
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    return Patient(**patient)

@api_router.put("/patients/{patient_id}", response_model=Patient)
async def update_patient(patient_id: str, patient_update: PatientUpdate):
    """Update a patient's information with age recalculation."""
    existing_patient = await db.patients.find_one({"id": patient_id})
    if not existing_patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    
    # Update fields
    update_dict = {k: v for k, v in patient_update.dict().items() if v is not None}
    update_dict["updated_at"] = datetime.utcnow()
    
    # Recalculate age if date of birth changed
    if "date_of_birth" in update_dict:
        birth_date = update_dict["date_of_birth"]
        today = date.today()
        age = today.year - birth_date.year - ((today.month, today.day) < (birth_date.month, birth_date.day))
        update_dict["age"] = age
    
    # Recalculate BMI if height or weight changed
    if "height_cm" in update_dict or "weight_kg" in update_dict:
        height_cm = update_dict.get("height_cm", existing_patient.get("height_cm"))
        weight_kg = update_dict.get("weight_kg", existing_patient.get("weight_kg"))
        if height_cm and weight_kg and height_cm > 0:
            height_m = height_cm / 100
            bmi = weight_kg / (height_m ** 2)
            update_dict["bmi"] = round(bmi, 1)
    
    # Update in database
    await db.patients.update_one({"id": patient_id}, {"$set": update_dict})
    
    # Return updated patient
    updated_patient = await db.patients.find_one({"id": patient_id})
    return Patient(**updated_patient)

@api_router.delete("/patients/{patient_id}")
async def delete_patient(patient_id: str):
    """Delete a patient."""
    result = await db.patients.delete_one({"id": patient_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Patient not found")
    return {"message": "Patient deleted successfully"}

# Medical Records Endpoints
@api_router.post("/medical-records", response_model=MedicalRecord)
async def create_medical_record(record_data: MedicalRecordCreate):
    """Create a new medical record with age at visit calculation."""
    try:
        # Get patient to calculate age at visit
        patient = await db.patients.find_one({"id": record_data.patient_id})
        if not patient:
            raise HTTPException(status_code=404, detail="Patient not found")
        
        # Calculate age at visit
        patient_obj = Patient(**patient)
        age_at_visit = patient_obj.age
        
        # Create medical record
        record_dict = record_data.dict()
        record_dict["age_at_visit"] = age_at_visit
        record_obj = MedicalRecord(**record_dict)
        
        # Insert into database
        await db.medical_records.insert_one(record_obj.dict())
        
        return record_obj
        
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@api_router.get("/medical-records/{patient_id}", response_model=List[MedicalRecord])
async def get_patient_medical_records(patient_id: str):
    """Get all medical records for a specific patient."""
    records = await db.medical_records.find({"patient_id": patient_id}).to_list(1000)
    return [MedicalRecord(**record) for record in records]

@api_router.get("/patients/{patient_id}/age-recommendations", response_model=AgeBasedRecommendation)
async def get_patient_age_recommendations(patient_id: str):
    """Get age-based medical recommendations for a patient."""
    patient = await db.patients.find_one({"id": patient_id})
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    
    patient_obj = Patient(**patient)
    return get_age_based_recommendations(patient_obj.age)

@api_router.get("/patients/{patient_id}/medical-consistency")
async def check_medical_consistency(patient_id: str):
    """Check medical information consistency for a patient."""
    patient = await db.patients.find_one({"id": patient_id})
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    
    patient_obj = Patient(**patient)
    warnings = validate_medical_consistency(patient_obj)
    
    return {
        "patient_id": patient_id,
        "consistency_warnings": warnings,
        "status": "healthy" if not warnings else "needs_attention"
    }

# Age-based analytics endpoints
@api_router.get("/analytics/age-distribution")
async def get_age_distribution():
    """Get age distribution of all patients."""
    pipeline = [
        {
            "$bucket": {
                "groupBy": "$age",
                "boundaries": [0, 18, 25, 35, 50, 100],
                "default": "Other",
                "output": {
                    "count": {"$sum": 1},
                    "patients": {"$push": {"name": "$name", "age": "$age", "patient_type": "$patient_type"}}
                }
            }
        }
    ]
    
    result = await db.patients.aggregate(pipeline).to_list(10)
    return {"age_distribution": result}

@api_router.get("/analytics/medical-conditions-by-age")
async def get_medical_conditions_by_age():
    """Get medical conditions distribution by age groups."""
    pipeline = [
        {"$match": {"chronic_conditions": {"$exists": True, "$ne": []}}},
        {"$unwind": "$chronic_conditions"},
        {
            "$group": {
                "_id": {
                    "condition": "$chronic_conditions",
                    "age_group": {
                        "$switch": {
                            "branches": [
                                {"case": {"$lt": ["$age", 18]}, "then": "Under 18"},
                                {"case": {"$lt": ["$age", 25]}, "then": "18-24"},
                                {"case": {"$lt": ["$age", 35]}, "then": "25-34"},
                                {"case": {"$lt": ["$age", 50]}, "then": "35-49"},
                                {"case": {"$gte": ["$age", 50]}, "then": "50+"}
                            ],
                            "default": "Unknown"
                        }
                    }
                },
                "count": {"$sum": 1}
            }
        }
    ]
    
    result = await db.patients.aggregate(pipeline).to_list(100)
    return {"medical_conditions_by_age": result}

# Status check endpoints (existing)
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

# Health check endpoint
@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "UNIJOS Health Management System",
        "version": "1.0.0",
        "timestamp": datetime.utcnow().isoformat()
    }

@app.on_event("startup")
async def startup_event():
    logger.info("Starting UNIJOS Health Management System API")
    # Create indexes for better performance
    await db.patients.create_index("id", unique=True)
    await db.patients.create_index("email", unique=True)
    await db.patients.create_index("matric_number", unique=True, sparse=True)
    await db.patients.create_index("staff_id", unique=True, sparse=True)
    await db.patients.create_index("age")
    await db.patients.create_index("patient_type")
    await db.patients.create_index("faculty")
    await db.medical_records.create_index("patient_id")
    await db.medical_records.create_index("date")
    logger.info("Database indexes created successfully")

@app.on_event("shutdown")
async def shutdown_db_client():
    logger.info("Shutting down UNIJOS Health Management System API")
    client.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
