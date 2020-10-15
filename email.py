import pandas as pd
import smtplib
import ssl
import getpass
import yaml
import email
import time
from email import encoders
from email.mime.base import MIMEBase
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
PORT = 465  # Standard gmail port
smtp_server = "smtp.gmail.com"
context = ssl.create_default_context()


def sendto():
    with open("sendto.yml", 'r') as stream:
        try:
            archive = yaml.safe_load(stream)
            if (len(archive["addresses"]) == 0):
                print("No email addresses provided. See sendto.yml file.")
                return
            return archive
        except yaml.YAMLError as exc:
            print(exc)


def send(count):
    info = sendto()
    message = MIMEMultipart()

    # Use "To" for fewer recipients
    message["To"] = ", ".join(info["addresses"])

    message["Subject"] = f'{info["subject"]} {count}'
    message.attach(MIMEText(info["message"], "plain"))

    if (info["attachments"] is not None):
        for filename in info["attachments"]:
            with open(filename, "rb") as attachment:
                part = MIMEBase("application", "octet-stream")
                part.set_payload(attachment.read())
                encoders.encode_base64(part)
                part.add_header(
                    "Content-Disposition",
                    f"attachment; filename= {filename}",
                )
                message.attach(part)

    with smtplib.SMTP_SSL(smtp_server, PORT, context=context) as server:
        while(True):
            try:
                # user = input("Username (w/o @gmail.com): ")
                # password = getpass.getpass()
                user = "th3pybot"
                password = "198964tam"
                server.login(f"{user}@gmail.com", password)
                message["From"] = f"{user}@gmail.com"
                break
            except smtplib.SMTPAuthenticationError as exc:
                print("Wrong username/password.")
                resp = input("Try again (y/n)?")
                if (not (resp == 'y')):
                    return

        server.sendmail(f"{user}@gmail.com",
                        info["addresses"], message.as_string())
        print(count)
        server.quit()


for i in range(1000):
    send(i)
    time.sleep(20)
