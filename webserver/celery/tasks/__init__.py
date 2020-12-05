import os
import cv2
from celery import Celery
from .transpile import transpile
from .pdf import toPDF
from .email import send, fail
app = Celery(
    "tasks",
    backend="redis://redis:6379",
    broker="redis://redis:6379"
)


@app.task(name="tasks.convert")
def convert(name, email):
    path = "/uploads/" + name + ".jpg"
    for i in range(3):
        if (transpile(path, name)):
            toPDF(name)
            send(name, email)
            return
        print(f"Failed Attempts: {i+1}")
    fail(name, email)
