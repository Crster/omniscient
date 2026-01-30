from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from os import path

from src.controllers import user
from src.helpers import config
from src.helpers.exception import ServiceException


app = FastAPI()


# Register Exceptions
@app.exception_handler(ServiceException)
async def service_exception_handler(req: Request, exc: ServiceException):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "msg": exc.message,
            "type": exc.__class__.__name__,
        },
    )


# Register controllers
app.include_router(user.router, prefix="/api")

# Mount frontend build
if path.exists(config.app_frontend_build()):
    app.mount("/", StaticFiles(directory=config.app_frontend_build()), name="app")
