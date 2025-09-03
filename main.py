from fastapi import FastAPI, UploadFile, File, Form, HTTPException 
from fastapi.responses import StreamingResponse
from sqlalchemy import insert, select, func
from database import engine, activities, challenges, user_challenges, users 
import io
from fastapi.middleware.cors import CORSMiddleware

from activities import ACTIVITY_TABLE

app = FastAPI()

# Allow React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Welcome to EcoBuddy!"}

# ✅ Activity options
@app.get("/activity-options")
def activity_options():
    return list(ACTIVITY_TABLE.keys())

# ✅ Upload activity
@app.post("/upload-activity")
async def upload_activity(
    user_id: int = Form(...),
    category_id: int = Form(...),
    activity_name: str = Form(...),
    distance: float = Form(1),
    description: str = Form(""),
    file: UploadFile = File(None)
):
    if activity_name not in ACTIVITY_TABLE:
        raise HTTPException(status_code=404, detail="Activity not found")

    activity_info = ACTIVITY_TABLE[activity_name]
    points = activity_info.get("points", 0)
    carbon_offset = activity_info.get("carbon_offset", 0.0)

    if "carbon_offset_per_km" in activity_info:
        carbon_offset = activity_info["carbon_offset_per_km"] * distance
        points = points * distance

    image_data = await file.read() if file else None

    query = insert(activities).values(
        user_id=user_id,
        category_id=category_id,
        description=activity_name,
        points=points,
        carbon_offset=carbon_offset,
        photo=image_data
    )

    try:
        with engine.begin() as conn:
            conn.execute(query)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error inserting activity: {e}")

    return {"message": "Activity logged successfully", "points": points, "carbon_offset": round(carbon_offset, 2)}

# ✅ Get activity photo
@app.get("/activity-photo/{activity_id}")
def get_activity_photo(activity_id: int):
    query = select(activities.c.photo).where(activities.c.activity_id == activity_id)
    with engine.connect() as conn:
        result = conn.execute(query).fetchone()

    if not result or not result[0]:
        raise HTTPException(status_code=404, detail="Photo not found")

    return StreamingResponse(io.BytesIO(result[0]), media_type="image/jpeg")

# ✅ Get user activities
@app.get("/user-activities/{user_id}")
def get_user_activities(user_id: int):
    query = select(activities).where(activities.c.user_id == user_id)
    with engine.connect() as conn:
        result = conn.execute(query).fetchall()
    
    return [{
        "activity_id": row.activity_id,
        "description": row.description,
        "points": row.points,
        "carbon_offset": row.carbon_offset,
        "date_time": row.date_time,
        "photo_url": f"/activity-photo/{row.activity_id}" if row.photo else None
    } for row in result]

# ================= CHALLENGES ENDPOINTS =================

# Get all challenges
@app.get("/challenges")
def get_challenges():
    query = select(challenges)
    with engine.connect() as conn:
        result = conn.execute(query).fetchall()
    return [{
        "challenge_id": row.challenge_id,
        "name": row.name,
        "description": row.description,
        "start_date": row.start_date,
        "end_date": row.end_date,
        "reward_points": row.reward_points
    } for row in result]

# User joins a challenge
@app.post("/join-challenge")
def join_challenge(user_id: int = Form(...), challenge_id: int = Form(...)):
    # Check if user already joined
    with engine.connect() as conn:
        existing = conn.execute(
            select(user_challenges).where(
                (user_challenges.c.user_id == user_id) &
                (user_challenges.c.challenge_id == challenge_id)
            )
        ).fetchone()
        if existing:
            raise HTTPException(status_code=400, detail="User already joined this challenge")
    
    query = insert(user_challenges).values(
        user_id=user_id,
        challenge_id=challenge_id,
        status="Active",
        points_earned=0
    )
    with engine.begin() as conn:
        conn.execute(query)
    
    return {"message": "Challenge joined successfully"}

# Get user challenges
@app.get("/user-challenges/{user_id}")
def get_user_challenges(user_id: int):
    query = select(
        user_challenges.c.challenge_id,
        user_challenges.c.status,
        user_challenges.c.points_earned,
        challenges.c.name,
        challenges.c.start_date,
        challenges.c.end_date,
        challenges.c.reward_points
    ).join(challenges, user_challenges.c.challenge_id == challenges.c.challenge_id)\
     .where(user_challenges.c.user_id == user_id)
    
    with engine.connect() as conn:
        result = conn.execute(query).fetchall()

    return [{
        "challenge_id": row.challenge_id,
        "name": row.name,
        "status": row.status,
        "points_earned": row.points_earned,
        "start_date": row.start_date,
        "end_date": row.end_date,
        "reward_points": row.reward_points
    } for row in result]

# Challenge leaderboard
@app.get("/challenge-leaderboard/{challenge_id}")
def challenge_leaderboard(challenge_id: int):
    # Sum points per user in this challenge
    query = select(
        user_challenges.c.user_id,
        func.sum(user_challenges.c.points_earned).label("total_points"),
        users.c.username
    ).join(users, user_challenges.c.user_id == users.c.user_id)\
     .where(user_challenges.c.challenge_id == challenge_id)\
     .group_by(user_challenges.c.user_id, users.c.username)\
     .order_by(func.sum(user_challenges.c.points_earned).desc())
    
    with engine.connect() as conn:
        result = conn.execute(query).fetchall()
    
    return [{
        "user_id": row.user_id,
        "username": row.username,
        "total_points": row.total_points
    } for row in result]
