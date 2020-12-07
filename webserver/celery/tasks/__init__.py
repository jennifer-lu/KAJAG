import os
import cv2
import hashlib
import json
import numpy as np
from celery import Celery
from .transpile import transpile, headers
from .pdf import toPDF
from .gdrive import upload_gdrive
from pymongo import MongoClient
from bson.objectid import ObjectId
from .renamed_email import send, fail  # noqa
app = Celery(
    "tasks",
    backend="redis://redis:6379",
    broker="redis://redis:6379"
)
uri = "mongodb://mongodb:27017/"

try:
    client = MongoClient(host=[uri], connectTimeoutMS=2000)
    client.server_info()
except:
    print(f"CONNECTION ERROR COULD NOT CONNECT TO MONGODB @ {uri}")
    client.close()
else:
    print(f"CONNECTION TO {uri} SUCCESSFUL")

db = client["testup_db"]
fm = db["filemetas"]


@app.task(name="tasks.convert")
def convert(name, email, page, assignment):
    path = "/uploads/" + name + ".jpg"
    for i in range(3):
        if (transpile(path, name, page, assignment)):
            toPDF(name)
            send(name, email)
            return
        print(f"Failed Attempts: {i+1}")
    fail(name, email)


@app.task(name="tasks.rpi_convert")
def rpi_convert(name):
    path = "/uploads/" + name
    img = cv2.imread(path, -1)

    print(img.shape)
    img = img[:, 200:1750]
    img = img[80:, :]
    img = cv2.rotate(img, cv2.cv2.ROTATE_90_CLOCKWISE)
    rgb_planes = cv2.split(img)

    result_planes = []
    result_norm_planes = []
    for plane in rgb_planes:
        dilated_img = cv2.dilate(plane, np.ones((7, 7), np.uint8))
        bg_img = cv2.medianBlur(dilated_img, 21)
        diff_img = 255 - cv2.absdiff(plane, bg_img)
        norm_img = cv2.normalize(
            diff_img, None, alpha=0, beta=255, norm_type=cv2.NORM_MINMAX, dtype=cv2.CV_8UC1)
        result_planes.append(diff_img)
        result_norm_planes.append(norm_img)

    result = cv2.merge(result_planes)
    result_norm = cv2.merge(result_norm_planes)
    gray = cv2.cvtColor(result_norm, cv2.COLOR_BGR2GRAY)
    img_eq = cv2.equalizeHist(gray)
    final = cv2.threshold(gray, 205, 255, cv2.THRESH_BINARY)[1]

    assign = final[:200, :500]
    question = final[:200, 500:]
    content = final[200:, :]
    os.remove(path)
    cv2.imwrite(path + "_assign.jpg", assign)
    cv2.imwrite(path + "_question.jpg", question)

    title = headers(name + "_assign").get("text")
    subtitle = headers(name + "_question").get("text")
    print(title)
    print(subtitle)
    try:
        subtitle = int(subtitle)
    except:
        subtitle = 1
    hash_object = hashlib.sha256(str.encode(
        title + "_" + str(subtitle)))  # move hash to celery
    hex_dig = hash_object.hexdigest()
    print(hex_dig)

    os.remove(path + "_assign.jpg")
    os.remove(path + "_question.jpg")
    cv2.imwrite("/uploads/" + hex_dig + ".jpg", content)

    file = {"name": hex_dig + ".jpg", "assignment": title, "course": "NA",
            "question": subtitle, "page": 0, "author": "se101kajag@gmail.com"}
    x = fm.insert_one(file)
    print(x.inserted_id)
    cursor = fm.find({})
    for document in cursor:
        print(document)
    text = transpile("/uploads/" + hex_dig + ".jpg", hex_dig, subtitle, title)
    if (text):
        print("SUCCESSFUL")
    toPDF(hex_dig)
    send(hex_dig, "se101kajag@gmail.com")
    upload_gdrive(["/uploads/" + hex_dig + ".jpg", "/tex/" +
                   hex_dig + ".tex", "/pdf/" + hex_dig + ".pdf"],  title)
