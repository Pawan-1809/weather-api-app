from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routers import weather

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify allowed origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(weather.router)

# ... existing code ...
