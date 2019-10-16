from PIL import Image
import cv2
import os, sys



def grayscale():
    fname = "C:/Users/Henry/Desktop/Smart-Diet-Diary/Diet_Diary/testora2"
    image = cv2.imread(fname + ".jpg")
    image_gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    cv2.imwrite(fname + "gray.jpg", image_gray);

grayscale()
