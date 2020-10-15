from celery import Celery
import os
import cv2

app = Celery(
    "tasks",
    backend="redis://redis:6379",
    broker="redis://redis:6379"
)


@app.task(name="tasks.convert")
def convert(image, email):
    img = cv2.imread("/uploads/"+image)
