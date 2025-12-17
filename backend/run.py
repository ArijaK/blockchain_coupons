# main backend file

from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def read_root():
    return {"message": "Backend is running!"}
