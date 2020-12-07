import smtplib
import ssl
import yaml
import email
from email import encoders
from email.mime.base import MIMEBase
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
PORT = 465  # Standard gmail port
smtp_server = "smtp.gmail.com"
context = ssl.create_default_context()


def send(filename, addr):
    with open("/app/config.yml", 'r') as stream:
        try:
            info = yaml.safe_load(stream)
        except yaml.YAMLError as exc:
            print(exc)
            return
    with open("/app/key.yml", 'r') as stream:
        try:
            key = yaml.safe_load(stream)
        except yaml.YAMLError as exc:
            print(exc)
            return

    email = MIMEMultipart()
    email["To"] = addr
    email["Subject"] = info["success_subject"]
    email.attach(MIMEText(info["success_message"], "plain"))

    with open("/uploads/"+filename+".jpg", "rb") as attachment:
        part = MIMEBase("application", "octet-stream")
        part.set_payload(attachment.read())
        encoders.encode_base64(part)
        part.add_header(
            "Content-Disposition",
            f"attachment; filename= {filename}.jpg",
        )
        email.attach(part)

    with open("/tex/"+filename+".tex", "rb") as attachment:
        part = MIMEBase("application", "octet-stream")
        part.set_payload(attachment.read())
        encoders.encode_base64(part)
        part.add_header(
            "Content-Disposition",
            f"attachment; filename= {filename}.tex",
        )
        email.attach(part)

    with open("/pdf/"+filename+".pdf", "rb") as attachment:
        part = MIMEBase("application", "octet-stream")
        part.set_payload(attachment.read())
        encoders.encode_base64(part)
        part.add_header(
            "Content-Disposition",
            f"attachment; filename= {filename}.pdf",
        )
        email.attach(part)

    with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:
        # REPLACE WITH ENVIRONMENT VARIABLES
        server.login(info["sender"], key["password"])
        server.sendmail(info["sender"], addr, email.as_string())
        server.quit()


def fail(filename, addr):
    with open("/app/config.yml", 'r') as stream:
        try:
            info = yaml.safe_load(stream)
        except yaml.YAMLError as exc:
            print(exc)
            return

    with open("/app/key.yml", 'r') as stream:
        try:
            key = yaml.safe_load(stream)
        except yaml.YAMLError as exc:
            print(exc)
            return

    email = MIMEMultipart()
    email["To"] = addr
    email["Subject"] = info["failure_subject"]
    email.attach(MIMEText(info["failure_message"], "plain"))

    with open("/uploads/"+filename+".jpg", "rb") as attachment:
        part = MIMEBase("application", "octet-stream")
        part.set_payload(attachment.read())
        encoders.encode_base64(part)
        part.add_header(
            "Content-Disposition",
            f"attachment; filename= {filename}.jpg",
        )
        email.attach(part)

    with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:
        # REPLACE WITH ENVIRONMENT VARIABLES
        server.login(info["sender"], key["password"])
        server.sendmail(info["sender"], addr, email.as_string())
        server.quit()
