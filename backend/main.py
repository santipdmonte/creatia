import os
from pathlib import Path
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from routes.resources import router as resources_router
from routes.images import router as images_router
from routes.monthly_planner import router as monthly_planner_router
from routes.strategist import router as strategist_router
from routes.weekly_planner import router as weekly_planner_router
from routes.core_planner import router as core_planner_router

load_dotenv()

app = FastAPI(
    title="Creatia API",
    description="API for the Creatia application",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:3001",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files for serving generated images
app.mount("/static", StaticFiles(directory="images_generated"), name="static")

# Include routers
app.include_router(resources_router)
app.include_router(images_router)
app.include_router(monthly_planner_router)
app.include_router(strategist_router)
app.include_router(weekly_planner_router)
app.include_router(core_planner_router)

@app.get("/")
async def root():
    return {"message": "Welcome to Creatia API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
