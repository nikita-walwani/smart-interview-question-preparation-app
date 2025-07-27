from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from schema import UserCreate, userLogin
from models import User
from auth import  hash_password, create_jwt_token, verify_password
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


@router.post('/login')
def user_login(user:userLogin, db:Session = Depends(get_db)):
    current_user = db.query(User).filter(User.email==user.email).first()
    if not current_user:
            raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User with this email does not exist"
        )
    if not verify_password(user.password, current_user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect password"
        )
    token = create_jwt_token({'sub': str(current_user.id)})
    return {
        'access_token': token,
        'token_type': 'bearer',
        'user': {
            'name': current_user.name,
            'email': current_user.email
        }
    }
    