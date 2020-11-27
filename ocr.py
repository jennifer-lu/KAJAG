# import numpy as np
# import cv2
# import pytesseract
# from keras.models import load_model
# from keras.preprocessing import image

# pip install numpy
# pip install opencv-python
# pip install Keras
# pip install pytesseract

# Takes in image file path and model, returns array of character IDs and array of newline indicies
# Image file path example: '../input/testimages7/test.jpg'
# Model file path example: '../input/hasyv2npz/0.42-09.hdf5'
def ocr(image_path, model_path):
    model = load_model(model_path)

    # Get image and convert to black and white
    img = cv2.imread(image_path)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    (thresh, img) = cv2.threshold(img, 127, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)

    # Image dimensions
    height, width = img.shape
    CLEARANCE = 8
    SIZE = 224

    # Bounding box coordinates and character ids
    coords = []
    characters = []

    # Get bounding boxes
    boxes = pytesseract.image_to_boxes(img)

    # Get prediction for character in each bounding box
    for box in boxes.splitlines():
        box = box.split(' ')

        # Crop image to bounding box
        crop_img = img[height - int(box[4]) - CLEARANCE:height - int(box[2]) + CLEARANCE, int(box[1]) - CLEARANCE:int(box[3]) + CLEARANCE]
        # img = cv2.rectangle(img, (int(box[1]) - CLEARANCE, height - int(box[2]) + CLEARANCE), (int(box[3]) + CLEARANCE, height - int(box[4]) - CLEARANCE), 0, 2)

        # Preprocess image and get prediction from model
        try:
            # Square image with padding
            crop_height, crop_width = crop_img.shape
            if (crop_height > crop_width):
                new_width = int(SIZE * crop_width / crop_height)
                crop_img = cv2.resize(crop_img, (new_width, SIZE))
                crop_img = cv2.copyMakeBorder(crop_img, 0, 0, int((SIZE - new_width) / 2), int((SIZE - new_width) / 2), cv2.BORDER_CONSTANT, value = 255.0)
            else:
                new_height = int(SIZE * crop_height / crop_width)
                crop_img = cv2.resize(crop_img, (SIZE, new_height))
                crop_img = cv2.copyMakeBorder(crop_img, int((SIZE - new_height) / 2), int((SIZE - new_height) / 2), 0, 0, cv2.BORDER_CONSTANT, value = 255.0)

            # Preprocess image
            crop_img = cv2.cvtColor(crop_img,cv2.COLOR_GRAY2RGB)
            # plt.figure(figsize=(1,1))
            # plt.imshow(crop_img, interpolation = 'nearest')
            # plt.show()
            crop_img = image.img_to_array(crop_img)
            crop_img = np.expand_dims(crop_img, axis = 0)
            crop_img = crop_img / 255.0

            # Store bounding box coordinates and predicted character ids
            predictions = model.predict(crop_img)
            prediction = np.argmax(predictions)
            second_prediction = (np.argsort(np.max(predictions, axis = 0))[-2])
            if (np.max(predictions) < 0.7 and prediction > 61 and second_prediction < 62):
                prediction = second_prediction
            elif (prediction == 109):
                prediction = 14
            elif (prediction == 116):
                prediction = 24
            # print(charmap[str(prediction)])
            coords.append(box);
            characters.append(prediction)
        except:
            print("error")
            # print(crop_img.shape)

    # Get newline indicies
    newlines = []
    baseline = 0;
    for i in range(len(coords)):
        if i > 0 and ((int(baseline) - int((coords[i])[4])) > 50):
            newlines.append(i)
        baseline = (coords[i])[4]

    # Print results
    # plt.figure(figsize=(15,20))
    # plt.imshow(img, interpolation = 'nearest')
    # plt.show()
    # print(newlines)
    # print(characters)
    # for character in characters:
        # print(charmap[str(character)], end = " ")
    return newlines, characters
