import sys  # noqa
import os  # noqa
import cv2
from datetime import datetime
from flask import request, Blueprint
sys.path.insert(1, os.path.abspath("../"))  # noqa
from tasks import convert  # noqa
print(convert.name)
transpiler = Blueprint("transpiler", __name__)


@transpiler.route('/', methods=["POST"])
def transpile():
    time = str(datetime.now()).replace(" ", "_")
    filepath = "/var/www/uploads/" + time
    img = request.files['image']
    if img.filename != '':
        img.save(filepath)
    else:
        return 400, "Image missing."
    img = cv2.imread(filepath)
    cv2.imwrite(filepath+".jpg", img)
    os.remove(filepath)
    convert.delay(time, "email@email.com")
    return time
