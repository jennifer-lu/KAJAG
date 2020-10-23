# KAJAG

## Instructions

### Docker

1. Install Docker and run `docker --version` and `docker-compose --version` to check for proper installation.
1. Open terminal, `cd` into the cloned repo, and run `docker-compose up`.
1. You should see three containers running: `flask_1`, `celery_1`, and `redis_1`.
1. To test the webserver, install Postman or another endpointer tester. The flask webserver is open on `localhost:5000`. Send a GET request to `localhost:5000/healthcheck` to see if the server if running properly. You should see the response "200-OK".
1. You can stop running all containers with `ctrl-c`. If you made changes to files and want to rebuild the container, run `docker ps -a` to obtain the container name (usually begins with "kajag\_"), then run `docker-compose up --build -d 'containername'` in a seperate terminal window.

### Testing

The webserver and all of its services (transpiling from image to .tex, compiling from .tex to .pdf, and emailing success/failure responses) all work now. The file `test.jpg` is an image of a latex document that should work perfectly.

1. Inside `webserver>celery>config.yml` set the `receiver` property to your own email. Please don't spam me!

1. Using Postman, make a form-data POST request to `localhost:5000`. Set a key to 'image' and upload any image file you choose (all filetypes accepted by OpenCV will work). Timestamp should be returned. See `postman.png`.

1. Celery worker should have picked up the task and will be outputting status messages. If API fails to return .tex file, maximum of 3 attempts are given. Current latency ~6-7 seconds.

1. If you want to view the status of the celery worker from a nicer UI, go to localhost:5555 in your browser.

1. Check your email!

## Documentation

POST requests from the Raspberry Pi can be sent to `localhost:5000/` using a multipart-form request and the same procedure described in step 2 above.

I have moved all "old" code into the `/temp` directory. Files pertaining to Raspberry Pi work can be found under `/rpi`. Please do not delete .gitignore file.
