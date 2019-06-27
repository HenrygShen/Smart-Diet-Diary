from skimage.color import rgb2gray
from skimage.transform import resize
import numpy as np
# import cv2
import matplotlib.pyplot as plt
from scipy import ndimage

image = plt.imread('1.jpg')
print("Original :" + str(image.shape))

image_resized = resize(image, (image.shape[0] / 8, image.shape[1] / 8),
                       anti_aliasing=True)

# Convert to gray scale
gray = rgb2gray(image_resized)
print("gray image: " + str(gray.shape))

# convert to Black and White by taking the mean and using it as a threshold
'''gray_r = gray.reshape(gray.shape[0]*gray.shape[1])
for i in range(gray_r.shape[0]):
    if gray_r[i] > gray_r.mean():
        gray_r[i] = 1
    else:
        gray_r[i] = 0

gray = gray_r.reshape(gray.shape[0],gray.shape[1])
plt.imshow(gray, cmap='gray')'''

# Primitive gray scale segmentation. There are 4 different segments.
gray_r = gray.reshape(gray.shape[0]*gray.shape[1])
for i in range(gray_r.shape[0]):
    if gray_r[i] > gray_r.mean():
        gray_r[i] = 3
    elif gray_r[i] > 0.5:
        gray_r[i] = 2
    elif gray_r[i] > 0.25:
        gray_r[i] = 1
    else:
        gray_r[i] = 0
gray = gray_r.reshape(gray.shape[0],gray.shape[1])
plt.imshow(gray, cmap='gray')
plt.show()