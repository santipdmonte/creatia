import os
from pathlib import Path
from dotenv import load_dotenv
from fastapi import FastAPI
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
