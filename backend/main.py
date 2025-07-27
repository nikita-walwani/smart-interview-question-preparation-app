from fastapi import FastAPI
from models import Base
from database import Engine
from routers import auth_routes
from dotenv import load_dotenv
import os
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [os.getenv("FRONT_END")]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,            
    allow_credentials=True,
    allow_methods=["*"],            
    allow_headers=["*"],              
)

Base.metadata.create_all(bind=Engine)


app.include_router(auth_routes.router)

