# KAJAG

## Instructions

1. Install Docker and run `docker --version` and `docker-compose --version` to check for proper installation.
1. Open terminal, `cd` into the cloned repo, and run `docker-compose up`.
1. You should see two containers running: `kajag_flask_1` and `kajag_celery_1`.
1. To test the webserver, install Postman or another endpointer tester. The flask webserver is open on `localhost:5000`. Send a GET request to `localhost:5000/healthcheck` to see if the server if running properly. You should see the response "200-OK".
1. You can stop running all containers with `ctrl-c` or look up command documentation online.

As of 5pm on Wednesday October 14, the celery container should crash due to missing files.

## Documentation

POST requests from the Raspberry Pi can be sent to `localhost:5000/` using a multipart-form request. Set the key to 'image' and upload a file (all filetypes currently accepted). Timestamp should be returned.

Python code for the server should be placed in the same folder as this README. They will be incorporated as celery tasks to run asynchronously.
