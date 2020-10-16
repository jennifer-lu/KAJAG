import sys
import base64
import requests
import json
import argparse
import cv2

from datetime import datetime


def transpile(filepath, filename):
    image_uri = "data:image/png;base64," + \
        base64.b64encode(open(filepath, "rb").read()).decode()
    r = requests.post("https://api.mathpix.com/v3/text",
                      data=json.dumps({'src': image_uri}),
                      headers={"app_id": "alice_liu_uwaterloo_ca_be1dfb", "app_key": "d27cbddb366496568ec3",
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
