from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from schema import UserCreate
from models import User
from auth import  hash_password, create_jwt_token
from database import get_db


router = APIRouter(prefix='', tags=['Authentication'])

@router.post('/signup')
def user_signup(user:UserCreate, db:Session = Depends(get_db)):
    if db.query(User).filter(user.email==User.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_psw = hash_password(user.password)
    new_user = User(name=user.name, email=user.email, password =hashed_psw)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    token = create_jwt_token({'sub':new_user.id})
    return {'token':token, 'token_type':'bearer'}