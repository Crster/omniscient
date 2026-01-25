from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from os import path

from src.controllers import user
from src.helpers import config


app = FastAPI()

# Mount frontend build
if path.exists(config.app_frontend_build()):
    app.mount("/", StaticFiles(directory=config.app_frontend_build()), name="app")

# Register controllers
app.include_router(user.router, prefix="/api")
