import cv2

image = cv2.imread('images/test.jpg')

crop_img = image[0:100, 0:100]
cv2.imshow("cropped", crop_img)

cv2.waitKey(0)
cv2.destroyAllWindows()
