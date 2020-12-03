import sys  # noqa
import os  # noqa
import cv2
from datetime import datetime
from flask import request, Blueprint
sys.path.insert(1, os.path.abspath("../"))  # noqa
from tasks import convert  # noqa
print(convert.name)
transpiler = Blueprint("transpiler", __name__)


@transpiler.route('/filelist', methods=["GET"])
def filelist():
    filepath = "/var/www/uploads/" + request.user
    files = [file for file in os.listdir(
        filepath) if os.isfile(os.join(filepath, file))]
    return files


@transpiler.route('/', methods=["POST"])
def files():
    time = str(datetime.now()).replace(" ", "_")
    dirpath = "/var/www/uploads/" + request.form.get("user")
    if (not os.path.exists(dirpath)):
        os.makedirs(dirpath)
    filepath = dirpath + "/" + request.form.get("filename") + "_" + time
    img = request.files['image']
    if (img is None):
        return 400, "Image missing."
    else:
        img.save(filepath)
        print(os.listdir(dirpath))
    return time


@transpiler.route('/rpi', methods=["POST"])
def rpi():
    time = str(datetime.now()).replace(" ", "_")
    dirpath = "/var/www/uploads/" + "admin"
    if (not os.path.exists(dirpath)):
        os.makedirs(dirpath)
    filepath = dirpath + "/" + "filename" + "_" + time
    img = request.files['image']
    if (img is None):
        return 400, "Image missing."
    else:
        img.save(filepath)
        print(os.listdir(dirpath))
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
