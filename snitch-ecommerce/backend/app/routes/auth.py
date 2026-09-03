import uuid
from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session
from app.models.schemas import UserSignup, UserLogin, UserProfile
from app.database.connection import get_db
from app.database.models import UserModel

router = APIRouter(prefix="/api/auth", tags=["Auth"])

@router.post("/signup", response_model=UserProfile)
def signup(data: UserSignup, db: Session = Depends(get_db)):
    existing_user = db.query(UserModel).filter(UserModel.email == data.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="User email already registered")
    
    user_id = "usr_" + str(uuid.uuid4())[:8]
    user_obj = UserModel(
        id=user_id,
        name=data.name,
        email=data.email,
        password_hash=data.password,
        phone=data.phone or "+91 9876543210",
        address="24 Fashion Avenue, Mumbai, Maharashtra 400001",
        role="customer"
    )
    db.add(user_obj)
    db.commit()
    db.refresh(user_obj)

    return UserProfile(
        id=user_obj.id,
        name=user_obj.name,
        email=user_obj.email,
        phone=user_obj.phone or "",
        address="24 Fashion Avenue",
        city="Mumbai",
        pincode="400001"
    )

@router.post("/login", response_model=UserProfile)
def login(data: UserLogin, db: Session = Depends(get_db)):
    user_record = db.query(UserModel).filter(UserModel.email == data.email).first()
    
    if not user_record:
        # Create user record automatically on first login (for seamless guest/demo login)
        user_id = "usr_" + str(uuid.uuid4())[:8]
        name = data.email.split("@")[0].upper() if "@" in data.email else "SNITCH USER"
        user_record = UserModel(
            id=user_id,
            name=name,
            email=data.email,
            password_hash=data.password,
            phone="+91 9876543210",
            address="102 Luxury Heights, Bandra West, Mumbai 400050",
            role="customer"
        )
        db.add(user_record)
        db.commit()
        db.refresh(user_record)
    elif user_record.password_hash != data.password:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    return UserProfile(
        id=user_record.id,
        name=user_record.name,
        email=user_record.email,
        phone=user_record.phone or "+91 9876543210",
        address=user_record.address or "102 Luxury Heights",
        city="Mumbai",
        pincode="400050"
    )
