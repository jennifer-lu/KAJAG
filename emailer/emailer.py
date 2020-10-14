import email, smtplib, ssl, os, subprocess

from email import encoders
from email.mime.base import MIMEBase
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

p = subprocess.Popen(["pdflatex", "test.tex"])

p.wait()

subject = "Scanner: Your File is Ready!"
body = "Please find attatched your scanned image as a LaTeX pdf."
sender_email = "se101kajag@gmail.com"
receiver_email = "se101kajag@gmail.com"

# Create a multipart message and set headers
message = MIMEMultipart()
message["From"] = sender_email
message["To"] = receiver_email
message["Subject"] = subject

# Add body to email
message.attach(MIMEText(body, "plain"))

filename = "test.pdf"

# Open PDF file in binary mode
with open(filename, "rb") as attachment:
    # Add file as application/octet-stream
    # Email client can usually download this automatically as attachment
    part = MIMEBase("application", "octet-stream")
    part.set_payload(attachment.read())

# Encode file in ASCII characters to send by email
encoders.encode_base64(part)

# Add header as key/value pair to attachment part
part.add_header(
    "Content-Disposition",
    f"attachment; filename= {filename}",
)

# Add attachment to message and convert message to string
message.attach(part)
text = message.as_string()

# Log in to server using secure context and send email
context = ssl.create_default_context()
with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:
    server.login(sender_email, "j33Lh8fTdhtcRJL")
    server.sendmail(sender_email, receiver_email, text)
