
import subprocess
import os
import ssl
import smtplib
import email
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders

# Convert tex file to pdf
filename = "test"
file_path = "files/" + filename
process = subprocess.Popen(["pdflatex", file_path + ".tex"])
process.wait()

# Update files and file path
os.remove(filename + ".log")
os.remove(filename + ".aux")
filename = filename + ".pdf"
file_path = "files/" + filename
shutil.move(filename, file_path)

# Compose email
receiver = "se101kajag@gmail.com"
subject = "KAJAG: Your File is Ready!"
message = """\
Hello,

Your scan has been sucessfully converted into a LaTeX document.
Please find attatched a pdf file containing your scan.

Thank you for using KAJAG."""
email = MIMEMultipart()
email["To"] = receiver
email["From"] = "se101kajag@gmail.com"
email["Subject"] = subject
email.attach(MIMEText(message, "plain"))

# Attatch pdf
with open(file_path, "rb") as attachment:
    pdf = MIMEBase("application", "octet-stream")
    pdf.set_payload(attachment.read())
encoders.encode_base64(pdf)
pdf.add_header('Content-Disposition', "attachment; filename=%s" % filename)
email.attach(pdf)

# Send email
context = ssl.create_default_context()
with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:
    server.login("se101kajag@gmail.com", "j33Lh8fTdhtcRJL")
    server.sendmail("se101kajag@gmail.com", receiver, email.as_string())
