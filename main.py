from fastapi import FastAPI

app = FastAPI(
    title="Creatia API",
    description="API for the Creatia application",
    version="1.0.0"
)

@app.get("/")
async def root():
    return {"message": "Welcome to Creatia API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
