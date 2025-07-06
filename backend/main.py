from fastapi import FastAPI
from models import Base
from database import Engine
from routers import auth_routes

app = FastAPI()

Base.metadata.create_all(bind=Engine)

app.include_router(auth_routes.router)

