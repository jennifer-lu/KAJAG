# upload 1 pdf file to google drive
# requires setup for drive and client_secrets.json
# may require some changes to auth if performed on a server

from pydrive.drive import GoogleDrive
from pydrive.auth import GoogleAuth

fName = "test.pdf"

# G drive authentication
gauth = GoogleAuth()
gauth.LocalWebserverAuth()
drive = GoogleDrive(gauth)

# upload 1 file
file_drive = drive.CreateFile()
file_drive.SetContentFile(fName)
file_drive.Upload()
