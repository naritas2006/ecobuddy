from sqlalchemy import create_engine, MetaData, Table, Column, Integer, String, Float, Text, ForeignKey, TIMESTAMP, LargeBinary, Date
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
    Column("photo", LargeBinary)
)

# Challenges table
challenges = Table(
    "challenges", metadata,
    Column("challenge_id", Integer, primary_key=True),
    Column("name", String(100)),
    Column("description", Text),
    Column("start_date", Date),
    Column("end_date", Date),
    Column("reward_points", Integer)
)

# User-Challenges associative table
user_challenges = Table(
    "user_challenges", metadata,
    Column("user_id", Integer, ForeignKey("users.user_id"), primary_key=True),
    Column("challenge_id", Integer, ForeignKey("challenges.challenge_id"), primary_key=True),
    Column("status", String(20)),  # 'Active' or 'Completed'
    Column("points_earned", Integer),
    Column("date_joined", Date, server_default=func.now())
)

# Create all tables
metadata.create_all(engine)
