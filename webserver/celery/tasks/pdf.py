import os
import shutil


def toPDF(filename):
    path = "/tex/" + filename + ".tex"
    os.system("pdflatex -output-directory=/tex " + path)
    os.remove("/tex/" + filename + ".log")
    os.remove("/tex/" + filename + ".aux")
    shutil.move("/tex/" + filename + ".pdf", "/pdf/" + filename + ".pdf")
