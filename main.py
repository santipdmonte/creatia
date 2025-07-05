from fastapi import FastAPI
from routes.resources import router as resources_router

app = FastAPI(
    title="Creatia API",
    description="API for the Creatia application",
    version="1.0.0"
)

# Include routers
app.include_router(resources_router)

@app.get("/")
async def root():
    return {"message": "Welcome to Creatia API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
