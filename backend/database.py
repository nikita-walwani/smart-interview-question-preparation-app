from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy_utils import database_exists, create_database

import os
from dotenv import load_dotenv

load_dotenv()
db_name = "interview_app"

database_url = os.getenv("DATABASE_URL") + db_name

Engine = create_engine(database_url)

Session_local = sessionmaker(bind=Engine, autoflush=False)

Base = declarative_base()

if not database_exists(database_url):
    print(f"Database {db_name} does not exist. Creating...")
    create_database(database_url)
else:
    print(f"Database {db_name} already exists.")
    

def get_db():
    db = Session_local()
    try:
        yield db
    finally:
        db.close()

