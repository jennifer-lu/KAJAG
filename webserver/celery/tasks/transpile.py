import sys
import base64
import requests
import json
import argparse
import cv2
import yaml
from datetime import datetime


def transpile(filepath, filename):
    with open("/app/key.yml", 'r') as stream:
        try:
            key = yaml.safe_load(stream)
        except yaml.YAMLError as exc:
            print(exc)
            return
    image_uri = "data:image/png;base64," + \
        base64.b64encode(open(filepath, "rb").read()).decode()
    r = requests.post("https://api.mathpix.com/v3/text",
                      data=json.dumps({'src': image_uri}),
                      headers={"app_id": "alice_liu_uwaterloo_ca_be1dfb_0ce227", "app_key": key["key"],
                               "Content-type": "application/json"})
    ansJson = json.loads(r.text)
    texResult = ""
    try:
        texResult = "$" + ansJson["latex_styled"] + "$"
    except:
        try:
            texResult = ansJson["text"]
        except:
            return False
    texResult += "\n"
    texHeader = '\\documentclass{article}\n\\usepackage{amsfonts,amsmath,amssymb,enumerate}\n\\usepackage{mathtools}\n\n\\begin{document}\n'
    texFooter = '\\end{document}'
    with open("/tex/" + filename + ".tex", "w") as texOut:
        texOut.writelines([texHeader, texResult, texFooter])
    return True


# parser = argparse.ArgumentParser(
#     description="(hopefully) returns LaTeX of the photo you send in")
# parser.add_argument("file_path", type=str)
# args = parser.parse_args()
# # put desired file path here
# file_path = args.file_path
# imgToTex(file_path)
