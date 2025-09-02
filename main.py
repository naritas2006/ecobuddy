from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.responses import StreamingResponse
from sqlalchemy import insert, select
from database import engine, activities
import io
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow requests from React frontend
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.get("/")
def home():
    return {"message": "Welcome to EcoBuddy!"}


@app.post("/upload-activity")
async def upload_activity(
    user_id: int = Form(...),
    category_id: int = Form(...),
    description: str = Form(...),
    points: int = Form(...),
    carbon_offset: float = Form(...),
    file: UploadFile = File(...)
):
    image_data = await file.read()

    query = insert(activities).values(
        user_id=user_id,
        category_id=category_id,
        description=description,
        points=points,
        carbon_offset=carbon_offset,
        photo=image_data
    )

    try:
        with engine.begin() as conn:  # auto-commit/rollback
            conn.execute(query)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error inserting activity: {e}")

    return {"message": "Activity logged successfully"}


@app.get("/activity-photo/{activity_id}")
def get_activity_photo(activity_id: int):
    query = select(activities.c.photo).where(activities.c.activity_id == activity_id)
    with engine.connect() as conn:
        result = conn.execute(query).fetchone()

    if not result or not result[0]:
        raise HTTPException(status_code=404, detail="Photo not found")

    return StreamingResponse(io.BytesIO(result[0]), media_type="image/jpeg")


@app.get("/activities")
def get_activities():
    query = select(
        activities.c.activity_id,
        activities.c.description,
        activities.c.points,
        activities.c.carbon_offset,
        activities.c.photo
    )
    with engine.connect() as conn:
        result = conn.execute(query).fetchall()

    activities_list = [
        {
            "activity_id": row.activity_id,
            "description": row.description,
            "points": row.points,
            "carbon_offset": row.carbon_offset,
            "photo": f"/activity-photo/{row.activity_id}" if row.photo else None
        }
        for row in result
    ]

    return activities_list
