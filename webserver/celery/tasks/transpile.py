import sys
import base64
import requests
import json
import argparse
import cv2
import yaml
from datetime import datetime


def text(line):
    output = ""
    index = 0
    endtext = False
    for word in line.split(" "):
        print("TEXT: " + word)
        if (index == 0):
            if (not word == "\\text"):
                output += "$ "
            else:
                index += 1
                continue
        if (word == "\\text"):
            output += "$ "
        elif (word == "{"):
            index += 1
            continue
        elif (word == "}"):
            endtext = True
        elif (word == "\\\\"):
            if (endtext):
                print("OUTPUT: " + output + "\\bigbreak")
                output += "\\bigbreak\n"
                return output
            else:
                print("OUTPUT: " + output + "$ " + "\\bigbreak")
                output += "$ " + "\\bigbreak\n"
                return output
        else:
            if (endtext):
                output += " $ " + word + " "
                endtext = False
            else:
                output += word + " "
        index += 1


def math(line):
    return "\\[ " + line[:-2] + " \\]\n"


def parse(tex):
    output = ""
    print("PARSING\n")
    for line in tex.splitlines():
        print("PARSE: " + line + "\n")
        if ("\\begin{array}" in line or "\\end{array}" in line):
            continue
        if (not line[-2:] == "\\\\"):
            line += " \\\\"
            print("APPENDED LINE BREAK")
        if "\\text" in line:
            print("TEXT LINE")
            output += text(line)
        else:
            output += math(line)
    print("PARSING COMPLETE")
    print(output)
    with open("/tex/temp.txt", "w") as file:
        file.write(output)
    return output


def transpile(filepath, filename, page, assignment):
    print("PAGE: "+page)
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
        pure = ansJson["latex_styled"]
        print(pure)
        texResult = parse(pure) + "\n"
        if (page == "1"):
            print("PAGE ONE")
            texResult = "\\textbf{" + assignment + "}\\bigbreak\n" + texResult
        print(texResult)
    except:
        try:
            texResult = ansJson["text"]
        except:
            return False
    texHeader = "\documentclass[11pt]{article}\n\\textwidth 15cm\n\\textheight 21.3cm\n\\setlength{\\parskip}{0ex}\n\\usepackage[left = 0.75 in , right = 0.75 in , top = 0.75 in , bottom = 0.75 in ]{geometry}\n\\usepackage{amsfonts, amsmath, amssymb, enumerate, mathtools}\n\\parindent = 0pt\n\\begin{document}\n"
    texFooter = "\n\\end{document}\n"
    with open("/tex/" + filename + ".tex", "w") as texOut:
        texOut.writelines(
            [texHeader, "\\setcounter{page}" + "{"+page+"}", texResult, texFooter])
    return True


# parser = argparse.ArgumentParser(
#     description="(hopefully) returns LaTeX of the photo you send in")
# parser.add_argument("file_path", type=str)
# args = parser.parse_args()
# # put desired file path here
# file_path = args.file_path
# imgToTex(file_path)
