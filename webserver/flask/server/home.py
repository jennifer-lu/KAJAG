import hashlib
import sys  # noqa
import os  # noqa
import cv2
from datetime import datetime
from flask import request, Blueprint
sys.path.insert(1, os.path.abspath("../"))  # noqa
from tasks import convert, rpi_convert   # noqa
transpiler = Blueprint("transpiler", __name__)


@transpiler.route('/', methods=["POST"])
def files():
    print(request.json)
    name = request.json.get("name")
    if (name is None):
        print("filename")
        return "Filename Missing", 400
    filepath = "./uploads/" + name
    print(filepath)
    print(os.listdir("./uploads"))
    if (not os.path.exists(filepath)):
        print("fielpath")
        return "File DNE", 400
    email = request.json.get("email")
    if (email is None):
        print("email")
        return "Missing Email", 400
    img = cv2.imread(filepath)
    if (img is None or img.size == 0):
        return "Bad File", 400
    page = str(request.json.get("page"))
    if (page is None):
        return "Missing Page Number", 400
    assign = str(request.json.get("assignment"))
    if (assign is None):
        return "Missing Assignment Title", 400
    os.remove(filepath)
    cv2.imwrite(filepath+".jpg", img)

    convert.delay(name, email, page, assign)
    return "OK"


@transpiler.route('/rpi', methods=["POST"])
def rpi():
    time = str(datetime.now()).replace(" ", "_")
    hash_object = hashlib.sha256(str.encode(time))  # move hash to celery
    hex_dig = hash_object.hexdigest()
    print(hex_dig)
    filepath = "/var/www/uploads/" + hex_dig
    img = request.files['image']
    if (img is None):
        return 400, "Image missing."
    else:
        img.save(filepath)
    rpi_convert.delay(hex_dig)
    return time
# @transpiler.route('/', methods=["POST"])
# def transpile():
    # time = str(datetime.now()).replace(" ", "_")
    # filepath = "/var/www/uploads/" + time
    # img = request.files['image']
    # if img.filename != '':
    #     img.save(filepath)
    # else:
    #     return 400, "Image missing."
    # img = cv2.imread(filepath)
    # cv2.imwrite(filepath+".jpg", img)
    # os.remove(filepath)
    # convert.delay(time, "email@email.com")
    # return time
# name
# email
