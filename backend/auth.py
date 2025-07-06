from passlib.context import CryptContext
import jwt
from datetime import datetime, timedelta, timezone
import os

pwd_context = CryptContext(schemes=['bcrypt'], deprecated='auto')
secret_key = os.getenv('SECRET_KEY')
algorithm = "HS256"

def hash_password(password:str):
    return pwd_context.hash(password)

def verify_password(plain, hashed):
    return pwd_context.verify(plain, hashed)

def create_jwt_token(data:dict, expires_delta = timedelta(minutes=120)):
    to_encode = data.copy()
    expires = datetime.now(timezone.utc) + expires_delta
    to_encode.update({'exp':expires})
    return jwt.encode(to_encode, secret_key, algorithm)