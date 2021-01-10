from picamera import PiCamera
from time import sleep
import RPi.GPIO as GPIO
import requests
import os


url = ''


camera = PiCamera()
camera.resolution = (1920,1080)

in1 = 24
in2 = 23
en = 25
button = 6

GPIO.setmode(GPIO.BCM)
GPIO.setup(in1,GPIO.OUT)
GPIO.setup(in2,GPIO.OUT)
GPIO.setup(en,GPIO.OUT)
GPIO.output(in1,GPIO.LOW)
GPIO.output(in2,GPIO.LOW)
GPIO.output(en,GPIO.LOW)
GPIO.setup(button,GPIO.IN,pull_up_down=GPIO.PUD_DOWN)

lastButtonState = 0
while True:
    buttonState = GPIO.input(button)

    if lastButtonState == GPIO.HIGH and buttonState == GPIO.LOW:
        GPIO.output(in1,GPIO.HIGH)
        GPIO.output(in2,GPIO.LOW)
        GPIO.output(en,GPIO.HIGH)

        sleep(1)

        GPIO.output(in1,GPIO.LOW)
        GPIO.output(in2,GPIO.LOW)
        GPIO.output(en,GPIO.LOW)

        camera.start_preview()
        sleep(5)
        camera.capture('/home/pi/Desktop/scripts/image.jpg')
        camera.stop_preview()
        sleep(2)


        file = {'image': open('/home/pi/Desktop/scripts/image.jpg','rb')}
        x = requests.post(url, files = file, verify = False)
        print(x.text)
    lastButtonState = buttonState

GPIO.cleanup()