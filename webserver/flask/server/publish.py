import sys  # noqa
import os  # noqa
from datetime import datetime
sys.path.insert(1, os.path.abspath("../"))  # noqa
# from tasks import script  # noqa

from flask import request, Blueprint
import json

publisher = Blueprint("publisher", __name__)


@publisher.route('/', methods=["POST"])
def publish():
    time = str(datetime.now())
    img = request.files['image']
    if img.filename != '':
        img.save(os.getcwd() + "/uploads/" + time)
    return time
