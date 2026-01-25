import os


def app_port() -> int:
    return int(os.getenv("APP_PORT", "8000"))


def app_host() -> str:
    return os.getenv("APP_HOST", "127.0.0.1")


def app_url() -> str:
    return os.getenv("APP_URL", f"http://{app_host()}:{app_port()}")


def app_frontend_build() -> str:
    return os.getenv("APP_FRONTEND_BUILD", "app")


def db_url() -> str:
    return os.getenv("DB_URL", "sqlite:///omniscient.db")


def db_config() -> dict:
    return {}
