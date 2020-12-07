from pydrive.drive import GoogleDrive  # noqa
from pydrive.auth import GoogleAuth  # noqa

# Pass in the file path and the assignment_name
# This will upload the file to a folder named assignment_name
# Will create assignment_name folder if it doesn't exist


def upload_gdrive(file_path, assignment_name):
    gauth = GoogleAuth()
    gauth.LoadCredentialsFile("/app/tasks/kajag_creds.txt")

    if gauth.access_token_expired:
        gauth.Refresh()
    else:
        gauth.Authorize()

    drive = GoogleDrive(gauth)

    # list of folders
    folders = drive.ListFile({'q': "title='" + assignment_name + "' and mimeType='application/vnd.google-apps.folder' "
                              "and trashed=false"}).GetList()
    folder_found = False
    for folder in folders:
        if folder['title'] == assignment_name:
            for file in file_path:
                file1 = drive.CreateFile({'parents': [{'id': folder['id']}]})
                file1.SetContentFile(file)
                file1.Upload()
            folder_found = True
    if not folder_found:
        # Upload folder
        new_folder = drive.CreateFile(
            {'title': assignment_name, 'mimeType': 'application/vnd.google-apps.folder'})
        new_folder.Upload()

        # Upload File
        folders = drive.ListFile(
            {'q': "title='" + assignment_name + "' and mimeType='application/vnd.google-apps.folder' "
                                                "and trashed=false"}).GetList()
        for folder in folders:
            if folder['title'] == assignment_name:
                for file in file_path:
                    file1 = drive.CreateFile(
                        {'parents': [{'id': folder['id']}]})
                    file1.SetContentFile(file)
                    file1.Upload()


# testing
# upload_gdrive({"renamed_email.py", "pdf.py"}, "test004")
<<<<<<< HEAD
=======

>>>>>>> 218c9a453fbe370f6391bb34103e6784cb5b071d
