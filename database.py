from sqlalchemy import create_engine, MetaData, Table, Column, Integer, String, Float, Text, ForeignKey, TIMESTAMP, LargeBinary
from sqlalchemy.sql import func

DATABASE_URL = "postgresql+psycopg2://postgres:mummaiscute@localhost:5432/ecobuddy"

engine = create_engine(DATABASE_URL)
metadata = MetaData()

# Users table
users = Table(
    "users", metadata,
    Column("user_id", Integer, primary_key=True),
    Column("name", String(100)),
    Column("email", String(100), unique=True, nullable=False),
    Column("type", String(20))
)

# Categories table
categories = Table(
    "categories", metadata,
    Column("category_id", Integer, primary_key=True),
    Column("name", String(50)),
    Column("description", Text),
    Column("carbon_per_point", Float)
)

# Activities table with photo storage
activities = Table(
    "activities", metadata,
    Column("activity_id", Integer, primary_key=True),
    Column("user_id", Integer, ForeignKey("users.user_id")),
    Column("category_id", Integer, ForeignKey("categories.category_id")),
    Column("description", Text),
    Column("points", Integer),
    Column("carbon_offset", Float),
    Column("date_time", TIMESTAMP, server_default=func.now()),
    Column("photo", LargeBinary)  # stores the actual image bytes
)

metadata.create_all(engine)
